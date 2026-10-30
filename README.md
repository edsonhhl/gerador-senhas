# Gerador de Senhas Seguras

Aplicativo gratuito para criar senhas fortes diretamente no navegador, com interface responsiva e suporte a instalação como PWA.

**Desenvolvido por Edson Lima** — Projeto de Extensão II, Desenvolvimento Mobile.

## Funcionalidades

- Senhas de 12 a 40 caracteres.
- Escolha de letras maiúsculas, minúsculas, números e símbolos.
- Geração com `crypto.getRandomValues()` e seleção sem viés de módulo.
- Ao selecionar um tipo de caractere, a senha inclui pelo menos um caractere desse tipo.
- Botão para copiar a senha.
- Instalação como PWA e uso offline após o primeiro carregamento.
- Nenhuma senha é enviada ou armazenada em servidores pelo aplicativo.

## Executar localmente

Na pasta do projeto:

```bash
python3 -m http.server 8080
```

Abra `http://localhost:8080` no navegador.

Para parar o servidor, pressione `Ctrl+C` no terminal.


## Segurança e privacidade

A geração acontece inteiramente no dispositivo. O projeto não possui servidor de aplicação, banco de dados ou recurso de histórico de senhas. O botão copiar utiliza a área de transferência do dispositivo, cujo conteúdo pode permanecer disponível para outros aplicativos até ser substituído.

## Tecnologias

HTML, CSS, JavaScript, Web Crypto API, Service Worker e Web App Manifest.
