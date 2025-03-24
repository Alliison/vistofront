document.addEventListener("DOMContentLoaded", function () {
    console.log("Script carregado!");

    const form = document.getElementById("registration-form");

    if (!form) {
        console.error("Erro: Formulário não encontrado!");
        return;
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        console.log("Formulário enviado! Iniciando validação...");

        const name = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefone = document.getElementById("telefone").value.trim();
        const password = document.getElementById("senha").value.trim();

        // ✅ Validação dos campos obrigatórios
        if (!name || !email || !telefone || !password) {
            console.error("Erro: Campos vazios!");
            showAlert("Preencha todos os campos!", "error");
            return;
        }

        // ✅ Validação de e-mail
        if (!validarEmail(email)) {
            console.error("Erro: E-mail inválido!");
            showAlert("E-mail inválido!", "error");
            return;
        }

        // ✅ Validação de telefone
        if (!validarTelefone(telefone)) {
            console.error("Erro: Telefone inválido!");
            showAlert("Telefone inválido! Formato aceito: (XX) XXXXX-XXXX", "error");
            return;
        }

        // ✅ Validação de senha forte
        if (!validarSenha(password)) {
            console.error("Erro: Senha fraca!");
            showAlert("A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, número e caractere especial.", "error");
            return;
        }

        console.log("Dados validados. Enviando para a API...");

        try {
            const encryptedPassword = await encryptPassword(password);

            const response = await fetch("https://vistotrack.com/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: name,
                    email: email,
                    telefone: telefone,
                    senha: await encryptPassword(password) // * Senha já criptografada
                })
            });

            console.log("Requisição enviada. Aguardando resposta...");
            const data = await response.json();
            console.log("Resposta da API:", data);

            if (!response.ok) {
                throw new Error(data.detail || "Erro no cadastro.");
            }

            showAlert("Cadastro realizado com sucesso!", "success");
            setTimeout(() => {
                window.location.href = "../login/";
            }, 2000);
        } catch (error) {
            console.error("Erro ao enviar para a API:", error);
            showAlert(error.message, "error");
        }
    });
});

/**
 * Valida o formato do e-mail usando regex.
 * @param {string} email - E-mail do usuário.
 * @returns {boolean} Retorna `true` se o e-mail for válido.
 */
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Valida o formato do telefone (suporta DDD e diferentes formatos).
 * Exemplos válidos: "(11) 91234-5678", "11912345678", "11 91234-5678"
 * @param {string} telefone - Número de telefone do usuário.
 * @returns {boolean} Retorna `true` se o telefone for válido.
 */
function validarTelefone(telefone) {
    const regex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    return regex.test(telefone);
}

/**
 * Valida se a senha contém no mínimo 8 caracteres, incluindo:
 * - Pelo menos 1 letra maiúscula
 * - Pelo menos 1 letra minúscula
 * - Pelo menos 1 número
 * - Pelo menos 1 caractere especial (@$!%*?&)
 * Exemplos válidos: "Senha@123", "Teste2023!"
 * @param {string} senha - Senha do usuário.
 * @returns {boolean} Retorna `true` se a senha for válida.
 */
function validarSenha(senha) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(senha);
}


/**
 * Criptografa a senha usando SHA-256 e retorna o hash em formato hexadecimal.
 * @param {string} password - Senha do usuário.
 * @returns {string} Hash criptografado.
 */
async function encryptPassword(password) {
    try {
        return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);  // 🔹 Retorna hash SHA-256 em hexadecimal
    } catch (error) {
        console.error("Erro ao criptografar a senha:", error);
        return null;
    }
}


/**
 * Exibe um alerta ao usuário
 * @param {string} message - Mensagem a ser exibida.
 * @param {string} type - Tipo do alerta ("success" ou "error").
 */
function showAlert(message, type) {
    const alertBox = document.getElementById("alertBox");
    if (!alertBox) return;

    alertBox.innerText = message;
    alertBox.className = `alert ${type}`;
    alertBox.style.display = "block";

    setTimeout(() => {
        alertBox.style.display = "none";
    }, 3000);
}

/**
 * Exibe ou esconde um indicador de carregamento
 * @param {boolean} isLoading - Define se o indicador será exibido ou ocultado.
 */
function showLoading(isLoading) {
    const loadingIndicator = document.getElementById("loadingIndicator");
    if (!loadingIndicator) return;

    loadingIndicator.style.display = isLoading ? "block" : "none";
}
