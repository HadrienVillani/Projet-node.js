module.exports.signUpErrors = (err) => {
  let errors = { pseudo: '', email: '', password: '' };

  if (err.message.includes('pseudo')) {
    errors.pseudo = 'Pseudo incorrect';
  }
  if (err.message.includes('email')) {
    errors.email = 'Email incorrect';
  }
  if (err.message.includes('password')) {
    errors.password = 'le mot de passe doit faire 6 caractères minimum';
  }
  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email')) {
    errors.email = 'cette email est déjà pris';
  }
  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo')) {
    errors.pseudo = 'cet pseudo est déjà pris';
  }
  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: '', password: '' };
  if (err.message.includes('password')) {
    errors.password = ' mot de passe incorrect';
  }
  if (err.message.includes('email')) {
    errors.email = 'email  incorrect';
  }

  return errors;
};

module.exports.uploadErrors = (err) => {
  let errors = { format: '', maxSize: '' };
  if (err.message.includes('invalid file')) {
    errors.format = 'Format incompatible';
  }
  if (err.message.includes('invalid size')) {
    errors.maxSize = 'taille incompatible 500 ko max';
  }
  return errors;
};
