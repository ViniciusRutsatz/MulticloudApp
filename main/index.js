//index.js

// Importa as bibliotecas necessárias
const chalk = require('chalk');
const { Client } = require('ssh2');

// Importa as configurações da aplicação
const config = require('./config');

// Inicia com o provedor primário (Oracle) no início
let currentProvider = 'oracle';

// Função para conectar a um provedor (Oracle ou AWS)
function connect(provider) {
  const sshConfig = config[provider];

  const conn = new Client();

  // Evento 'ready' é acionado quando a conexão SSH é estabelecida com sucesso
  conn.on('ready', () => {
    console.log(chalk.green(`Conectado com ${provider}`));
    ping(provider); // Inicia a verificação de ping
  });

  // Evento 'error' é acionado em caso de erro na conexão SSH
  conn.on('error', (error) => {
    console.log(chalk.red(`Erro na conexão com ${provider}: ${error.message}`));
    // Troca para o provedor secundário (AWS) se houver um erro no primário (Oracle)
    if (provider === 'oracle') {
      currentProvider = 'aws';
      console.log(chalk.green('Tentando se conectar com o outro provedor'));
      // Tenta se reconectar após um atraso de 5 segundos
      setTimeout(() => connect('aws'), 5000);
    } else if (provider === 'aws') {
      currentProvider = 'oracle';
      console.log(chalk.green('Tentando se conectar com o outro provedor'));
      // Tenta se reconectar após um atraso de 5 segundos
      setTimeout(() => connect('oracle'), 5000);
    } else {
      console.log(chalk.red('Não há mais provedores disponíveis'));
      exit();
    }
  });

  // Conecta à instância usando as configurações fornecidas
  conn.connect({
    host: sshConfig.ip,
    port: sshConfig.port,
    username: sshConfig.credentials.username,
    readyTimeout: 40000, // Tempo limite (40 segundos) para a conexão estar pronta
    // Utiliza a chave SSH apropriada para o provedor
    privateKey: require('fs').readFileSync(sshConfig.credentials.privateKeyPath),
    passphrase: sshConfig.credentials.passphrase || '', // Se a chave tem uma passphrase
  });
}

// Função para realizar a verificação de ping
function ping(provider) {
  const sshConfig = config[provider];
  const conn = new Client();

  // Evento 'ready' é acionado quando a conexão SSH é estabelecida com sucesso
  conn.on('ready', () => {
    // Executa um comando SSH para realizar um ping
    const command = 'ping -i 1 google.com'; // Ping contínuo a cada 1 segundo
    conn.exec(command, (err, stream) => {
      if (err) {
        console.error(err);
        return;
      }

      // Evento 'close' é acionado quando o comando de ping é encerrado
      stream.on('close', (code, signal) => {
        console.log(`Ping de ${provider} encerrado. Código: ${code}`);
        conn.end();
        console.log(chalk.green('Tentando se conectar com o outro provedor'));
        // Tenta se reconectar após um atraso de 5 segundos
        setTimeout(() => connect(currentProvider === 'oracle' ? 'aws' : 'oracle'), 5000);
      }).on('data', (data) => {
        console.log(chalk.blue(data.toString()));
      });
    });
  });

  // Evento 'error' é acionado em caso de erro na conexão SSH
  conn.on('error', (error) => {
    console.log(chalk.red(`Erro na conexão com ${provider}: ${error.message}`));
    // Troque para o provedor secundário (AWS) se houver um erro no primário (Oracle)
    if (provider === 'oracle') {
      currentProvider = 'aws';
      console.log(chalk.green('Tentando se conectar com o outro provedor'));
      // Tenta se reconectar após um atraso de 5 segundos
      setTimeout(() => connect('aws'), 5000);
    } else if (provider === 'aws') {
      currentProvider = 'oracle';
      console.log(chalk.green('Tentando se conectar com o outro provedor'));
      // Tenta se reconectar após um atraso de 5 segundos
      setTimeout(() => connect('oracle'), 5000);
    } else {
      console.log(chalk.red('Não há mais provedores disponíveis'));
      exit();
    }
  });

  // Conecta à instância usando as configurações fornecidas
  conn.connect({
    host: sshConfig.ip,
    port: sshConfig.port,
    username: sshConfig.credentials.username,
    readyTimeout: 40000, // Tempo limite (40 segundos) para a conexão estar pronta
    // Utiliza a chave SSH apropriada para o provedor
    privateKey: require('fs').readFileSync(sshConfig.credentials.privateKeyPath),
    passphrase: sshConfig.credentials.passphrase || '', // Se a chave tem uma passphrase
  });
}

// Função para encerrar a aplicação
function exit() {
  console.log('Encerrando a aplicação');
  process.exit();
}

// Inicia a aplicação tentando se conectar com o provedor primário (Oracle)
connect('oracle');
