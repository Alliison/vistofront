import { getApiUrl, getCsrfToken } from '../LIB/api';

document.addEventListener("DOMContentLoaded", function () {
    const reportList = document.querySelector('.report-list tbody');

    async function fetchReports() {
        try {
            const response = await fetch(getApiUrl('/reports'), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': getCsrfToken()
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao obter relatórios');
            }

            const reports = await response.json();
            renderReports(reports);

        } catch (error) {
            console.error(error.message);
        }
    }

    function renderReports(reports) {
        reportList.innerHTML = '';
        reports.forEach(report => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${report.date}</td>
                <td>${report.title}</td>
                <td><button class="view-report" data-id="${report.id}">Ver Relatório</button></td>
            `;
            reportList.appendChild(row);
        });
    }

    reportList.addEventListener('click', async (event) => {
        if (event.target.classList.contains('view-report')) {
            const reportId = event.target.dataset.id;
            const csrfToken = getCsrfToken();

            try {
                const response = await fetch(getApiUrl(`/reports/${reportId}`), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': csrfToken
                    }
                });

                if (!response.ok) {
                    throw new Error('Erro ao obter relatório');
                }

                const report = await response.json();
                alert(`Relatório: ${report.title}\n\n${report.content}`);

            } catch (error) {
                alert(error.message);
            }
        }
    });

    fetchReports();
});