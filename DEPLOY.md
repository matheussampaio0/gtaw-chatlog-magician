# Deploy no Vercel - Chatlog Magician

## 🚀 Como fazer o deploy no Vercel

### Opção 1: Deploy via GitHub (Recomendado)

1. **Crie um repositório no GitHub:**
   - Acesse [github.com](https://github.com)
   - Clique em "New repository"
   - Nome: `gtaw-chatlog-magician`
   - Deixe público ou privado (sua escolha)

2. **Faça upload dos arquivos:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/gtaw-chatlog-magician.git
   git push -u origin main
   ```

3. **Conecte ao Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com sua conta GitHub
   - Clique em "New Project"
   - Importe o repositório `gtaw-chatlog-magician`
   - O Vercel detectará automaticamente que é um site estático
   - Clique em "Deploy"

### Opção 2: Deploy via Vercel CLI

1. **Instale o Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Faça login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Siga as instruções:**
   - Project name: `gtaw-chatlog-magician`
   - Framework: Static Site
   - Deploy: Yes

### Opção 3: Deploy via Drag & Drop

1. **Acesse [vercel.com](https://vercel.com)**
2. **Faça login**
3. **Clique em "New Project"**
4. **Arraste a pasta do projeto** para a área de upload
5. **Configure:**
   - Project name: `gtaw-chatlog-magician`
   - Framework: Other
6. **Clique em "Deploy"**

## ⚙️ Configurações do Projeto

O projeto já está configurado com:
- ✅ `package.json` - metadados do projeto
- ✅ `vercel.json` - configurações específicas do Vercel
- ✅ `.gitignore` - arquivos ignorados pelo Git
- ✅ Headers de segurança configurados

## 🌐 Acesso

Após o deploy, sua aplicação estará disponível em:
- **URL de produção:** `https://gtaw-chatlog-magician.vercel.app`
- **URL personalizada:** Você pode configurar um domínio customizado

## 🔄 Atualizações

Para atualizar a aplicação:
1. **Faça as alterações** nos arquivos
2. **Commit e push** para o GitHub (se usando Opção 1)
3. **O Vercel fará o deploy automático**

## 📱 Funcionalidades

A aplicação inclui:
- ✅ Formatação de chatlogs do GTA RP
- ✅ Sistema de cores para personagens
- ✅ Filtro por personagem
- ✅ Histórico de chatlogs
- ✅ Download de imagens
- ✅ Interface responsiva
- ✅ Tradução para português brasileiro

## 🛠️ Desenvolvimento Local

Para testar localmente:
```bash
npm install
npm run dev
```

Acesse: `http://localhost:3000`
