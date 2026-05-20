#!/bin/bash

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Configurando a linguagem Libra via Docker...${NC}"

# Verifica se o Docker está instalado
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Erro: Docker não encontrado. Por favor, instale o Docker primeiro: https://docs.docker.com/get-docker/${NC}"
    exit 1
fi

# Detecta o shell do usuário
USER_SHELL=$(basename "$SHELL")
CONF_FILE=""

case "$USER_SHELL" in
    bash)
        if [[ "$OSTYPE" == "darwin"* ]]; then
            CONF_FILE="$HOME/.bash_profile"
        else
            CONF_FILE="$HOME/.bashrc"
        fi
        ;;
    zsh)
        CONF_FILE="$HOME/.zshrc"
        ;;
    fish)
        CONF_FILE="$HOME/.config/fish/config.fish"
        ;;
    *)
        CONF_FILE="$HOME/.profile"
        ;;
esac

# Garante que o diretório pai do arquivo de config existe (importante para fish)
mkdir -p "$(dirname "$CONF_FILE")"
touch "$CONF_FILE"

# Define o alias baseado no shell
if [ "$USER_SHELL" = "fish" ]; then
    LIBRA_ALIAS="alias libra 'docker run -it --rm -v (pwd):/app -w /app lucazof/libra'"
else
    LIBRA_ALIAS="alias libra='docker run -it --rm -v \$(pwd):/app -w /app lucazof/libra'"
fi

# Adiciona o alias se não existir
if ! grep -Fq "alias libra" "$CONF_FILE"; then
    echo -e "\n# Libra Language Alias" >> "$CONF_FILE"
    echo "$LIBRA_ALIAS" >> "$CONF_FILE"
    echo -e "${GREEN}✅ Alias adicionado a $CONF_FILE${NC}"
else
    echo -e "${YELLOW}ℹ️ Alias já configurado em $CONF_FILE${NC}"
fi

echo -e "${GREEN}🚀 Instalação concluída com sucesso!${NC}"
echo -e "${BLUE}Abra um novo terminal e digite:${NC}"
echo -e "  libra --versao"
