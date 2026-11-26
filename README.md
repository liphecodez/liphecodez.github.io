# Luis Bernardo — Portfólio

Portfólio estático em português, com React, TypeScript, Vite e Tailwind CSS. Publicação prevista em **https://liphecodez.github.io/**. Sem backend, banco de dados ou serviços de rastreamento.

## Desenvolvimento

Instale o Node.js 24 LTS (inclui npm). Na pasta do projeto:

```sh
npm ci
npm run dev
```

Abra o endereço indicado pelo Vite. Para validar e visualizar a versão de produção:

```sh
npm run typecheck
npm run lint
npm run build
npm run verify:build
npm run preview
```

O build já executa a verificação de TypeScript. `dist/` é gerado automaticamente e não deve ser editado ou enviado ao Git. O carregador nativo da configuração do Vite utiliza o suporte a TypeScript do Node 24, evitando uma etapa adicional de empacotamento da configuração.

## Organização e manutenção

- `src/data/projects.ts`: conteúdo e tipos dos projetos. Para adicionar um projeto, inclua outro objeto na lista `projects`, com um `slug` exclusivo formado por letras minúsculas e hífens. O primeiro recebe destaque na página inicial.
- `src/App.tsx`: páginas, navegação e estrutura de apresentação.
- `src/components/`: ilustrações conceituais e área de demonstração reutilizável.
- `src/styles.css`: tema Tailwind, estilos editoriais, responsividade e redução de movimento.
- `scripts/generate-pages.mjs`: gera um HTML físico por projeto, metadados próprios, sitemap e página 404 depois do build.
- `public/`: arquivos públicos copiados integralmente para a publicação.
- `eslint.config.js`: regras de JavaScript, TypeScript e hooks do React; warnings impedem a aprovação.
- `scripts/verify-build.mjs`: verifica páginas físicas, metadados, assets, sitemap e exclusão de arquivos privados conhecidos.
- `.github/workflows/ci.yml`: valida branches de desenvolvimento, PRs para `main` e pushes na `main`.
- `.github/workflows/deploy.yml`: publica somente o artefato do CI aprovado após integração na `main`.

Não há biblioteca de rotas: cada link de projeto abre seu próprio endereço. O build cria `projetos/<slug>/index.html`, permitindo acesso direto e recarregamento no GitHub Pages. Os caminhos absolutos pressupõem o repositório de usuário `liphecodez.github.io`, publicado na raiz do domínio.

## Publicação

1. Utilize o repositório `liphecodez/liphecodez.github.io` e configure a proteção da `main` descrita abaixo.
2. Envie uma branch `feature/*`, `fix/*` ou `chore/*` e abra um Pull Request para `main`. Após revisar e aprovar o CI, faça o merge manualmente no GitHub.
3. Em **Settings → Pages → Build and deployment → Source**, selecione **GitHub Actions**.
4. Acompanhe os workflows na aba **Actions**. Não há publicação manual por workflow_dispatch nem publicação de branches de desenvolvimento.

O CI usa Ubuntu 24.04, Node fixado em `.node-version`, cache do npm e `npm ci` com `package-lock.json`. Executa TypeScript, ESLint sem warnings, build e verificação dos arquivos gerados. Não havia uma suíte de testes no projeto; o verificador automatizado de build cobre o contrato das páginas estáticas e falha se um asset estiver ausente. Cada job tem limite de dez minutos e execuções obsoletas são canceladas.

Somente o CI de um push na `main` envia o artefato `portfolio-production`. O workflow separado de deploy é iniciado por `workflow_run`, exige sucesso, evento `push`, branch `main` e repositório de origem correspondente. Baixa o artefato pelo ID exato da execução validada, sem executar o código desse artefato. Publica com as ações oficiais e o ambiente `github-pages`. O CI tem apenas leitura; a escrita de Pages e o token OIDC ficam no job de deploy. PRs e forks não publicam. O GitHub fornece o token automaticamente; não inclua credenciais no código.

## GitHub Flow

`main` é a versão estável. Use `feature/nome` para funcionalidades, `fix/nome` para correções e `chore/nome` para infraestrutura. Nunca faça push de desenvolvimento diretamente na `main`, force push ou merge automático.

