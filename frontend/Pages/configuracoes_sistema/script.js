import { getApiUrl, getCsrfToken } from '../LIB/api';

document.addEventListener("DOMContentLoaded", function () {
    const saveButton = document.querySelector('.save-settings');

    saveButton.addEventListener('click', async function () {
        const serverAddress = document.getElementById('server-address').value.trim();
        const cameraConfig = document.getElementById('camera-config').value;
        const aiThreshold = document.getElementById('ai-threshold').value;
        const logRetention = document.getElementById('log-retention').value;

        if (!serverAddress) {
            alert("Por favor, digite o endereço do servidor.");
            return;
        }

        const csrfToken = getCsrfToken();

        try {
            const response = await fetch(getApiUrl('/save-settings'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken
                },
                body: JSON.stringify({ serverAddress, cameraConfig, aiThreshold, logRetention })
            });

            if (!response.ok) {
                throw new Error("Erro ao salvar configurações");
            }

            alert("Configurações salvas com sucesso!");

        } catch (error) {
            alert(error.message);
        }
    });
});