// config.js

module.exports = {
  aws: {
    port: 22,
    ip: 'AQUI VAI O IP DA VM AWS',
    credentials: {
      username: 'ec2-user',
      privateKeyPath: '../caminho_da_privateKey', // Caminho para a chave privada da AWS
      passphrase: '', // Se sua chave tem uma passphrase
    },
    lastPing: Date.now(),
  },
  oracle: {
    port: 22,
    ip: 'AQUI VAI O IP DA VM ORACLE',
    credentials: {
      username: 'opc',
      privateKeyPath: '../caminho_da_privateKey', // Caminho para a chave privada do Oracle
      passphrase: '', // Se sua chave tem uma passphrase
    },
    lastPing: Date.now(),
  },
};
