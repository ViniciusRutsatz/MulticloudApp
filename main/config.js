// config.js

module.exports = {
  aws: {
    port: 22,
    ip: '18.229.102.31',
    credentials: {
      username: 'ec2-user',
      privateKeyPath: '../parkeys/vm_aws_tcc_vini.pem', // Caminho para a chave privada da AWS
      passphrase: '', // Se sua chave tem uma passphrase
    },
    lastPing: Date.now(),
  },
  oracle: {
    port: 22,
    ip: '168.138.228.28',
    credentials: {
      username: 'opc',
      privateKeyPath: '../parkeys/ssh-key-2023-11-07.key', // Caminho para a chave privada do Oracle
      passphrase: '', // Se sua chave tem uma passphrase
    },
    lastPing: Date.now(),
  },
};
