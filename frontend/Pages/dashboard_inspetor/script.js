import { getApiUrl, getCsrfToken } from '../LIB/api';

document.addEventListener("DOMContentLoaded", function () {
    const scheduleButton = document.querySelector('.schedule-inspection');
    const reportButtons = document.querySelectorAll('.inspections-list button');

    scheduleButton.addEventListener('click', () => {
        alert('Agendar Nova Inspeção');
        // Aqui você pode adicionar a lógica para abrir um modal ou redirecionar para a página de agendamento
    });

    reportButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const action = event.target.textContent.trim();
            if (action === 'Ver Relatório') {
                alert('Ver Relatório');
                // Aqui você pode adicionar a lógica para visualizar o relatório
            } else if (action === 'Detalhes') {
                alert('Detalhes da Inspeção');
                // Aqui você pode adicionar a lógica para visualizar os detalhes da inspeção
            }
        });
    });
});