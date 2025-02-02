#!/bin/bash

echo "Atualizando Dockerfile..."
docker-compose down
docker rmi -f invisti-api-node
systemctl stop postgresql
docker build -t invisti-api-node ./backend/
docker-compose up -d

echo "Dockerfile atualizado com sucesso!"