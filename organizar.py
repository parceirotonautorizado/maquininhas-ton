import os
import shutil

PASTA_ORIGEM = "./html"
PASTA_DESTINO = "./site"

os.makedirs(PASTA_DESTINO, exist_ok=True)

for arquivo in os.listdir(PASTA_ORIGEM):
    if arquivo.endswith(".html"):
        nome = arquivo.replace(".html", "")
        
        nova_pasta = os.path.join(PASTA_DESTINO, 
nome)
        os.makedirs(nova_pasta, exist_ok=True)
        
        origem = os.path.join(PASTA_ORIGEM, 
arquivo)
        destino = os.path.join(nova_pasta, 
"index.html")
        
        shutil.copyfile(origem, destino)

print("✅ Estrutura criada com sucesso!")
