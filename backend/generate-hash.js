const bcrypt = require('bcryptjs');

async function generateHash() {
  const password = '12345';
  const hash = await bcrypt.hash(password, 10);
  console.log('Contraseña:', password);
  console.log('Hash generado:', hash);
  console.log('\nEjecuta este SQL:');
  console.log(`UPDATE usuario SET contrasena = '${hash}' WHERE correo = 'alejandro@gmail.com';`);
}

generateHash();
