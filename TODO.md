# TODO - Suite de Testes Fullstack

## Planejamento aprovado
- [x] Validar arquitetura backend/frontend e pontos de teste.
- [x] Definir estratégia: Vitest + Testing Library (frontend) e Jest + Supertest (backend).

## Backend
- [x] Ajustar `backend/app.js` para permitir testes (exportar app sem acoplar listen).
- [x] Configurar dependências e scripts de teste em `backend/package.json`.
- [x] Criar testes de API com Jest + Supertest.
- [x] Mockar dependências externas (model `Memory`, upload, DB) quando necessário.

## Frontend
- [x] Configurar Vitest + Testing Library no `frontend/package.json` e `frontend/vite.config.js`.
- [x] Criar setup global de testes (`frontend/src/test/setup.js`).
- [x] Criar testes para:
  - [x] `Home.jsx`
  - [x] `AddMemory.jsx`
  - [x] `Memory.jsx`
- [x] Incluir mocks de `axios`, `react-toastify` e `react-router-dom` quando necessário.

## Validação
- [x] Instalar dependências de teste.
- [x] Executar testes backend.
- [x] Executar testes frontend.
- [ ] Expandir cobertura backend (rotas e cenários completos).
- [ ] Expandir cobertura frontend (fluxo integrado App/Router e cenários extras).
- [ ] Executar validação manual com curl para endpoints principais e edge cases.
- [ ] Atualizar este TODO com status final.
