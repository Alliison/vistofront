import { getApiUrl, getCsrfToken } from '../LIB/api';

document.addEventListener("DOMContentLoaded", function () {
    const addUserButton = document.querySelector('.add-user');
    const userTable = document.querySelector('.user-table tbody');

    addUserButton.addEventListener('click', () => {
        alert('Adicionar Novo Usuário');
        // Aqui você pode adicionar a lógica para abrir um modal ou redirecionar para a página de adição de usuário
    });

    userTable.addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-user')) {
            const userId = event.target.dataset.userId;
            const csrfToken = getCsrfToken();

            try {
                const response = await fetch(getApiUrl(`/delete-user/${userId}`), {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': csrfToken
                    }
                });

                if (!response.ok) {
                    throw new Error('Erro ao deletar usuário');
                }

                alert('Usuário deletado com sucesso!');
                event.target.closest('tr').remove();

            } catch (error) {
                alert(error.message);
            }
        }
    });
});