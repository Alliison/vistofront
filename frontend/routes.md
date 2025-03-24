# VistoTrack - API Routes Documentation

## 📌 Agendamentos
- **POST** `/create-schedule` - Criação de um novo agendamento.
- **POST** `/reschedule` - Reagendamento de um agendamento existente.
- **DELETE** `/cancel-schedule/{id}` - Cancelamento de um agendamento específico.
- **GET** `/schedules` - Listagem de todos os agendamentos.
- **GET** `/schedules/{id}` - Obtém os detalhes de um agendamento específico.
- **PATCH** `/schedules/{id}` - Atualiza informações de um agendamento.

## 🔔 Notificações
- **GET** `/notifications` - Obtém a lista de notificações.
- **DELETE** `/notifications/{id}` - Deleta uma notificação específica.
- **PATCH** `/notifications/{id}/mark-as-read` - Marca uma notificação como lida.

## 📊 Relatórios
- **GET** `/reports` - Obtém a lista de relatórios.
- **GET** `/reports/{id}` - Obtém detalhes de um relatório específico.
- **POST** `/reports/generate` - Gera um novo relatório sob demanda.
- **DELETE** `/reports/{id}` - Deleta um relatório específico.

## 🚗 Inspeções
- **GET** `/inspections` - Obtém a lista de inspeções realizadas.
- **GET** `/inspections/{id}` - Obtém detalhes de uma inspeção específica.
- **POST** `/start-inspection` - Inicia uma nova inspeção.
- **POST** `/complete-inspection` - Finaliza uma inspeção.
- **PATCH** `/inspections/{id}/update` - Atualiza dados de uma inspeção antes de seu fechamento.
- **DELETE** `/inspections/{id}` - Remove uma inspeção específica.

## 🚘 Veículos
- **GET** `/vehicles` - Obtém a lista de veículos cadastrados.
- **POST** `/vehicles` - Cadastra um novo veículo.
- **GET** `/vehicles/{id}` - Obtém detalhes de um veículo específico.
- **PATCH** `/vehicles/{id}` - Atualiza informações de um veículo.
- **DELETE** `/vehicles/{id}` - Remove um veículo específico.

## 👥 Usuários
- **GET** `/users` - Obtém a lista de usuários cadastrados.
- **POST** `/users` - Criação de um novo usuário.
- **GET** `/users/{id}` - Obtém detalhes de um usuário específico.
- **PATCH** `/users/{id}` - Atualiza informações de um usuário.
- **PATCH** `/users/{id}/permissions` - Atualiza as permissões de um usuário.
- **DELETE** `/delete-user/{id}` - Remove um usuário específico.

## ⚙️ Processos e Status
- **GET** `/processes/{name}/status` - Obtém o status de um processo específico.

## 📊 Dashboard
- **GET** `/dashboard` - Obtém informações consolidadas sobre inspeções, agendamentos, veículos e status gerais.

## 📜 Histórico de Alterações
- **GET** `/history/{entity}/{id}` - Obtém o histórico de alterações feitas em uma entidade específica (ex: inspeção, agendamento, veículo).

## 🔒 Segurança e Autenticação
- **POST** `/auth/login` - Autenticação de usuários.
- **POST** `/auth/logout` - Logout do usuário.
- **POST** `/auth/register` - Cadastro de um novo usuário.
- **POST** `/auth/password-reset` - Solicitação de redefinição de senha.
- **PATCH** `/auth/password-update` - Atualização de senha do usuário.

## 🔄 Integração e Sincronização
- **POST** `/data/import` - Importação de dados para o sistema.
- **POST** `/data/export` - Exportação de dados do sistema.
- **GET** `/data/sync-status` - Obtém o status da sincronização de dados.
- **PATCH** `/data/sync-resolve` - Resolve conflitos de sincronização de dados.

## 🛠️ Monitoramento e Logs
- **GET** `/logs` - Obtém os logs do sistema para auditoria.
- **GET** `/logs/{id}` - Obtém detalhes de um log específico.
- **DELETE** `/logs/{id}` - Deleta um log específico.

## 🆘 Suporte e Feedback
- **POST** `/support/ticket` - Criação de um novo ticket de suporte.
- **GET** `/support/tickets` - Obtém a lista de tickets de suporte.
- **GET** `/support/tickets/{id}` - Obtém detalhes de um ticket de suporte.
- **PATCH** `/support/tickets/{id}/update` - Atualiza um ticket de suporte.
- **DELETE** `/support/tickets/{id}` - Remove um ticket de suporte.
- **POST** `/feedback` - Envia um feedback sobre o sistema.
- **GET** `/feedback` - Obtém os feedbacks recebidos.
