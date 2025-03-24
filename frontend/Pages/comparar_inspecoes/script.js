import { getApiUrl, getCsrfToken } from '../LIB/api';

document.addEventListener("DOMContentLoaded", function () {
    const approveButton = document.querySelector('.approve');
    const rejectButton = document.querySelector('.reject');

    approveButton.addEventListener('click', async function () {
        await handleInspection('approve');
    });

    rejectButton.addEventListener('click', async function () {
        await handleInspection('reject');
    });

    async function handleInspection(action) {
        const csrfToken = getCsrfToken();

        try {
            const response = await fetch(getApiUrl(`/inspection/${action}`), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken
                }
            });

            if (!response.ok) {
                throw new Error(`Erro ao ${action === 'approve' ? 'aprovar' : 'rejeitar'} inspeção`);
            }

            alert(`Inspeção ${action === 'approve' ? 'aprovada' : 'rejeitada'} com sucesso!`);

        } catch (error) {
            alert(error.message);
        }
    }
});