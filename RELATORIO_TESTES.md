# Relatório de Testes - Projeto Memories (Full-Stack)

## 1) Objetivo

Implementar e validar uma suíte de testes automatizados para o projeto full-stack JavaScript, cobrindo:

- **Backend Node.js/Express** com **Jest + Supertest**
- **Frontend React/Vite** com **Vitest + Testing Library**

---

## 2) Stack de Testes Utilizada

## Backend
- **Jest** (runner/assertions/mocks)
- **Supertest** (testes HTTP contra app Express)
- Mocks de dependências externas:
  - conexão com banco (`db/conn.js`)
  - model Mongoose (`model/Memory.js`)
  - middleware de upload (`helpers/upload.js`)

## Frontend
- **Vitest**
- **@testing-library/react**
- **@testing-library/jest-dom**
- **@testing-library/user-event**
- Ambiente **jsdom**
- Mocks de:
  - axios customizado
  - `react-toastify`
  - hooks de navegação do `react-router-dom` (quando necessário)

---

## 3) Arquivos Alterados/Criados

## Backend
- `backend/app.js`  
  - Refatorado para permitir teste sem subir servidor automaticamente:
    - exporta `app`
    - função `startServer()`
    - bloqueio de auto-start quando `NODE_ENV === "test"`

- `backend/package.json`
  - Scripts de teste compatíveis com Windows + ESM:
    - `test`
    - `test:watch`
  - Dependências de desenvolvimento adicionadas:
    - `jest`
    - `supertest`

- `backend/tests/routes.test.js`
  - Suíte completa de testes de rotas

## Frontend
- `frontend/package.json`
  - Scripts:
    - `test` (`vitest run`)
    - `test:watch` (`vitest`)
  - Dependências de teste adicionadas:
    - `vitest`
    - `jsdom`
    - `@testing-library/react`
    - `@testing-library/jest-dom`
    - `@testing-library/user-event`

- `frontend/vite.config.js`
  - Configuração de `test` (globals, environment, setupFiles, css)

- `frontend/src/test/setup.js`
  - Setup global com `@testing-library/jest-dom`

- Testes de componentes/páginas:
  - `frontend/src/routes/Home/Home.test.jsx`
  - `frontend/src/routes/AddMemory/AddMemory.test.jsx`
  - `frontend/src/routes/Memory/Memory.test.jsx`

- `frontend/eslint.config.js`
  - Ajustes de globals para arquivos de teste

## Controle de execução
- `TODO.md`
  - Checklist de implementação e validação

---

## 4) Casos de Teste Implementados

## Backend (`backend/tests/routes.test.js`)

### GET `/memories`
- Retorna lista de memórias quando existem
- Retorna mensagem quando não existem memórias

### GET `/memories/:id`
- Retorna memória quando existe
- Retorna 404 quando não existe
- Retorna 500 em erro interno

### POST `/memories`
- Valida ausência de arquivo (400)
- Cria memória com sucesso

### DELETE `/memories/:id`
- Exclui memória com sucesso
- Retorna 404 para memória inexistente
- Retorna 500 em falha interna

### PATCH `/memories/:id`
- Atualiza memória sem imagem
- Atualiza memória com nova imagem
- Retorna 404 para memória inexistente
- Retorna 500 em falha interna

### PATCH `/memories/favorite/:id`
- Alterna favorito com sucesso

### PATCH `/memories/:id/comment`
- Valida payload obrigatório (400)
- Adiciona comentário com sucesso

---

## Frontend

### `Home.test.jsx`
- Renderiza memórias retornadas pela API
- Trata erro da API com notificação

### `AddMemory.test.jsx`
- Envia formulário com sucesso e realiza redirecionamento
- Trata erro no envio

### `Memory.test.jsx`
- Carrega e renderiza detalhes da memória
- Adiciona comentário com sucesso
- Exibe erro quando falha o carregamento

---

## 5) Resultado da Execução

## Backend
- **Test Suites:** 1 passed
- **Tests:** **17 passed**
- **Status:** ✅ Sucesso

## Frontend
- **Test Files:** 3 passed
- **Tests:** **7 passed**
- **Status:** ✅ Sucesso

---

## 6) Comandos de Execução

## Backend
```bash
cd backend
npm test
```

## Frontend
```bash
cd frontend
npm test
```

---

## 7) Observações Técnicas

- O backend está configurado para testes ESM em ambiente Windows usando:
  - `node --experimental-vm-modules` no script do Jest.
- A suíte backend evita dependências externas reais (DB/upload) através de mocks.
- A suíte frontend usa mocks para isolar chamadas HTTP, toasts e navegação.
- O projeto está pronto para integração em pipeline CI com os scripts de teste atuais.

---

## 8) Conclusão

A suíte de testes full-stack foi implementada com sucesso e validada em execução real.  
Atualmente, o projeto possui cobertura funcional robusta dos fluxos críticos de backend e frontend, com todos os testes criados passando.
