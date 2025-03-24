import { getApiUrl, getCsrfToken } from '../LIB/api';

document.addEventListener("DOMContentLoaded", function () {
    const vehicleList = document.querySelector('.vehicle-list tbody');

    async function fetchVehicles() {
        try {
            const response = await fetch(getApiUrl('/vehicles'), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': getCsrfToken()
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao obter veículos');
            }

            const vehicles = await response.json();
            renderVehicles(vehicles);

        } catch (error) {
            console.error(error.message);
        }
    }

    function renderVehicles(vehicles) {
        vehicleList.innerHTML = '';
        vehicles.forEach(vehicle => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${vehicle.plate}</td>
                <td>${vehicle.model}</td>
                <td>${vehicle.year}</td>
                <td><button class="delete-vehicle" data-id="${vehicle.id}">Deletar</button></td>
            `;
            vehicleList.appendChild(row);
        });
    }

    vehicleList.addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-vehicle')) {
            const vehicleId = event.target.dataset.id;
            const csrfToken = getCsrfToken();

            try {
                const response = await fetch(getApiUrl(`/vehicles/${vehicleId}`), {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': csrfToken
                    }
                });

                if (!response.ok) {
                    throw new Error('Erro ao deletar veículo');
                }

                alert('Veículo deletado com sucesso!');
                event.target.closest('tr').remove();

            } catch (error) {
                alert(error.message);
            }
        }
    });

    fetchVehicles();
});