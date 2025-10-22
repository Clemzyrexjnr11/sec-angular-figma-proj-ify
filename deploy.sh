#!/bin/bash


LOG_DIR=~/deploy_logs
LOG_FILE="$LOG_DIR/deploy_$(date +%Y%m%d_%H%M%S).log"
mkdir -p "$LOG_DIR"


error_handler() {
    echo "ERROR: Command failed on line $1." | tee -a "$LOG_FILE"
    echo "    → Exit status: $?" | tee -a "$LOG_FILE"
    echo "    → Check $LOG_FILE for details." | tee -a "$LOG_FILE"
    exit 1
}
trap 'error_handler $LINENO' ERR

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}


get_user_input() {
    read -p "Enter Github Url: " GIT_URL
    read -p "Enter PAT token: " TOKEN
    read -p "Enter Branch Name: " BRANCH
    read -p "Server Username: " NAME
    read -p "Server Ip Address: " ADDRESS
    read -p "Key Pair Path: " KEY_PAIR
    read -p "Application Port: " PORT
    REPO_NAME=$(basename -s .git "$GIT_URL")
    export GIT_URL TOKEN BRANCH NAME ADDRESS KEY_PAIR PORT REPO_NAME
}


install_and_auth_github() {
    log "Installing GitHub CLI..."
    sudo apt update -y
    sudo apt install -y curl gpg

    curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
        | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg >/dev/null 2>&1

    echo "deb [arch=$(dpkg --print-architecture) \
        signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] \
        https://cli.github.com/packages stable main" \
        | sudo tee /etc/apt/sources.list.d/github-cli.list >/dev/null

    sudo apt update -y
    sudo apt install -y gh

    if echo "$TOKEN" | gh auth login --with-token --hostname github.com; then
        log "✅ Successfully authenticated with GitHub"
    else
        log "❌ GitHub authentication failed"
        exit 1
    fi
}


clone_repo() {
    log "Cloning repository..."
    cd ~
    if gh auth status >/dev/null 2>&1; then
        log "GitHub authentication confirmed"
        if [ -d "$REPO_NAME" ]; then
            log "Directory already exists. Removing..."
            sudo rm -rf "$REPO_NAME"
        fi
        gh repo clone "$GIT_URL"
    else
        log "Invalid GitHub PAT or not authenticated."
        exit 1
    fi

    cd "$REPO_NAME"
    if [ -f "Dockerfile" ]; then
        log "✅ Dockerfile found"
    elif [ -f "docker-compose.yml" ]; then
        log "✅ Docker Compose file found"
    else
        log "❌ No Dockerfile or docker-compose.yml found"
        exit 1
    fi
}


setup_server() {
    log "Setting up server dependencies..."
    local SETUP=$(cat << 'EOF'
sudo apt update -y
sudo apt upgrade -y
sudo apt install -y docker.io docker-compose nginx
sudo usermod -aG docker $USER
sudo mkdir -p ~/deploy_logs
EOF
)
    ssh -i "$KEY_PAIR" "$NAME@$ADDRESS" "$SETUP"
}


ensure_idempotence() {
    log "Ensuring idempotency on remote server..."
    local IDEMPOTENCE=$(cat << 'EOF'
LOG_FILE=~/deploy_logs/deploy_$(date +%Y%m%d_%H%M%S).log
echo "🧩 Running idempotence checks..." >> "$LOG_FILE"


if [ "$(docker ps -aq)" ]; then
    echo "Stopping and removing old containers..." >> "$LOG_FILE"
    docker stop $(docker ps -aq) >/dev/null 2>&1 || true
    docker rm -f $(docker ps -aq) >/dev/null 2>&1 || true
fi


if docker network ls | grep -q "myapp_network"; then
    echo "Removing existing Docker network 'myapp_network'..." >> "$LOG_FILE"
    docker network rm myapp_network >/dev/null 2>&1 || true
fi


if docker images | grep -q "myapp"; then
    echo "Removing old Docker image 'myapp'..." >> "$LOG_FILE"
    docker rmi -f myapp >/dev/null 2>&1 || true
fi


if [ -f "/etc/nginx/sites-enabled/config" ]; then
    echo "Old Nginx config found. Removing..." >> "$LOG_FILE"
    sudo rm -f /etc/nginx/sites-enabled/config
fi


if [ -f "/etc/nginx/ssl/selfsigned.crt" ]; then
    echo "Old SSL certificate exists. Replacing..." >> "$LOG_FILE"
    sudo rm -f /etc/nginx/ssl/selfsigned.*
fi


mkdir -p ~/deploy_logs
EOF
)
    ssh -i "$KEY_PAIR" "$NAME@$ADDRESS" "$IDEMPOTENCE"
    log "✅ Idempotence checks completed."
}


deploy_app() {
    log "Deploying application..."
    rsync -avz -e "ssh -i $KEY_PAIR" ~/"$REPO_NAME" "$NAME@$ADDRESS":~/

    local DEPLOY=$(cat << 'EOF'
read -p "Enter github folder name: " FOLDER
read -p "Container Name: " CON_NAME
LOG_FILE=~/deploy_logs/deploy_$(date +%Y%m%d_%H%M%S).log
cd ~/$FOLDER

docker build -t myapp:latest .
docker run -d --name "$CON_NAME" -p 80:80 myapp

if [ "$(docker ps -q -f name=$CON_NAME)" ]; then
    echo "✅ Container '$CON_NAME' is running" >> "$LOG_FILE"
else
    echo "❌ Container '$CON_NAME' failed to start" >> "$LOG_FILE"
    exit 2
fi
EOF
)
    ssh -i "$KEY_PAIR" "$NAME@$ADDRESS" "$DEPLOY"
}


setup_nginx() {
    log "Configuring Nginx SSL..."
    local NGINX=$(cat << 'EOF'
LOG_FILE=~/deploy_logs/deploy_$(date +%Y%m%d_%H%M%S).log
sudo apt install -y openssl
sudo mkdir -p /etc/nginx/ssl
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/nginx/ssl/selfsigned.key \
  -out /etc/nginx/ssl/selfsigned.crt \
  -subj "/CN=$(hostname -I | awk '{print $1}')"

read -p "Enter github folder name: " FOLDER
sudo cp ~/$FOLDER/config /etc/nginx/sites-enabled/
sudo chmod 755 /etc/nginx/sites-enabled/config
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
EOF
)
    ssh -i "$KEY_PAIR" "$NAME@$ADDRESS" "$NGINX"
}


validate_deployment() {
    log "Validating deployment..."
    local VALIDATE=$(cat << 'EOF'
LOCAL_IP=$(hostname -I | awk '{print $1}')
if curl -fs "http://$LOCAL_IP" >/dev/null; then
    echo "✅ Local endpoint reachable"
else
    echo "❌ Failed to reach local endpoint"
    exit 1
fi

REMOTE_IP=$(hostname -i)
if curl -fs "http://$REMOTE_IP" >/dev/null; then
    echo "✅ Remote endpoint reachable"
else
    echo "❌ Failed to reach remote endpoint"
    exit 1
fi
EOF
)
    ssh -i "$KEY_PAIR" "$NAME@$ADDRESS" "$VALIDATE"
}


main() {
    get_user_input
    install_and_auth_github
    clone_repo
    setup_server
    ensure_idempotence
    deploy_app
    setup_nginx
    validate_deployment
    log "🚀 Deployment completed successfully!"
}

main "$@"
