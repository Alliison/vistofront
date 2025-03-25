document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("access_token");
  
    if (!token) {
      alert("Sessão expirada. Faça login novamente.");
      window.location.href = "../login/";
      return;
    }
  
    // 🔹 Buscar nome do usuário autenticado
    fetch("https://vistotrack.com/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        const header = document.querySelector("header h1");
        if (data?.nome) {
          header.innerHTML = `Gestão de Usuários - ${data.nome}`;
        }
      })
      .catch(() => {
        console.warn("Não foi possível carregar o nome do usuário.");
      });
  });
  
  // 🔹 Abrir modal de novo usuário
  function abrirModalAdicionar() {
    document.getElementById("modal-adicionar").classList.remove("hidden");
  }
  
  // 🔹 Fechar modal genérico
  function fecharModal(id) {
    document.getElementById(id).classList.add("hidden");
  }
  
  // 🔹 Editar usuário (modo visual - preparar integração futura)
  function editarUsuario(button) {
    const row = button.closest("tr");
    const inputs = row.querySelectorAll("input");
    inputs.forEach(input => input.disabled = !input.disabled);
  
    button.textContent = inputs[0].disabled ? "✏️ Editar" : "💾 Salvar";
  }
  
  // 🔹 Submeter novo usuário (em breve para /api/auth/register)
  document.getElementById("form-adicionar-usuario").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("access_token");
  
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const tipo = document.getElementById("tipo").value;
    const senha = document.getElementById("senha").value;
  
    // 🔒 Validação simples
    if (!/^(?!123|234|345|456|567|678|789|890|012|098|987|876|765|654|543|432|321|210)[0-9]{3}$/.test(senha)) {
      alert("A senha não pode conter números sequenciais.");
      return;
    }
  
    const payload = {
      nome,
      email,
      telefone: "000000000", // pode ser ajustado depois
      senha
    };
  
    try {
      const res = await fetch("https://vistotrack.com/api/auth/register", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
  
      if (res.ok) {
        alert("Usuário criado com sucesso!");
        location.reload();
      } else {
        alert("Erro ao criar usuário.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro de conexão.");
    }
  });
  