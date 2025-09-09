# 🚀 Deploy no Discloud - Chatlog Magician

## 📋 **Pré-requisitos**

1. **Conta no Discloud** - [discloud.app](https://discloud.app)
2. **Bot do Discloud** - adicione o bot ao seu servidor Discord
3. **Node.js** - versão 14+ (para testar localmente)

## 🔧 **Preparação do Projeto**

### **1. Instalar dependências:**
```bash
npm install
```

### **2. Testar localmente:**
```bash
node discloud-server.js
```

### **3. Acessar:** `http://localhost:3000`

## 📦 **Criar arquivo ZIP para upload**

### **Opção 1: Via PowerShell (Windows)**
```powershell
# Criar ZIP excluindo arquivos desnecessários
Compress-Archive -Path "index.html", "css", "js", "color-palette", "webfonts", "favicon.png", "logo.png", "discloud-server.js", "package.json", "discloud.config" -DestinationPath "chatlog-magician-discloud.zip"
```

### **Opção 2: Via linha de comando**
```bash
# Criar ZIP manualmente
zip -r chatlog-magician-discloud.zip index.html css/ js/ color-palette/ webfonts/ favicon.png logo.png discloud-server.js package.json discloud.config
```

## 🚀 **Deploy no Discloud**

### **1. Acesse o Discord:**
- Vá para o servidor onde o bot Discloud está
- Use o canal de comandos

### **2. Comandos para deploy:**

#### **Upload do arquivo:**
```
!upload chatlog-magician-discloud.zip
```

#### **Iniciar aplicação:**
```
!start chatlog-magician
```

#### **Ver status:**
```
!status chatlog-magician
```

#### **Ver logs:**
```
!logs chatlog-magician
```

#### **Parar aplicação:**
```
!stop chatlog-magician
```

#### **Reiniciar aplicação:**
```
!restart chatlog-magician
```

## ⚙️ **Configurações do Discloud**

### **Arquivos importantes:**
- ✅ `discloud-server.js` - servidor Express
- ✅ `package.json` - dependências (Express)
- ✅ `discloud.config` - configuração (MAIN=discloud-server.js)
- ✅ `.discloudignore` - arquivos ignorados

### **Estrutura do projeto:**
```
chatlog-magician/
├── index.html
├── css/
├── js/
├── color-palette/
├── webfonts/
├── favicon.png
├── logo.png
├── discloud-server.js
├── package.json
└── discloud.config
```

## 🌐 **Acesso à aplicação**

Após o deploy, sua aplicação estará disponível em:
- **URL:** `https://seu-app.discloud.app`
- **Status:** Verifique com `!status chatlog-magician`

## 🔄 **Atualizações**

Para atualizar:
1. **Faça as alterações** nos arquivos
2. **Crie novo ZIP** com as mudanças
3. **Use `!upload`** para enviar
4. **Use `!restart`** para aplicar

## 🛠️ **Comandos úteis do Discloud**

```
!help - Lista todos os comandos
!apps - Lista suas aplicações
!status - Status de todas as apps
!logs - Logs da aplicação
!stop - Parar aplicação
!start - Iniciar aplicação
!restart - Reiniciar aplicação
!delete - Deletar aplicação
```

## 📱 **Funcionalidades**

A aplicação inclui:
- ✅ Formatação de chatlogs do GTA RP
- ✅ Sistema de cores para personagens
- ✅ Filtro por personagem
- ✅ Histórico de chatlogs
- ✅ Download de imagens
- ✅ Interface responsiva
- ✅ Tradução para português brasileiro

## 🆚 **Discloud vs Vercel**

| Recurso | Discloud | Vercel |
|---------|----------|--------|
| **Tipo** | Node.js/Express | Site estático |
| **Custo** | Gratuito | Gratuito |
| **Facilidade** | Média | Fácil |
| **Performance** | Boa | Excelente |
| **CDN** | Não | Sim |
| **HTTPS** | Sim | Sim |

## 🎯 **Recomendação**

- **Use Vercel** para produção (mais rápido, CDN global)
- **Use Discloud** se precisar de funcionalidades Node.js específicas