Antes de cada alteração, confira `git status`, atualize `origin/main` com `git fetch origin` e crie a branch a partir dessa referência atualizada. Preserve qualquer trabalho local antes de trocar de branch. Ao concluir:

```sh
npm ci
npm run typecheck
npm run lint
npm run build
npm run verify:build
git diff
git add <arquivos-revisados>
git diff --cached
git commit -m "feat: describe the implemented change"
git push -u origin <branch-de-desenvolvimento>
gh pr create --base main --head <branch-de-desenvolvimento>
```

As expressões entre `<...>` são valores que você deve substituir. Use Conventional Commits em inglês (`feat:`, `fix:`, `ci:`, `docs:`). O template de PR inclui resumo, validações e limitações. Aguarde o CI e revise o diff antes de fazer o merge **manualmente**. Não inclua `node_modules`, `dist`, `.env`, backups, caches ou guias pessoais nos commits.

## Proteção da main

Em **Settings → Branches → Add branch protection rule**, use o padrão `main` e configure:

- **Require a pull request before merging**; mantenha **Require approvals** desmarcado para poder revisar e integrar os próprios PRs.
- **Require status checks to pass before merging**, selecionando **Validate portfolio** da aplicação GitHub Actions após a primeira execução do CI.
- **Require branches to be up to date before merging**.
- **Require conversation resolution before merging**.
- **Do not allow bypassing the above settings**, incluindo administradores.
- Mantenha **Allow force pushes**, **Allow deletions** e **Require signed commits** desmarcados.

Não substitua uma proteção existente sem revisar suas regras. Um ruleset equivalente deve ter enforcement **Active**, alvo `main`, PR e check obrigatório, atualização estrita, resolução de conversas, bloqueio de exclusão e de atualizações não fast-forward, sem atores de bypass. Não exija aprovação de outro colaborador. Em **Settings → Environments → github-pages**, restrinja as deployment branches a `main`.

A configuração local dos workflows não ativa a proteção no GitHub. Essa etapa exige uma sessão autenticada com permissão administrativa. O check só ficará disponível para seleção após o primeiro push/PR com `ci.yml`.

## Capturas e vídeos do NCI

Após revisar autorização e privacidade, adicione arquivos reais a `public/media/nci/` e cadastre-os no campo `media` do projeto:

```ts
media: [
  { kind: 'image', src: '/media/nci/atividades.webp', description: 'Tela de atividades com dados de demonstração revisados.' },
  { kind: 'video', src: '/media/nci/apresentacao.mp4', description: 'Apresentação do módulo de frequência.' },
]
```

Esses são exemplos de configuração; os arquivos ainda não existem. As imagens têm carregamento adiado e os vídeos usam `preload="none"`. Não publique dados institucionais, nomes de participantes, credenciais, configurações privadas ou capturas com informações sensíveis. Tudo em `public/` fica acessível na internet.

## Demonstrações web

As páginas de projeto incorporam as exportações publicadas nos respectivos GitHub Pages.

- [Algorithm Visualizer](https://liphecodez.github.io/visualizador-de-algoritimos/)
- [Lab Rats](https://liphecodez.github.io/lab-rats/)

O componente `InteractiveDemo` só monta o iframe após clicar em **Iniciar demonstração**. **Encerrar demonstração** remove o iframe e encerra a sessão. Clique no canvas para usar os atalhos. Em uma prévia local, o próprio iframe exibe o progresso e os erros de inicialização do WebAssembly após a navegação, pois seu conteúdo tem outra origem.

## Referências

- [Visualizador de algoritmos](https://github.com/liphecodez/visualizador-de-algoritimos)
- [Lab Rats](https://github.com/liphecodez/lab-rats)
- [Vite](https://vite.dev/guide/)
- [Tailwind com Vite](https://tailwindcss.com/docs/installation/using-vite)
- [Workflows do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

As informações sobre autoria, contribuições e NCI foram fornecidas por Luis Bernardo. O guia de estudo é local e ignorado pelo Git.
