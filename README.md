# Oi Ju! — site

Site estático em 3 telas: autenticação estilo terminal → perguntas com nota de 1 a 10 → envio das respostas para o Telegram.

## Estrutura

- `index.html` — as 3 telas
- `style.css` — visual (terminal + tela de perguntas com identidade BH)
- `config.js` — **senha** e textos (edite à vontade)
- `questions.js` — **lista de perguntas** (adicione/remova quantas quiser)
- `app.js` — lógica do site
- `secrets.example.js` — modelo do arquivo de credenciais do Telegram
- `.github/workflows/deploy.yml` — publica automaticamente no GitHub Pages

## Passo a passo para publicar

### 1. Criar o repositório

1. Crie um repositório novo no GitHub chamado **`datejuegustavo`** (pode ser privado ou público).
2. Suba todos os arquivos deste pacote para a branch `main`.

Com esse nome de repositório, o site fica disponível gratuitamente em:

```
https://SEU-USUARIO.github.io/datejuegustavo/
```

(troque `SEU-USUARIO` pelo seu usuário do GitHub). Isso já é gratuito e não exige mais nada.

**Quer um domínio próprio** (tipo `datejuegustavo.com`)? Isso é opcional, pago (geralmente uns R$40–60/ano num registrador como Registro.br, Namecheap ou Google Domains) e separado da hospedagem em si — o GitHub Pages continua gratuito, só o domínio é comprado à parte. Depois de comprar, é só: (1) criar um arquivo `CNAME` na raiz do repositório com o domínio dentro, e (2) apontar o DNS do domínio pro GitHub Pages. Me avise se quiser que eu monte esse passo a passo quando tiver o domínio em mãos.

### 2. Cadastrar os Secrets do Telegram

Vá em **Settings → Secrets and variables → Actions → New repository secret** e crie dois secrets:

| Nome | Valor |
|---|---|
| `TELEGRAM_BOT_TOKEN` | o token do seu bot | //8753213972:AAHxKOCsilpg1caePLboKUxyIYfJr88wOFE
| `TELEGRAM_CHAT_ID` | o chat_id que deve receber as respostas | //8663031880

### 3. Ativar o GitHub Pages via Actions

Vá em **Settings → Pages → Build and deployment → Source** e selecione **"GitHub Actions"** (não "Deploy from a branch").

### 4. Publicar

Qualquer `push` na branch `main` dispara o workflow (`.github/workflows/deploy.yml`), que:
1. Gera o arquivo `secrets.js` a partir dos Secrets do repositório
2. Publica o site no GitHub Pages

Depois do primeiro deploy, o link fica disponível em **Settings → Pages**.

### 5. Testar localmente (opcional)

Copie `secrets.example.js` para `secrets.js` e preencha token e chat_id — esse arquivo é ignorado pelo Git (`.gitignore`), então nunca vai parar no repositório. Depois é só abrir `index.html` no navegador (ou usar uma extensão tipo "Live Server").

## ⚠️ Sobre a segurança do token

O GitHub Pages só serve arquivos estáticos — não existe um "servidor" rodando por trás. Isso significa que:

- O token **nunca fica salvo no repositório/histórico do Git** (ele é gerado só na hora do deploy, a partir dos Secrets).
- **Mas** ele fica presente no `secrets.js` que é publicado junto com o site. Ou seja, qualquer pessoa que souber o link do site e abrir o "Ver código-fonte" do navegador consegue ver o token.

Para um uso pessoal, com um link que só você e a Ju vão saber, isso costuma ser um risco baixo — na pior hipótese alguém mal-intencionado poderia mandar mensagens para o seu bot. Se no futuro você quiser esconder o token de verdade (visitante nenhum consegue ver), a solução é colocar um pequeno serviço intermediário (por exemplo, um Cloudflare Worker gratuito) entre o site e a API do Telegram — me avise se quiser que eu monte isso depois.

## Como editar depois

- **Trocar a senha:** edite `PASSWORD` em `config.js`.
- **Trocar/adicionar perguntas:** edite o array `QUESTIONS` em `questions.js` — pode ter quantas quiser, a tela se adapta sozinha.
- **Trocar imagens das perguntas:** troque o campo `image` de cada pergunta em `questions.js` por qualquer URL de imagem.
- **Trocar textos:** tudo fica em `config.js`.
