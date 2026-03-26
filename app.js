function mostrarTela(idTela) {
  document.querySelectorAll(".tela").forEach(tela => {
    tela.classList.remove("ativa");
  });

  const tela = document.getElementById(idTela);
  if (tela) {
    tela.classList.add("ativa");
  }

  if (idTela === "tela-principal") {
    preencherDadosUsuario();
    montarMenuPorPerfil();
  }
}

function obterUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function salvarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function setUsuarioLogado(usuario) {
  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
}

function getUsuarioLogado() {
  return JSON.parse(localStorage.getItem("usuarioLogado"));
}

function limparMensagem(id) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = "";
    el.className = "mensagem";
  }
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function cadastrarUsuario() {
  const nome = document.getElementById("nome-cadastro").value.trim();
  const email = document.getElementById("email-cadastro").value.trim();
  const tipo = document.getElementById("tipo-cadastro").value;
  const login = document.getElementById("login-cadastro").value.trim();
  const senha = document.getElementById("senha-cadastro").value.trim();
  const mensagem = document.getElementById("mensagem-cadastro");

  if (!nome || nome.length < 3) {
    mensagem.textContent = "Digite um nome válido.";
    mensagem.className = "mensagem erro";
    return;
  }

  if (!validarEmail(email)) {
    mensagem.textContent = "Digite um email válido.";
    mensagem.className = "mensagem erro";
    return;
  }

  if (!tipo) {
    mensagem.textContent = "Selecione o tipo de usuário.";
    mensagem.className = "mensagem erro";
    return;
  }

  if (!login || login.length < 3) {
    mensagem.textContent = "O login deve ter pelo menos 3 caracteres.";
    mensagem.className = "mensagem erro";
    return;
  }

  if (!senha || senha.length < 4) {
    mensagem.textContent = "A senha deve ter pelo menos 4 caracteres.";
    mensagem.className = "mensagem erro";
    return;
  }

  const usuarios = obterUsuarios();
  const usuarioExistente = usuarios.find(
    u => u.login.toLowerCase() === login.toLowerCase()
  );

  if (usuarioExistente) {
    mensagem.textContent = "Esse login já existe.";
    mensagem.className = "mensagem erro";
    return;
  }

  usuarios.push({ nome, email, tipo, login, senha });
  salvarUsuarios(usuarios);

  mensagem.textContent = "Cadastro realizado com sucesso!";
  mensagem.className = "mensagem sucesso";

  document.getElementById("nome-cadastro").value = "";
  document.getElementById("email-cadastro").value = "";
  document.getElementById("tipo-cadastro").value = "";
  document.getElementById("login-cadastro").value = "";
  document.getElementById("senha-cadastro").value = "";

  setTimeout(() => {
    limparMensagem("mensagem-cadastro");
    mostrarTela("tela-login");
  }, 1000);
}

function entrarSistema() {
  const login = document.getElementById("login-entrar").value.trim();
  const senha = document.getElementById("senha-entrar").value.trim();
  const mensagem = document.getElementById("mensagem-login");

  if (!login || !senha) {
    mensagem.textContent = "Informe login e senha.";
    mensagem.className = "mensagem erro";
    return;
  }

  const usuarios = obterUsuarios();
  const usuario = usuarios.find(
    u => u.login === login && u.senha === senha
  );

  if (!usuario) {
    mensagem.textContent = "Login ou senha inválidos.";
    mensagem.className = "mensagem erro";
    return;
  }

  setUsuarioLogado(usuario);

  mensagem.textContent = "Login realizado com sucesso!";
  mensagem.className = "mensagem sucesso";

  setTimeout(() => {
    limparMensagem("mensagem-login");
    mostrarTela("tela-principal");
  }, 700);
}

function preencherDadosUsuario() {
  const usuario = getUsuarioLogado();
  document.getElementById("nomeUsuario").textContent = usuario?.nome || "";
  document.getElementById("tipoUsuario").textContent = usuario?.tipo || "";
}

function montarMenuPorPerfil() {
  const usuario = getUsuarioLogado();
  const menu = document.getElementById("menuDinamico");

  if (!usuario || !menu) return;

  let html = "";

  if (usuario.tipo === "Doador") {
    html += `<button class="btn btn-verde">Registrar Doação</button>`;
    html += `<button class="btn btn-claro">Minhas Doações</button>`;
    html += `<button class="btn btn-cinza">Acompanhar Retiradas</button>`;
  } else if (usuario.tipo === "Voluntário") {
    html += `<button class="btn btn-verde">Painel de Retirada</button>`;
    html += `<button class="btn btn-claro">Minhas Retiradas</button>`;
  } else if (usuario.tipo === "ONG") {
    html += `<button class="btn btn-verde">Receber Doações</button>`;
    html += `<button class="btn btn-claro">Painel da ONG</button>`;
  } else if (usuario.tipo === "Recebedor") {
    html += `<button class="btn btn-verde">Solicitar Recebimento</button>`;
    html += `<button class="btn btn-claro">Minhas Solicitações</button>`;
  }

  menu.innerHTML = html;
}

function logout() {
  localStorage.removeItem("usuarioLogado");
  document.getElementById("login-entrar").value = "";
  document.getElementById("senha-entrar").value = "";
  mostrarTela("tela-login");
}
