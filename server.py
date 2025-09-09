#!/usr/bin/env python3
"""
Servidor de desenvolvimento simples para o Chatlog Magician
Este servidor resolve problemas de CORS e serve arquivos estáticos
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Handler que adiciona cabeçalhos CORS para evitar problemas de cross-origin"""
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()
    
    def log_message(self, format, *args):
        """Log personalizado para mostrar apenas requisições importantes"""
        if not any(ext in args[0] for ext in ['.css', '.js', '.png', '.ico', '.woff', '.ttf']):
            print(f"[SERVER] {format % args}")

def main():
    PORT = 8000
    
    # Verificar se estamos no diretório correto
    if not Path('index.html').exists():
        print("❌ Erro: arquivo index.html não encontrado!")
        print("   Certifique-se de estar no diretório raiz do projeto.")
        sys.exit(1)
    
    print("🚀 Iniciando servidor de teste do Chatlog Magician...")
    print(f"📂 Diretório: {os.getcwd()}")
    print(f"🌐 Porta: {PORT}")
    
    try:
        with socketserver.TCPServer(("", PORT), CORSHTTPRequestHandler) as httpd:
            url = f"http://localhost:{PORT}"
            print(f"\n✅ Servidor rodando em: {url}")
            print("\n📋 Instruções:")
            print("   • Acesse o link acima no seu navegador")
            print("   • Para parar o servidor: Ctrl+C")
            print("   • Para testar: cole um chatlog no campo de texto")
            print("\n🔧 Recursos disponíveis:")
            print("   • Formatação automática de chatlogs")
            print("   • Download como imagem PNG")
            print("   • Histórico de chatlogs")
            print("   • Filtros por personagem")
            print("   • Paleta de cores personalizada")
            
            # Tentar abrir o navegador automaticamente
            try:
                webbrowser.open(url)
                print(f"\n🌐 Abrindo {url} no navegador...")
            except:
                print("\n💡 Abra manualmente o link no seu navegador")
            
            print("\n" + "="*50)
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n\n🛑 Servidor interrompido pelo usuário")
    except OSError as e:
        if e.errno == 98:  # Address already in use
            print(f"❌ Erro: Porta {PORT} já está em uso!")
            print("   Tente fechar outros servidores ou use uma porta diferente")
        else:
            print(f"❌ Erro ao iniciar servidor: {e}")
    except Exception as e:
        print(f"❌ Erro inesperado: {e}")

if __name__ == "__main__":
    main()
