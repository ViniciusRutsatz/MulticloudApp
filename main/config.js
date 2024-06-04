// config.js

module.exports = {
  aws: {
    port: 22 /*informe aqui a configurada no provedor*/,
    ip: 'AQUI VAI O IP DA VM AWS',
    credentials: {
      username: 'seu_user_aws',
      privateKeyPath: '../caminho_da_privateKey', // Caminho para a chave privada da AWS
      passphrase: '', // Se sua chave tem uma passphrase
    },
    lastPing: Date.now(),
  },
  oracle: {
    port: 22 /*informe aqui a configurada no provedor*/,
    ip: 'AQUI VAI O IP DA VM ORACLE',
    credentials: {
      username: 'seu_user_oci',
      privateKeyPath: '../caminho_da_privateKey', // Caminho para a chave privada do Oracle
      passphrase: '', // Se sua chave tem uma passphrase
    },
    lastPing: Date.now(),
  },
};
