import { getApiUrl, getCsrfToken } from '../LIB/api';

document.addEventListener("DOMContentLoaded", function () {
    const statusElements = document.querySelectorAll('.system-status tbody tr');

    statusElements.forEach(row => {
        const component = row.cells[0].textContent.trim();
        const statusCell = row.cells[1];

        // Simulação de atualização de status
        setInterval(async () => {
            try {
                const response = await fetch(getApiUrl(`/status/${component.toLowerCase().replace(' ', '-')}`), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': getCsrfToken()
                    }
                });

                if (!response.ok) {
                    throw new Error(`Erro ao obter status do ${component}`);
                }

                const data = await response.json();
                statusCell.textContent = data.status;

            } catch (error) {
                console.error(error.message);
                statusCell.textContent = 'Erro';
            }
        }, 5000); // Atualiza a cada 5 segundos
    });
});