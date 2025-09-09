# 🧪 Guia de Testes - Chatlog Magician

Este guia explica como executar a aplicação **Chatlog Magician** em ambiente de testes local.

## 📋 Pré-requisitos

Você precisa ter **uma** das seguintes opções instaladas:

### Opção 1: Python (Recomendado)
- Python 3.6 ou superior
- Disponível em: https://www.python.org/downloads/

### Opção 2: Node.js
- Node.js 12 ou superior  
- Disponível em: https://nodejs.org/

### Opção 3: Navegador Moderno (Limitado)
- Chrome, Firefox, Safari ou Edge atualizado
- **Nota**: Algumas funcionalidades podem não funcionar devido a restrições de CORS

---

## 🚀 Métodos de Execução

### 🐍 Método 1: Servidor Python (Recomendado)

```bash
# 1. Navegue até o diretório do projeto
cd caminho/para/gtaw-chatlog-magician

# 2. Execute o servidor Python
python server.py
```

**No Windows:**
```cmd
python server.py
```

**No macOS/Linux:**
```bash
python3 server.py
```

### 🟢 Método 2: Servidor Node.js

```bash
# 1. Navegue até o diretório do projeto
cd caminho/para/gtaw-chatlog-magician

# 2. Execute o servidor Node.js
node test-server.js
```

### 🌐 Método 3: Servidor HTTP Simples

Se você já tem Python instalado, pode usar o servidor HTTP embutido:

```bash
# Python 3
python -m http.server 8000

# Python 2 (não recomendado)
python -m SimpleHTTPServer 8000
```

### 📁 Método 4: Abrir Diretamente (Limitado)

Como último recurso, você pode abrir o arquivo `index.html` diretamente no navegador:

1. Navegue até a pasta do projeto
2. Clique duas vezes em `index.html`
3. **Aviso**: Algumas funcionalidades podem não funcionar

---

## 🔧 Testando a Aplicação

### 1. Acesso Inicial
- Abra seu navegador em `http://localhost:8000`
- Você deve ver a interface do Chatlog Magician

### 2. Teste Básico de Funcionalidade

Cole este exemplo de chatlog no campo de texto:

```
[15:30:45] John_Smith says: Hello everyone!
[15:30:52] * Jane_Doe waves at John
[15:31:05] [Radio] Mike_Johnson: Unit 23, responding to 10-54
[15:31:15] John_Smith whispers: This is a test whisper
[15:31:25] ** John_Smith takes out his phone
[15:31:30] [OOC] Jane_Doe: Great RP everyone!
```

### 3. Funcionalidades para Testar

#### ✅ Formatação Automática
- Cole um chatlog → Deve aparecer formatado na área de saída
- Teste diferentes tipos de mensagens (say, whisper, radio, etc.)

#### ✅ Download de Imagem
- Clique no botão "Download" 
- Deve baixar uma imagem PNG do chatlog formatado

#### ✅ Configurações
- **Font Size**: Altere o tamanho da fonte (1-50)
- **Line Length**: Altere o comprimento das linhas (1-200)
- **Character Filter**: Digite um nome para filtrar mensagens

#### ✅ Funcionalidades Avançadas
- **Toggle Background**: Alternar fundo transparente/sólido
- **Font Toggle**: Alternar entre fontes padrão/Trebuchet MS
- **Color Palette**: Colorir texto selecionado
- **History**: Histórico de chatlogs anteriores

#### ✅ Persistência
- Feche e reabra o navegador
- As configurações devem estar salvas

---

## 🐛 Solução de Problemas

### Problema: "Porta já está em uso"
**Solução**: 
```bash
# Matar processos na porta 8000
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID_NUMBER> /F

# macOS/Linux  
lsof -ti:8000 | xargs kill -9
```

### Problema: "Arquivo não encontrado"
**Solução**: Certifique-se de estar no diretório correto:
```bash
ls -la  # Deve mostrar index.html
```

### Problema: "Python/Node não reconhecido"
**Solução**: Instale Python ou Node.js e reinicie o terminal

### Problema: Imagens não carregam
**Solução**: Use o servidor Python/Node.js em vez de abrir o arquivo diretamente

### Problema: Funcionalidades não funcionam
**Verificações**:
1. Console do navegador (F12) → Procure por erros
2. Certifique-se de que todos os arquivos JS/CSS estão sendo carregados
3. Teste em modo anônimo/incógnito

---

## 📊 Testes de Performance

### Teste de Carga
1. Cole um chatlog com 1000+ linhas
2. Verifique se a formatação é rápida (< 2 segundos)
3. Teste o download da imagem

### Teste de Memória
1. Processe vários chatlogs grandes
2. Monitore o uso de memória no navegador (F12 → Performance)

### Teste de Compatibilidade
Teste nos seguintes navegadores:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 📱 Teste Mobile

1. Acesse `http://[SEU_IP]:8000` no celular
2. Teste a responsividade da interface
3. Verifique se o download funciona em dispositivos móveis

---

## 🔍 Logs e Debugging

### Habilitar Logs Detalhados
No console do navegador (F12):
```javascript
// Habilitar logs verbosos
localStorage.setItem('debug', 'true');
location.reload();
```

### Verificar Estado da Aplicação
```javascript
// Verificar configurações salvas
console.log('Font Size:', localStorage.getItem('chatlogFontSize'));
console.log('Line Length:', localStorage.getItem('chatlogLineLength'));
console.log('Character Name:', localStorage.getItem('chatlogCharacterName'));
console.log('History:', JSON.parse(localStorage.getItem('chatlogHistory') || '[]'));
```

---

## ✅ Checklist de Testes

### Funcionalidades Básicas
- [ ] Aplicação carrega sem erros
- [ ] Interface é exibida corretamente
- [ ] Campo de texto aceita entrada
- [ ] Formatação automática funciona
- [ ] Download de imagem funciona

### Configurações
- [ ] Font Size altera o tamanho da fonte
- [ ] Line Length altera quebras de linha  
- [ ] Character Filter filtra mensagens
- [ ] Configurações persistem após reload

### Funcionalidades Avançadas
- [ ] Toggle Background funciona
- [ ] Toggle Font funciona
- [ ] Color Palette funciona
- [ ] Histórico salva e carrega chatlogs
- [ ] Botão de limpar histórico funciona

### Performance
- [ ] Chatlog grande (1000+ linhas) processa rapidamente
- [ ] Aplicação não trava com entrada inválida
- [ ] Memória não vaza após uso prolongado

### Compatibilidade
- [ ] Funciona no Chrome
- [ ] Funciona no Firefox
- [ ] Funciona no Safari/Edge
- [ ] Interface é responsiva no mobile

---

## 📞 Suporte

Se encontrar problemas durante os testes:

1. **Verifique o console**: F12 → Console → Procure por erros em vermelho
2. **Teste em modo incógnito**: Para descartar problemas de cache/extensões
3. **Limpe o cache**: Ctrl+Shift+R ou Cmd+Shift+R
4. **Teste em outro navegador**: Para isolar problemas específicos

---

## 🎯 Próximos Passos

Após os testes locais funcionarem:
1. **Deploy em produção**: Considere GitHub Pages, Netlify, ou Vercel
2. **Testes automatizados**: Implemente testes E2E com Playwright/Cypress
3. **Monitoramento**: Adicione analytics e error tracking
4. **Performance**: Otimize para dispositivos mais lentos

---

**Boa sorte com os testes! 🚀**
