# Aplicação Multicloud

Este repositório contém uma aplicação Node.js que exemplifica o funcionamento de um ambiente multicloud para o Trabalho de Conclusão de Curso de Sistemas de Informação da Universidade do Vale do Rio dos Sinos. 

A aplicação se conecta a diferentes provedores de nuvem (AWS e Oracle) e envia pings para confirmar conexão com o servidor primário (Oracle), em caso de queda de conexão, a aplicação automaticamente se conectará no servidor secundário (AWS)

## Estrutura do Projeto

- `index.js`: O arquivo principal da aplicação que estabelece a conexão com os provedores de nuvem, envia pings e lida com erros.
- `config.js`: Arquivo de configuração que armazena detalhes sobre os provedores de nuvem, como portas, endereços IP e credenciais.

## Pré-requisitos

- Node.js: Certifique-se de ter o Node.js instalado na sua máquina.
- Chaves SSH: As chaves privadas para conectar aos servidores devem estar configuradas e acessíveis.

## Como Executar

Siga as etapas abaixo para executar a aplicação:

1. Clone este repositório:
   git clone https://github.com/ViniciusRutsatz/MulticloudApp.git
   
2. Navegue até o diretório do projeto:
   cd MulticloudApp

3. Instale as dependências:
   npm install
   
4. Configure as informações corretas no arquivo config.js, substituindo as informações comentadas com os devidos dados dos provedores a serem utilizados

5. Execute a aplicação:
   node index.js

## Configuração
No arquivo config.js, você pode configurar detalhes específicos para cada provedor de nuvem, como portas, endereços IP e credenciais. Certifique-se de configurar as informações corretas antes de iniciar a aplicação.

## Contribuições
Se você deseja contribuir para este projeto, sinta-se à vontade para abrir problemas ou enviar solicitações de pull. Estamos abertos a melhorias e correções de bugs.

## Autor
  Vinicius Eduardo Speck Rutsatz

## Licença
Este projeto é licenciado sob Licença MIT.


