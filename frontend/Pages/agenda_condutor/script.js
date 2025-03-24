document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("access_token");

    if (!token) {
        alert("Sessão expirada. Faça login novamente.");
        window.location.href = "../login/";
        return;
    }

    try {
        const response = await fetch("http://vistotrack.com:8000/api/agenda/", {
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!response.ok) throw new Error("Erro ao carregar agendamentos.");

        const agendamentos = await response.json();
        const scheduleTable = document.querySelector("#schedule-table");
        const feedback = document.querySelector("#empty-feedback");
        const scheduleList = document.querySelector(".schedule-list");

        scheduleTable.innerHTML = ""; // limpa a tabela

        if (agendamentos.length === 0) {
            scheduleList.style.display = "none";
            feedback.classList.remove("hidden");
        } else {
            feedback.classList.add("hidden");
            scheduleList.style.display = "block";

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

            // Reagendamento
            document.querySelectorAll(".reschedule-button").forEach(button => {
                button.addEventListener("click", (event) => {
                    const agendamentoId = event.target.getAttribute("data-id");
                    document.querySelector("#reschedule-id").value = agendamentoId;
                    abrirModal("reschedule-modal");
                });
            });

            // Cancelamento
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
        console.error("Erro ao carregar agendamentos:", error);
        alert("Erro ao carregar os agendamentos. Tente novamente.");
    }
});

// 🔹 Novo Agendamento
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

// 🔹 Reagendar
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


// 🔹 Funções utilitárias
function abrirNovoAgendamento() {
    abrirModal("new-schedule-modal");
}

function abrirModal(id) {
    document.getElementById(id).classList.remove("hidden");
}

function fecharModal(id) {
    document.getElementById(id).classList.add("hidden");
}
