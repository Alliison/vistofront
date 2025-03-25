document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    if (!loginForm) {
        console.error("Elemento #login-form não encontrado.");
        return;
    }

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.querySelector("#username").value.trim();
        const password = document.querySelector("#password").value.trim();

	if (!username || !password) {
	    showAlert("Preencha usuário e senha!", "error");
	    return;
	}

        showLoading(true);

        try {
            const senhaS = await encryptPassword(password);

            const response = await fetch("https://vistotrack.com/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: username,
                    senha: senhaS
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Erro ao fazer login.");
            }

            // Armazena o token no localStorage
            localStorage.setItem("access_token", data.access_token);

            // 🔐 Também salva o role (se quiser usar em outras telas)
            if (data.role) {
                localStorage.setItem("user_role", data.role);
            }

            // Redirecionamento com base no perfil
            if (data.role === "user") {
                window.location.href = "../dashboard_inspetor/";
            } else {
                window.location.href = "../dashboard_inspetor/";
            }

        } catch (error) {
            showAlert(error.message, "error");
        } finally {
            showLoading(false);
        }
    });
});

// 🔐 Função para criptografar a senha usando SHA-256
async function encryptPassword(password) {
    try {
        if (typeof CryptoJS === "undefined") {
            throw new Error("CryptoJS não está definido. Certifique-se de que a biblioteca está carregada.");
        }
        return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    } catch (error) {
        console.error("Erro ao criptografar a senha:", error);
        return null;
    }
}

// ✅ Valida e-mail ou telefone
function validarEmailTelefone(input) {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    const telefoneRegex = /^\\d{10,11}$/;
    return emailRegex.test(input) || telefoneRegex.test(input);
}

// 🔔 Exibe alertas
function showAlert(message, type = "info") {
    alert(message); // Substituir por toast/modal se desejar
}

// ⏳ Indica carregamento no botão
function showLoading(isLoading) {
    const button = document.querySelector("#login-form button[type='submit']");
    if (button) {
        button.disabled = isLoading;
        button.innerText = isLoading ? "Aguarde..." : "Entrar";
    }
}
