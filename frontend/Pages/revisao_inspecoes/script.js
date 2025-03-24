import { getApiUrl, getCsrfToken } from '../LIB/api';

document.addEventListener("DOMContentLoaded", function () {
    const inspectionList = document.querySelector('.inspection-list tbody');

    async function fetchInspections() {
        try {
            const response = await fetch(getApiUrl('/inspections'), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': getCsrfToken()
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao obter inspeções');
            }

            const inspections = await response.json();
            renderInspections(inspections);

        } catch (error) {
            console.error(error.message);
        }
    }

    function renderInspections(inspections) {
        inspectionList.innerHTML = '';
        inspections.forEach(inspection => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${inspection.date}</td>
                <td>${inspection.vehicle}</td>
                <td>${inspection.status}</td>
                <td><button class="review-inspection" data-id="${inspection.id}">Revisar</button></td>
            `;
            inspectionList.appendChild(row);
        });
    }

    inspectionList.addEventListener('click', async (event) => {
        if (event.target.classList.contains('review-inspection')) {
            const inspectionId = event.target.dataset.id;
            const csrfToken = getCsrfToken();

            try {
                const response = await fetch(getApiUrl(`/inspections/${inspectionId}`), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': csrfToken
                    }
                });

                if (!response.ok) {
                    throw new Error('Erro ao obter detalhes da inspeção');
                }

                const inspection = await response.json();
                alert(`Inspeção: ${inspection.vehicle}\n\nStatus: ${inspection.status}\n\nDetalhes: ${inspection.details}`);

            } catch (error) {
                alert(error.message);
            }
        }
    });

    fetchInspections();
});