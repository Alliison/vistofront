import { getApiUrl, getCsrfToken } from '../LIB/api';

document.addEventListener("DOMContentLoaded", function () {
    const startInspectionButton = document.querySelector('.start-inspection');
    const completeInspectionButton = document.querySelector('.complete-inspection');
    const inspectionStatus = document.querySelector('.inspection-status');

    startInspectionButton.addEventListener('click', async () => {
        try {
            const csrfToken = getCsrfToken();
            const response = await fetch(getApiUrl('/start-inspection'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao iniciar a inspeção');
            }

            const data = await response.json();
            inspectionStatus.textContent = `Status: ${data.status}`;
            alert('Inspeção iniciada com sucesso!');

        } catch (error) {
            alert(error.message);
        }
    });

    completeInspectionButton.addEventListener('click', async () => {
        try {
            const csrfToken = getCsrfToken();
            const response = await fetch(getApiUrl('/complete-inspection'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao completar a inspeção');
            }

            const data = await response.json();
            inspectionStatus.textContent = `Status: ${data.status}`;
            alert('Inspeção completada com sucesso!');

        } catch (error) {
            alert(error.message);
        }
    });
});