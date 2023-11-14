function validarCampos() {
  // Obter valores dos campos
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const nome = document.getElementById('nome').value;
  const sobrenome = document.getElementById('sobrenome').value;
  const password = document.getElementById('password').value;

  // Limpar mensagens de erro
  document.getElementById('usernameHelp').textContent = '';
  document.getElementById('emailHelp').textContent = '';
  document.getElementById('nomeHelp').textContent = '';
  document.getElementById('sobrenomeHelp').textContent = '';
  document.getElementById('passwordHelp').textContent = '';

  // Armazenar mensagens de erro
  let erros = [];

  // Validar campos
  if (!username) {
    erros.push('Digite um username válido.');
    document.getElementById('username').classList.add('is-invalid');
  } else {
    document.getElementById('username').classList.remove('is-invalid');
  }

  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!email || !emailRegex.test(email)) {
    erros.push('Digite um email válido.');
    document.getElementById('email').classList.add('is-invalid');
  } else {
    document.getElementById('email').classList.remove('is-invalid');
  }

  if (!nome) {
    erros.push('Digite um nome válido.');
    document.getElementById('nome').classList.add('is-invalid');
  } else {
    document.getElementById('nome').classList.remove('is-invalid');
  }

  if (!sobrenome) {
    erros.push('Digite um sobrenome válido.');
    document.getElementById('sobrenome').classList.add('is-invalid');
  } else {
    document.getElementById('sobrenome').classList.remove('is-invalid');
  }

  if (!password) {
    erros.push('Digite uma senha válida.');
    document.getElementById('password').classList.add('is-invalid');
  } else {
    document.getElementById('password').classList.remove('is-invalid');
  }

  // Exibir mensagens de erro
  if (erros.length > 0) {
    const mensagemErro = erros.join('<br>');
    document.getElementById('mensagem').innerHTML = `<div class="alert alert-danger">${mensagemErro}</div>`;
  } else {
    // Se todos os campos estiverem válidos, prosseguir com o cadastro
    cadastrarUsuario();
  }
}

function cadastrarUsuario() {
  const formData = {
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    nome: document.getElementById('nome').value,
    sobrenome: document.getElementById('sobrenome').value,
    password: document.getElementById('password').value
  };

  fetch('http://pet-backend:8080/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then(response => {
    if (response.ok) {
      document.getElementById('mensagem').innerHTML = '<div class="alert alert-success" role="alert">Cadastrado com sucesso</div>';
      // Limpar os dados do formulário após o cadastro
      document.getElementById('cadastroForm').reset();
    } else {
      document.getElementById('mensagem').innerHTML = '<div class="alert alert-danger" role="alert">Erro no cadastro</div>';
    }
  })
  .catch((error) => {
    console.error('Erro:', error);
  });
}
