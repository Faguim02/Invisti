#!/bin/bash

echo "Atualizando Dockerfile..."
docker-compose down
docker rmi -f invisti-api-node
docker build -t invisti-api-node ./backend/
docker-compose up -d

echo "Dockerfile atualizado com sucesso!"