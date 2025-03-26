document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("access_token");

    if (!token) {
        alert("Sessão expirada. Faça login novamente.");
        window.location.href = "../login/";
        return;
    }

    try {
        // 1. Dados do usuário
        const resUser = await fetch("https://vistotrack.com/api/users/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const user = await resUser.json();
        document.getElementById("user-name").textContent = user.user;
    } catch (error) {
        console.error("Erro ao carregar o usuário:", error);
        alert("Erro seu usuário, faça login novamente.");
        window.location.href = "../login/";
    }

    try {
        // 🔹 Buscar o resumo dos agendamentos do usuário logado
        const response = await fetch("https://vistotrack.com/api/agenda/resumo", {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao carregar os agendamentos.");
        }

        const agendaData = await response.json();

        // 🔹 Atualizar os indicadores
        document.querySelector(".pending-inspections").textContent = agendaData.pendentes || 0;
        document.querySelector(".completed-inspections").textContent = agendaData.concluidos || 0;
        document.querySelector(".last-inspection").textContent = agendaData.ultimo_agendamento || "Nenhum Agendamento Encontrado";

        // 🔹 Preencher a seção "Próxima Inspeção"
        if (agendaData.proximo_agendamento) {
            document.getElementById("next-date").textContent = agendaData.proximo_agendamento.data || "Não informado";
            document.getElementById("next-location").textContent = agendaData.proximo_agendamento.local || "Não informado";
        } else {
            document.getElementById("next-date").textContent = "Nenhum agendamento";
            document.getElementById("next-location").textContent = "-";
        }

        // 🔹 Buscar o histórico de inspeções
        const inspectionsResponse = await fetch("https://vistotrack.com/api/inspecoes/", {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!inspectionsResponse.ok) {
            throw new Error("Erro ao carregar histórico de inspeções.");
        }

        const inspectionsData = await inspectionsResponse.json();
        const tableBody = document.querySelector("#inspections-table");

        tableBody.innerHTML = ""; // Limpar tabela

        if (inspectionsData.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="4">Nenhuma inspeção encontrada</td></tr>`;
        } else {
            inspectionsData.forEach(inspecao => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${inspecao.data}</td>
                    <td>${inspecao.placa}</td>
                    <td>${inspecao.status}</td>
                    <td><button onclick="verDetalhes('${inspecao.id}')">Ver Relatório</button></td>
                `;

                tableBody.appendChild(row);
            });

            // 🔹 Exibir o histórico visualmente se houver dados
            document.querySelector(".inspection-history").classList.add("show-history");
        }

    } catch (error) {
        console.error("Erro ao carregar os agendamentos:", error);
        alert("Erro ao carregar os dados. Tente novamente.");
    }
});

/**
 * Função para visualizar detalhes da inspeção
 */
function verDetalhes(inspecaoId) {
    window.location.href = `../relatorio_condutor/?id=${inspecaoId}`;
}
