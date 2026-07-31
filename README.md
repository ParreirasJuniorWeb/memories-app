# 📸 Memories Project

> Aplicação Full-Stack para compartilhar e guardar memórias especiais com comentários e fotos

![Status](https://img.shields.io/badge/Status-Ativo-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![React](https://img.shields.io/badge/React-v18+-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js)

## 📋 Visão Geral

Memories Project é uma aplicação full-stack moderna que permite aos usuários criar um acervo digital de seus momentos mais preciosos. Funciona como uma galeria de fotos interativa onde você pode:

- 📷 Fazer upload e guardar fotos de momentos especiais
- 💬 Adicionar comentários detalhados sobre cada memória
- 🏷️ Organizear com tags e categorias
- 👥 Compartilhar memórias com amigos
- 📅 Revisar memórias por data

## ✨ Funcionalidades Principais

- ✅ **Upload de Fotos** - Compartilhe suas melhores fotos
- ✅ **Sistema de Comentários** - Anote detalhes das memórias
- ✅ **Galeria Responsiva** - Visualize em qualquer dispositivo
- ✅ **Categorização** - Organize por eventos, lugares, pessoas
- ✅ **Busca e Filtros** - Encontre memórias rapidamente
- ✅ **Timeline** - Visualize cronologia de memórias
- ✅ **Edição** - Altere descrições e comentários
- ✅ **Deleção** - Remova memórias se necessário
- ✅ **Autenticação** - Login seguro (opcional)
- ✅ **Persistência** - Dados salvos no banco de dados
- ✅ **UI Intuitiva** - Fácil de usar para todos

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Library UI moderna
- **React Router** - Navegação entre páginas
- **Axios** - HTTP client para requisições
- **CSS3** - Estilização com Grid e Flexbox
- **Vite** - Build tool rápido

### Backend
- **Node.js** - Runtime JavaScript server-side
- **Express.js** - Framework web minimalista
- **MongoDB** - Banco de dados NoSQL (ou JSON file)
- **Multer** - Upload de arquivos
- **Cors** - Cross-Origin Resource Sharing

### DevOps
- **Git & GitHub** - Versionamento
- **npm/yarn** - Gerenciador de pacotes

## 📁 Estrutura do Projeto

```
memories-project/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── MemoryCard.jsx
│   │   │   ├── MemoryDetail.jsx
│   │   │   ├── CommentSection.jsx
│   │   │   ├── UploadForm.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── CreateMemory.jsx
│   │   │   ├── MemoryDetail.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── memoryService.js
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── gallery.css
│   │   │   └── responsive.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── memories.js
│   │   │   └── comments.js
│   │   ├── controllers/
│   │   │   ├── memoryController.js
│   │   │   └── commentController.js
│   │   ├── models/
│   │   │   ├── Memory.js
│   │   │   └── Comment.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── upload.js
│   │   ├── config/
│   │   │   └── database.js
│   │   └── server.js
│   ├── uploads/
│   └── package.json
│
└── README.md
```

## 🚀 Como Usar

### Pré-requisitos
- Node.js v16+
- npm ou yarn
- (Opcional) MongoDB rodando localmente

### Instalação - Backend

#### 1. Clone e navegue
```bash
git clone https://github.com/ParreirasJuniorWeb/MemoriesProject.git
cd MemoriesProject/backend
```

#### 2. Instale dependências
```bash
npm install
```

#### 3. Configure variáveis de ambiente
Crie `.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/memories
JWT_SECRET=sua_chave_secreta
NODE_ENV=development
```

#### 4. Inicie o servidor
```bash
npm run dev
```

Servidor em: `http://localhost:5000`

### Instalação - Frontend

#### 1. Abra nova aba do terminal e vá para frontend
```bash
cd MemoriesProject/frontend
```

#### 2. Instale dependências
```bash
npm install
```

#### 3. Configure API URL
Edite `src/services/api.js`:
```javascript
const API_URL = 'http://localhost:5000';
```

#### 4. Inicie a aplicação
```bash
npm run dev
```

Acesse em: `http://localhost:5173`

## 💻 Scripts

### Backend
```bash
npm run dev      # Desenvolvimento com nodemon
npm run build    # Build para produção
npm start        # Iniciar em produção
```

### Frontend
```bash
npm run dev      # Desenvolvimento com hot reload
npm run build    # Build para produção
npm run preview  # Visualiza build
```

## 📚 API Endpoints

### Memórias
```bash
GET    /api/memories           # Listar todas
GET    /api/memories/:id       # Detalhe de uma
POST   /api/memories           # Criar nova
PUT    /api/memories/:id       # Atualizar
DELETE /api/memories/:id       # Deletar
```

### Comentários
```bash
GET    /api/memories/:id/comments      # Listar comentários
POST   /api/memories/:id/comments      # Adicionar comentário
DELETE /api/comments/:commentId        # Deletar comentário
```

## 📊 Estrutura de Dados

### Memória
```javascript
{
  _id: ObjectId,
  title: "Viagem Rio de Janeiro",
  description: "Fim de semana perfeito com a família",
  imageUrl: "https://...",
  category: "Viagens",
  date: "2024-01-15",
  location: "Rio de Janeiro, RJ",
  tags: ["praia", "família", "2024"],
  comments: [ObjectId],
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T10:30:00Z"
}
```

### Comentário
```javascript
{
  _id: ObjectId,
  memoryId: ObjectId,
  author: "João Victor",
  text: "Que dia lindo foi esse!",
  rating: 5,
  createdAt: "2024-01-15T10:35:00Z"
}
```

## 🎨 Interface

### Temas
- ☀️ **Modo Claro** - Fundo branco, cores vibrantes
- 🌙 **Modo Escuro** - Fundo escuro, cores suaves

### Layouts
- 📱 **Mobile** - Coluna única otimizada
- 💻 **Desktop** - Grid responsivo 3-4 colunas
- 🖥️ **Ultra Wide** - Grid expandido

## 📸 Exemplo de Uso

### 1. Criar Memória
```bash
POST /api/memories
Content-Type: multipart/form-data

{
  title: "Festa de aniversário",
  description: "Celebrando 25 anos!",
  date: "2024-01-20",
  file: <imagem.jpg>
}
```

### 2. Adicionar Comentário
```bash
POST /api/memories/6123abc456def/comments

{
  author: "João",
  text: "Que festa incrível!",
  rating: 5
}
```

### 3. Buscar Memórias
```bash
GET /api/memories?category=Viagens&year=2024
```

## 🎓 Conceitos Aprendidos

- ✅ **Full-Stack Development** - Frontend + Backend integrados
- ✅ **REST API** - Criação e consumo de endpoints
- ✅ **Upload de Arquivos** - Multer para gerenciar fotos
- ✅ **Database** - Modelagem e queries NoSQL
- ✅ **Autenticação** - JWT tokens
- ✅ **CORS** - Comunicação entre domínios
- ✅ **React Routing** - Navegação multi-página
- ✅ **HTTP Requests** - Axios para chamadas API
- ✅ **Tratamento de Erros** - Try-catch, error handling
- ✅ **Responsividade** - CSS Grid e Flexbox

## 🔧 Troubleshooting

### Problema: "CORS Error"
**Solução:** Verifique CORS no backend `server.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### Problema: "MongoDB Connection Refused"
**Solução:** Inicie MongoDB localmente:
```bash
mongod
```

### Problema: "File too large"
**Solução:** Aumente limite no backend:
```javascript
app.use(express.json({ limit: '50mb' }));
```

## 🤝 Contribuições

Contribuições são bem-vindas!

1. Faça fork
2. Crie branch (`git checkout -b feature/nova-funcao`)
3. Commit (`git commit -m 'Adicionar nova funcão'`)
4. Push (`git push origin feature/nova-funcao`)
5. Abra PR

## 🚀 Deploy

### Frontend - Vercel
```bash
npm install -g vercel
vercel
```

### Backend - Heroku
```bash
heroku create meu-app
git push heroku main
```

### Database - MongoDB Atlas
1. Crie conta em [mongodb.com/cloud](https://mongodb.com/cloud)
2. Copie connection string
3. Configure em `.env`

## 📝 Licença

MIT License - veja [LICENSE](LICENSE)

## 👨‍💻 Autor

**João Victor (Parreira Junior)**
- GitHub: [@ParreirasJuniorWeb](https://github.com/ParreirasJuniorWeb)
- Email: seu.email@example.com

## 🎯 Roadmap

- [ ] Autenticação com Google OAuth
- [ ] Compartilhamento de álbuns
- [ ] Edição de fotos online
- [ ] Impressão de álbuns
- [ ] Sincronização com Google Photos
- [ ] Inteligência Artificial para tags automáticas
- [ ] Versão mobile (React Native)
- [ ] Integração com redes sociais

## 💡 Dicas de Uso

1. **Organize por categorias** - Viagens, Família, Eventos
2. **Use tags descritivas** - Facilita busca futura
3. **Adicione comentários** - Registre contexto das memórias
4. **Faça backup** - Exporte seus dados regularmente
5. **Compartilhe** - Reviva memórias com amigos

---

⭐ Guarde suas memórias para sempre! ⭐