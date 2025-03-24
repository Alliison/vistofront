import { getApiUrl, getCsrfToken } from '../LIB/api';

document.addEventListener("DOMContentLoaded", function () {
    const viewButtons = document.querySelectorAll('.view-button');
    const modal = document.getElementById('reschedule-modal');
    const cancelButton = document.querySelector('.cancel-button');

    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert(`Em breve essa função estará disponível.`);
            // Aqui poderá ser implementada a lógica de troca de visualização
        });
    });

    cancelButton.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Função para abrir o modal de solicitação de revisão
    function openRescheduleModal() {
        modal.classList.remove('hidden');
    }

    // Adicionar ouvinte de evento para abrir o modal (exemplo)
    document.querySelector('.some-button-to-open-modal').addEventListener('click', openRescheduleModal);

    // Função para enviar a solicitação de revisão
    async function requestReschedule(event) {
        event.preventDefault();

        const reason = document.getElementById('reason').value.trim();

        if (!reason) {
            alert("Por favor, explique o motivo da solicitação.");
            return;
        }

        const csrfToken = getCsrfToken();

        try {
            const response = await fetch(getApiUrl('/request-reschedule'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken
                },
                body: JSON.stringify({ reason })
            });

            if (!response.ok) {
                throw new Error("Erro ao solicitar revisão de agendamento");
            }

            alert("Solicitação enviada com sucesso!");
            modal.classList.add('hidden');

        } catch (error) {
            alert(error.message);
        }
    }

    // Adicionar ouvinte de evento ao formulário de solicitação de revisão
    document.querySelector('#reschedule-modal form').addEventListener('submit', requestReschedule);
});