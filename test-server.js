#!/usr/bin/env node

/**
 * Servidor de desenvolvimento Node.js para o Chatlog Magician
 * Alternativa ao servidor Python com melhor performance
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// MIME types para diferentes tipos de arquivo
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
};

function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return mimeTypes[ext] || 'application/octet-stream';
}

function serveFile(res, filePath, statusCode = 200) {
    try {
        const content = fs.readFileSync(filePath);
        const mimeType = getMimeType(filePath);
        
        res.writeHead(statusCode, {
            'Content-Type': mimeType,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': '*',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        });
        
        res.end(content);
        return true;
    } catch (error) {
        return false;
    }
}

function createServer() {
    const PORT = process.env.PORT || 8000;
    
    // Verificar se index.html existe
    if (!fs.existsSync('index.html')) {
        console.log('❌ Erro: arquivo index.html não encontrado!');
        console.log('   Certifique-se de estar no diretório raiz do projeto.');
        process.exit(1);
    }
    
    const server = http.createServer((req, res) => {
        // Handle CORS preflight requests
        if (req.method === 'OPTIONS') {
            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': '*'
            });
            res.end();
            return;
        }
        
        let filePath = req.url === '/' ? '/index.html' : req.url;
        filePath = path.join('.', filePath);
        
        // Remover query parameters
        filePath = filePath.split('?')[0];
        
        // Log apenas arquivos importantes
        const ext = path.extname(filePath);
        if (!['.css', '.js', '.png', '.ico', '.woff', '.woff2', '.ttf'].includes(ext)) {
            console.log(`[SERVER] ${req.method} ${req.url}`);
        }
        
        // Tentar servir o arquivo
        if (serveFile(res, filePath)) {
            return;
        }
        
        // Se não encontrou, tentar index.html (SPA fallback)
        if (serveFile(res, './index.html')) {
            return;
        }
        
        // 404 - Not Found
        res.writeHead(404, {
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(`
            <html>
                <head><title>404 - Não Encontrado</title></head>
                <body style="font-family: Arial; text-align: center; margin-top: 50px;">
                    <h1>404 - Arquivo Não Encontrado</h1>
                    <p>O arquivo <code>${req.url}</code> não existe.</p>
                    <a href="/">← Voltar para a página inicial</a>
                </body>
            </html>
        `);
    });
    
    server.listen(PORT, () => {
        const url = `http://localhost:${PORT}`;
        
        console.log('🚀 Iniciando servidor de teste do Chatlog Magician...');
        console.log(`📂 Diretório: ${process.cwd()}`);
        console.log(`🌐 Porta: ${PORT}`);
        console.log(`\n✅ Servidor rodando em: ${url}`);
        
        console.log('\n📋 Instruções:');
        console.log('   • Acesse o link acima no seu navegador');
        console.log('   • Para parar o servidor: Ctrl+C');
        console.log('   • Para testar: cole um chatlog no campo de texto');
        
        console.log('\n🔧 Recursos disponíveis:');
        console.log('   • Formatação automática de chatlogs');
        console.log('   • Download como imagem PNG');
        console.log('   • Histórico de chatlogs');
        console.log('   • Filtros por personagem');
        console.log('   • Paleta de cores personalizada');
        
        // Tentar abrir o navegador
        try {
            const platform = process.platform;
            let command;
            
            if (platform === 'darwin') {
                command = `open "${url}"`;
            } else if (platform === 'win32') {
                command = `start "${url}"`;
            } else {
                command = `xdg-open "${url}"`;
            }
            
            execSync(command);
            console.log(`\n🌐 Abrindo ${url} no navegador...`);
        } catch (error) {
            console.log('\n💡 Abra manualmente o link no seu navegador');
        }
        
        console.log('\n' + '='.repeat(50));
    });
    
    // Graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n\n🛑 Servidor interrompido pelo usuário');
        server.close(() => {
            process.exit(0);
        });
    });
    
    // Error handling
    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.log(`❌ Erro: Porta ${PORT} já está em uso!`);
            console.log('   Tente fechar outros servidores ou use uma porta diferente');
        } else {
            console.log(`❌ Erro ao iniciar servidor: ${error.message}`);
        }
        process.exit(1);
    });
}

// Verificar se Node.js está instalado
try {
    createServer();
} catch (error) {
    console.log('❌ Erro ao iniciar servidor:', error.message);
    process.exit(1);
}
