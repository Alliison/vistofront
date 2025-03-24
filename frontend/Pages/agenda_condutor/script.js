document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("access_token");

    if (!token) {
        alert("Sessão expirada. Faça login novamente.");
        window.location.href = "../login/";
        return;
    }

    try {
        // 🔹 Buscar os agendamentos do usuário logado
        const response = await fetch("http://vistotrack.com:8000/api/agenda/", {
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!response.ok) {
            throw new Error("Erro ao carregar agendamentos.");
        }

        const agendamentos = await response.json();
        const scheduleTable = document.querySelector("#schedule-table");

        scheduleTable.innerHTML = ""; // Limpa a tabela antes de adicionar os dados

        if (agendamentos.length === 0) {
            scheduleTable.innerHTML = `<tr><td colspan="4">Nenhum agendamento encontrado</td></tr>`;
        } else {
            agendamentos.forEach(ag => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${ag.data}</td>
                    <td>${ag.horario}</td>
                    <td>${ag.local}</td>
                    <td>
                        <button class="reschedule-button" data-id="${ag.id}">Reagendar</button>
                        <button class="cancel-button" data-id="${ag.id}">Cancelar</button>
                    </td>
                `;

                scheduleTable.appendChild(row);
            });

            // Adicionar evento de reagendamento
            document.querySelectorAll(".reschedule-button").forEach(button => {
                button.addEventListener("click", (event) => {
                    const agendamentoId = event.target.getAttribute("data-id");
                    document.querySelector("#reschedule-id").value = agendamentoId;
                    document.querySelector("#reschedule-modal").classList.remove("hidden");
                });
            });

            // Adicionar evento de cancelamento
            document.querySelectorAll(".cancel-button").forEach(button => {
                button.addEventListener("click", async (event) => {
                    const agendamentoId = event.target.getAttribute("data-id");

                    if (confirm("Tem certeza que deseja cancelar este agendamento?")) {
                        await fetch(`http://vistotrack.com:8000/api/agenda/${agendamentoId}`, {
                            method: "DELETE",
                            headers: { "Authorization": `Bearer ${token}` }
                        });

                        alert("Agendamento cancelado!");
                        location.reload();
                    }
                });
            });
        }

    } catch (error) {
        console.error("Erro ao carregar os agendamentos:", error);
        alert("Erro ao carregar os agendamentos. Tente novamente.");
    }
});

// 🔹 Evento para criar um novo agendamento
document.querySelector("#new-schedule-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const token = localStorage.getItem("access_token");
    const data = document.querySelector("#date").value;
    const horario = document.querySelector("#time").value;
    const local = document.querySelector("#location").value;

    const response = await fetch("http://vistotrack.com:8000/api/agenda/", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ data, horario, local })
    });

    if (response.ok) {
        alert("Agendamento criado!");
        location.reload();
    } else {
        alert("Erro ao criar agendamento.");
    }
});

// 🔹 Evento para reagendar
document.querySelector("#reschedule-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const token = localStorage.getItem("access_token");
    const agendamentoId = document.querySelector("#reschedule-id").value;
    const data = document.querySelector("#new-date").value;
    const horario = document.querySelector("#new-time").value;

    const response = await fetch(`http://vistotrack.com:8000/api/agenda/${agendamentoId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ data, horario })
    });

    if (response.ok) {
        alert("Agendamento reagendado!");
        location.reload();
    } else {
        alert("Erro ao reagendar.");
    }
});
