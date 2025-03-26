# 📌 Dashboard do Inspetor — Rotas da API

Este documento descreve todas as rotas utilizadas no painel do inspetor após implementação completa e funcional.

---

## 🔐 Autenticação

### `GET /api/users/me`
Obtém os dados do usuário logado (nome, email, tipo).

**Headers:**
- Authorization: Bearer `<token>`

---

## 🔍 Inspeções

### `GET /api/inspecoes/listar`
Lista todas as inspeções do sistema (usado para gerar resumo e próximas inspeções).

### `GET /api/inspecoes/historico?user_email={email}`
Retorna o histórico de inspeções associadas ao inspetor logado.

### `GET /api/inspecoes/{id}`
Consulta detalhes completos de uma inspeção específica (usado ao clicar em "Ver Detalhes").

### `PUT /api/inspecoes/{id}/finalizar`
Finaliza uma inspeção em andamento, adicionando observações.

**Body:**
```json
{
  "concluido_por": "inspetor@email.com",
  "notas": "Sem avarias encontradas."
}
```

---

## 📅 Agendamento

*(Filtro local de inspeções do dia atual baseado no resultado da rota `/api/inspecoes/listar`)*

---

## 📷 Câmeras

### `GET /api/cameras/ativas`
Retorna a lista de câmeras ativas e vinculadas ao sistema.

### `POST /api/cameras`
Adiciona uma nova câmera manualmente.

**Body:**
```json
{
  "nome": "camera5",
  "stream_url": "rtmp://vistotrack.com/live/camera5"
}
```

---

## 🔔 Notificações

### `GET /api/notificacoes`
Retorna alertas e avisos importantes (como atrasos e falhas de câmera).

---

## 📋 Relatórios (Visualização externa)

### `GET /api/relatorios?inspecao_id={id}`
Consulta o relatório completo de uma inspeção.

---

## 🧩 Ações auxiliares e implementações futuras

- `GET /api/novidades`: lista de mensagens do sistema ou changelog (futuramente vinculado ao painel de "Novidades").
- `GET /api/users/{id}`: rota de perfil individual com dados expandidos (exibição no modal do botão "Meu Perfil").
