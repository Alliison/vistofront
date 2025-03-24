import { getApiUrl, getCsrfToken } from '../LIB/api';

document.addEventListener("DOMContentLoaded", function () {
    const notificationList = document.querySelector('.notification-list tbody');

    async function fetchNotifications() {
        try {
            const response = await fetch(getApiUrl('/notifications'), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': getCsrfToken()
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao obter notificações');
            }

            const notifications = await response.json();
            renderNotifications(notifications);

        } catch (error) {
            console.error(error.message);
        }
    }

    function renderNotifications(notifications) {
        notificationList.innerHTML = '';
        notifications.forEach(notification => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${notification.date}</td>
                <td>${notification.message}</td>
                <td><button class="delete-notification" data-id="${notification.id}">Deletar</button></td>
            `;
            notificationList.appendChild(row);
        });
    }

    notificationList.addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-notification')) {
            const notificationId = event.target.dataset.id;
            const csrfToken = getCsrfToken();

            try {
                const response = await fetch(getApiUrl(`/notifications/${notificationId}`), {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': csrfToken
                    }
                });

                if (!response.ok) {
                    throw new Error('Erro ao deletar notificação');
                }

                alert('Notificação deletada com sucesso!');
                event.target.closest('tr').remove();

            } catch (error) {
                alert(error.message);
            }
        }
    });

    fetchNotifications();
});