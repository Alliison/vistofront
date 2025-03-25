document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("access_token");
  
    if (!token) {
      alert("Sessão expirada. Faça login novamente.");
      window.location.href = "../login/";
      return;
    }
  
    try {
      // Carrega nome do usuário autenticado
      const resUser = await fetch("https://vistotrack.com/api/users/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      const usuario = await resUser.json();
      document.querySelector("header h1").textContent = `Gestão de Usuários - ${usuario.nome}`;
  
      // Carrega todos os usuários do sistema (ajuste conforme rota futura)
      const resTodos = await fetch("https://vistotrack.com/api/users/list", {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      const usuarios = await resTodos.json();
  
      const tabela = document.getElementById("user-table-body");
      tabela.innerHTML = "";
  
      // Exibe apenas quem não é tipo "user"
      usuarios
        .filter(u => u.tipo !== "user")
        .forEach(u => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${u.nome}</td>
            <td>${u.email}</td>
            <td>${u.tipo}</td>
            <td>
              <input type="password" class="user-password" maxlength="3" value="${u.senha_inspecao || ''}" disabled
                pattern="^(?!123|234|345|456|567|678|789|890|012|098|987|876|765|654|543|432|321|210)[0-9]{3}$"
                title="Senha deve conter 3 dígitos não sequenciais" />
            </td>
            <td>
              <label class="toggle-switch">
                <input type="checkbox" ${u.ativo ? "checked" : ""}>
                <span class="toggle-slider"></span>
              </label>
            </td>
            <td>
              <button class="edit-button" onclick="editarUsuario(this)">✏️ Editar</button>
            </td>
          `;
          tabela.appendChild(tr);
        });
  
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar dados dos usuários.");
    }
  });
  
  // Abrir/Fechar modal
  function abrirModalAdicionar() {
    document.getElementById("modal-adicionar").classList.remove("hidden");
  }
  function fecharModal(id) {
    document.getElementById(id).classList.add("hidden");
  }
  
  // Alternar modo de edição na linha
  function editarUsuario(botao) {
    const linha = botao.closest("tr");
    const inputs = linha.querySelectorAll("input");
  
    const modoEdicao = inputs[0].disabled;
    inputs.forEach(input => input.disabled = !modoEdicao);
    botao.textContent = modoEdicao ? "💾 Salvar" : "✏️ Editar";
  
    // Em produção, você pode salvar alterações via PATCH aqui.
  }
  
  // Validação e envio do formulário
  document.getElementById("form-adicionar-usuario").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("access_token");
  
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const tipo = document.getElementById("tipo").value;
    const senha_acesso = document.getElementById("senha-acesso").value;
    const senha_inspecao = document.getElementById("senha-inspecao").value;
  
    const senhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\\-=\\[\]{};':"\\|,.<>\/?]).{8,}$/;
    const senhaCurta = /^(?!123|234|345|456|567|678|789|890|012|098|987|876|765|654|543|432|321|210)[0-9]{3}$/;
  
    if (!senhaForte.test(senha_acesso)) {
      alert("A senha de acesso deve ter no mínimo 8 caracteres com letras maiúsculas, minúsculas, número e símbolo.");
      return;
    }
  
    if (!senhaCurta.test(senha_inspecao)) {
      alert("A senha de inspeção deve ter 3 números não sequenciais.");
      return;
    }
  
    try {
      const payload = {
        nome,
        email,
        senha: senha_acesso,
        senha_inspecao, // campo extra
        tipo,
        telefone: "000000000" // placeholder, se necessário
      };
  
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
  