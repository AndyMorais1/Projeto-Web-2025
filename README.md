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

## 🌐 Acesso e Execução

### Execução Local

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/AndyMorais1/Projeto-Web-2025
   ```

2. **Acesse o diretório do projeto:**
   ```bash
   cd Projeto-Web-2025
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo (ajuste conforme necessário):
   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
   JWT_SECRET="sua_chave_jwt"
   FIREBASE_API_KEY="sua_chave_firebase"
   ```

5. **Execute as migrações do banco de dados com Prisma:**
   ```bash
   npx prisma migrate dev
   ```

6. **Inicie a aplicação:**
   ```bash
   npm run dev
   ```

> Certifique-se de que o PostgreSQL esteja em execução localmente e com as credenciais corretas configuradas no `.env`.

## ✅ Features

### Previstas inicialmente
- [ ] Cadastro de usuários
- [ ] Login com autenticação segura
- [ ] Upload de fotos dos imóveis
- [ ] Listagem de imóveis com filtros
- [ ] Favoritar imóveis
- [ ] Responsividade total

### Features implementadas
- [x] Cadastro de usuários
- [x] Login com autenticação segura
- [x] Upload de fotos dos imóveis
- [x] Listagem de imóveis com filtros

---
## 📚 Relatório

https://iade-my.sharepoint.com/:w:/g/personal/20230315_iade_pt/Ed3pLd3-YyBLlKGNirfKY5wBB3ZDUdw-fLNZSiQiFR4sCQ?e=CNi1Lu

## ✍️ Observações Finais
