#!/usr/bin/env node

/**
 * Servidor HTTP simples e robusto para resolver problemas de carregamento
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// MIME types essenciais
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf'
};

function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return MIME_TYPES[ext] || 'text/plain';
}

function sendResponse(res, statusCode, content, contentType = 'text/html') {
    try {
        res.writeHead(statusCode, {
            'Content-Type': contentType,
            'Content-Length': Buffer.byteLength(content),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'Connection': 'close'
        });
        res.end(content);
    } catch (error) {
        console.error('Erro ao enviar resposta:', error);
        if (!res.headersSent) {
            res.writeHead(500);
            res.end('Erro interno do servidor');
        }
    }
}

function serveFile(res, filePath) {
    try {
        // Verificar se o arquivo existe
        if (!fs.existsSync(filePath)) {
            console.log(`❌ Arquivo não encontrado: ${filePath}`);
            sendResponse(res, 404, `
                <html>
                    <head><title>404 - Arquivo não encontrado</title></head>
                    <body style="font-family: Arial; text-align: center; margin-top: 50px;">
                        <h1>404 - Arquivo Não Encontrado</h1>
                        <p>O arquivo <code>${filePath}</code> não existe.</p>
                        <a href="/">← Voltar para a página inicial</a>
                    </body>
                </html>
            `);
            return;
        }

        // Ler o arquivo
        const content = fs.readFileSync(filePath);
        const mimeType = getMimeType(filePath);
        
        console.log(`✅ Servindo: ${filePath} (${content.length} bytes)`);
        sendResponse(res, 200, content, mimeType);

    } catch (error) {
        console.error(`❌ Erro ao servir arquivo ${filePath}:`, error);
        sendResponse(res, 500, `
            <html>
                <head><title>500 - Erro do Servidor</title></head>
                <body style="font-family: Arial; text-align: center; margin-top: 50px;">
                    <h1>500 - Erro do Servidor</h1>
                    <p>Erro ao carregar o arquivo: ${error.message}</p>
                    <a href="/">← Voltar para a página inicial</a>
                </body>
            </html>
        `);
    }
}

function createServer() {
    const PORT = 8000;
    
    // Verificar se estamos no diretório correto
    if (!fs.existsSync('index.html')) {
        console.log('❌ ERRO: arquivo index.html não encontrado!');
        console.log('   Certifique-se de estar no diretório raiz do projeto.');
        process.exit(1);
    }

    const server = http.createServer((req, res) => {
        // Log da requisição
        console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
        
        // Handle CORS preflight
        if (req.method === 'OPTIONS') {
            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            });
            res.end();
            return;
        }

        // Apenas GET requests
        if (req.method !== 'GET') {
            sendResponse(res, 405, 'Método não permitido');
            return;
        }

        // Parse da URL
        let requestPath = req.url.split('?')[0]; // Remove query parameters
        
        // Rota raiz
        if (requestPath === '/' || requestPath === '') {
            requestPath = '/index.html';
        }
        
        // Remover barra inicial e construir caminho do arquivo
        const filePath = path.join('.', requestPath.substring(1));
        
        // Verificar se o caminho está dentro do diretório do projeto (segurança)
        const resolvedPath = path.resolve(filePath);
        const projectRoot = path.resolve('.');
        
        if (!resolvedPath.startsWith(projectRoot)) {
            console.log(`🚫 Acesso negado: ${requestPath}`);
            sendResponse(res, 403, 'Acesso negado');
            return;
        }
        
        // Servir o arquivo
        serveFile(res, filePath);
    });

    // Configurar timeout
    server.timeout = 30000; // 30 segundos
    
    // Error handling
    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.log(`❌ ERRO: Porta ${PORT} já está em uso!`);
            console.log('   Execute: taskkill /f /im node.exe');
            console.log('   Ou tente uma porta diferente.');
        } else {
            console.log(`❌ Erro do servidor: ${error.message}`);
        }
        process.exit(1);
    });

    // Iniciar servidor
    server.listen(PORT, '127.0.0.1', () => {
        const url = `http://localhost:${PORT}`;
        
        console.log('\n🚀 SERVIDOR INICIADO COM SUCESSO!');
        console.log('='.repeat(50));
        console.log(`📂 Diretório: ${process.cwd()}`);
        console.log(`🌐 URL: ${url}`);
        console.log('='.repeat(50));
        console.log('\n📋 INSTRUÇÕES:');
        console.log(`   1. Abra seu navegador`);
        console.log(`   2. Acesse: ${url}`);
        console.log(`   3. Para parar: Ctrl+C`);
        console.log('\n🔧 TESTE RÁPIDO:');
        console.log('   Cole este chatlog no campo:');
        console.log('   [15:30:45] John_Smith says: Hello world!');
        console.log('\n' + '='.repeat(50));
        
        // Tentar abrir navegador
        setTimeout(() => {
            try {
                const { exec } = require('child_process');
                const platform = process.platform;
                
                let command;
                if (platform === 'win32') {
                    command = `start "" "${url}"`;
                } else if (platform === 'darwin') {
                    command = `open "${url}"`;
                } else {
                    command = `xdg-open "${url}"`;
                }
                
                exec(command, (error) => {
                    if (error) {
                        console.log('\n💡 Abra manualmente o navegador no link acima');
                    } else {
                        console.log('\n🌐 Navegador aberto automaticamente');
                    }
                });
            } catch (e) {
                console.log('\n💡 Abra manualmente o navegador no link acima');
            }
        }, 1000);
    });

    // Graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n\n🛑 Parando servidor...');
        server.close(() => {
            console.log('✅ Servidor parado com sucesso!');
            process.exit(0);
        });
    });

    process.on('SIGTERM', () => {
        console.log('\n🛑 Servidor terminado');
        server.close(() => process.exit(0));
    });
}

// Iniciar
try {
    createServer();
} catch (error) {
    console.log('❌ Erro fatal:', error.message);
    process.exit(1);
}
