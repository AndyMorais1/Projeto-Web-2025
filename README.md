# Spot Home

## 📚 Tecnologias Utilizadas

### Frontend
- **Linguagem:** JavaScript / TypeScript
- **Framework:** React / Next.js 
- **Bibliotecas adicionais:** Axios, React Router, Tailwind CSS

### Backend
- **Linguagem:** Node.js / TypeScript
- **Framework:** Fastify
- **Autenticação:** JWT 

### Banco de Dados
- **Banco principal:** PostgreSQL
- **ORM:** Prisma

### Outros
- **Storage:** Firebase Storage

---

## 📁 Estrutura do Projeto

O projeto está organizado em duas pastas principais: `front` e `back`.

### 🔹 `front/` – Interfaces de Usuário
Contém todo o código relacionado ao frontend, subdividido por tipo de usuário:

```
front/
├── Dashboard-Admin-Agent/
│   ├── Admin/      → Interface do Administrador
│   └── Agent/      → Interface do Agente
└── client/          → Interface do Cliente Final
```

### 🔹 `back/` – Backend e API
Contém a API REST do projeto:

```
back/
└── API/            → Implementação da REST API com Fastify
```

---

## 🌐 Acesso e Execução

### Execução Local

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/AndyMorais1/Projeto-Web-2025
   cd Projeto-Web-2025
   ```

---

### 🔧 Backend (API)

1. Acesse a pasta do backend:
   ```bash
   cd back/API
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` com o seguinte conteúdo (ajuste conforme necessário):
   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
   JWT_SECRET="sua_chave_jwt"
   FIREBASE_API_KEY="sua_chave_firebase"
   ```

4. Execute as migrações do banco de dados com Prisma:
   ```bash
   npx prisma migrate dev
   ```

5. Inicie o servidor backend:
   ```bash
   npm run dev
   ```

> Certifique-se de que o PostgreSQL esteja em execução localmente e com as credenciais corretas configuradas no `.env`.

---

### 💻 Frontend

A aplicação possui três interfaces separadas. Execute cada uma conforme desejar:

#### Cliente:
```bash
cd front/client
npm install
npm run dev
```

#### Agente:
```bash
cd front/Dashboard-Admin-Agent/Agent
npm install
npm run dev
```

#### Administrador:
```bash
cd front/Dashboard-Admin-Agent/Admin
npm install
npm run dev
```

Cada interface será iniciada localmente, normalmente em diferentes portas (ex: 3000, 3001, etc).

---

## ✅ Features

### 🔧 Backend
- [x] Cadastro de usuários
- [x] Login com autenticação segura (JWT)
- [x] Upload de fotos dos imóveis
- [x] Listagem de imóveis com filtros

---

### 🧑‍💼 Interface Admin
- [x] Gerenciamento de usuários
- [x] Gerenciamento de imóveis 
- [x] Dashboard com estatísticas e métricas

---

### 🏢 Interface Agente
- [x] Gerenciamento de imóveis
- [x] Gerenciamento de Visitas 
- [x] Contacto com outros agentes 
---

### 🏠 Interface Cliente
- [x] Visualização de imóveis disponíveis
- [x] Filtro por localização, tipo, preço, etc.
- [x] Favoritar imóveis
- [x] Contato com agentes
- [x] Agendamento de visitas

---

## 📚 Relatório

[📄 Acesse o relatório completo do projeto](https://iade-my.sharepoint.com/:w:/g/personal/20230315_iade_pt/Ed3pLd3-YyBLlKGNirfKY5wBB3ZDUdw-fLNZSiQiFR4sCQ?e=CNi1Lu)
[🖥️ Acesse aos Mockups do projeto](https://www.figma.com/design/jaSY2cUMbrgTCAdF8MCzAV/Brand-Guidelines--Community-?node-id=0-1&p=f&t=WCL0J1ZRfeCbVD1w-0)
