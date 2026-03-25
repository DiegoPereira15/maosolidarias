function mostrarTela(id) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  document.getElementById(id).classList.add("ativa");
}

function obterUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function salvarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function cadastrarUsuario() {
  const nome = document.getElementById("nome-cadastro").value;
  const email = document.getElementById("email-cadastro").value;
  const tipo = document.getElementById("tipo-cadastro").value;
  const login = document.getElementById("login-cadastro").value;
  const senha = document.getElementById("senha-cadastro").value;

  const usuarios = obterUsuarios();

  usuarios.push({ nome, email, tipo, login, senha });

  salvarUsuarios(usuarios);

  alert("Cadastro realizado!");
  mostrarTela("tela-login");
}

function entrarSistema() {
  const login = document.getElementById("login-entrar").value;
  const senha = document.getElementById("senha-entrar").value;

  const usuarios = obterUsuarios();

  const usuario = usuarios.find(u => u.login === login && u.senha === senha);

  if (!usuario) {
    alert("Login inválido");
    return;
  }

  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

  montarMenu(usuario);
  mostrarTela("tela-principal");
}

function montarMenu(usuario) {
  const menu = document.getElementById("menuDinamico");

  if (usuario.tipo === "Doador") {
    menu.innerHTML = "<button>Registrar Doação</button>";
  } else {
    menu.innerHTML = "<button>Ver Doações</button>";
  }
}
