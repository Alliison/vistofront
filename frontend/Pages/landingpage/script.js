document.addEventListener("DOMContentLoaded", function () {
    // Seleciona os botões
    const loginButton = document.querySelector(".btn-outline");
    const registerButton = document.querySelector(".btn-primary");
    const accessButton = document.querySelector(".hero .btn-primary");

    // Redirecionamento para login
    loginButton.addEventListener("click", function () {
        window.location.href = "/login/";
    });

    // Redirecionamento para cadastro
    registerButton.addEventListener("click", function () {
        window.location.href = "/cadastro/";
    });

    // Redirecionamento para acesso ao sistema
    accessButton.addEventListener("click", function () {
        window.location.href = "/login/";
    });
});
