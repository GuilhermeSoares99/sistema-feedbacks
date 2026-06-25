# RELATORIO.md

# 1. Como Rodar
Instruções claras de instalação e execução.
1. No terminal, execute `npm install` para instalar as dependências.
2. Execute `npx prisma generate` e `npx prisma migrate dev` para configurar o banco SQLite.
3. Inicie o servidor com `node server.js`.
4. Abra o arquivo `index.html` no navegador.

# 2. Análise de Vulnerabilidade
Explicação do risco da falha XSS no sistema de feedbacks.
Se o sistema utilizasse a propriedade `innerHTML` no Frontend sem validação no Backend, um usuário mal intencionado poderia inserir scripts via formulário (ex: `<script>alert('Hackeado!')</script>`). O navegador executaria esse script cegamente, caracterizando um ataque XSS (Cross-Site Scripting).

# 3. Resolução
Relato técnico de como o `textContent` e o `helmet` neutralizaram a ameaça.
Para o caminho seguro, adotei duas vacinas de sanitização e tratamento estrito:
* **Frontend:** Substituímos o `innerHTML` pela propriedade `textContent` na hora de renderizar a string de feedback na tela. Isso força o navegador a tratar o conteúdo estritamente como um dado inofensivo.
* **Backend:** Instalamos e configuramos o pacote `helmet` no Express, que adiciona cabeçalhos HTTP de segurança fundamentais e sanitiza a aplicação contra injeções.
