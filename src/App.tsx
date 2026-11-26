import { useEffect, useRef } from "react";
import { projects, type Project } from "./data/projects";
import { ProjectGraphic } from "./components/ProjectGraphic";
import { Demo } from "./components/Demo";
import { TerminalHeading } from "./components/TerminalHeading";
import type { DemoControls } from "./components/InteractiveDemo";

const github = "https://github.com/liphecodez";
const linkedin = "https://www.linkedin.com/in/luis-felipe-lima-bernardo-43691b281/";
const email = "luis.felipe.lima.bernardo@gmail.com";
const heroIntro = ["Olá?", "hello?", "Hello world!"] as const;
const projectPath = (project: Project) => `/projetos/${project.slug}/`;

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="tags" aria-label="Tecnologias">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Header({ home }: { home: boolean }) {
  return (
    <header className="site-header shell">
      <a
        className="wordmark"
        href="/"
        aria-label="Luis Felipe, página inicial"
      >
        lf<span>.</span>
      </a>
      <nav aria-label="Navegação principal">
        <a href={home ? "#projetos" : "/#projetos"}>Projetos</a>
        <a href={home ? "#sobre" : "/#sobre"}>Sobre</a>
        <a href={home ? "#contato" : "/#contato"}>Contato</a>
      </nav>
      <a
        className="header-github"
        href={github}
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
    </header>
  );
}

function Home() {
  const featured = projects[0];
  return (
    <>
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="small-line" /> Luis Felipe · Portfólio
          </p>
          <TerminalHeading
            as="h1"
            id="hero-title"
            text="Olá, eu sou o Luis Felipe!"
            intro={heroIntro}
          />
          <p className="hero-description">
            Estudo Análise e Desenvolvimento de Sistemas na Fatec, com foco em
            backend. Uso Python, Docker e PostgreSQL para estudar como decisões
            de arquitetura afetam a segurança, o desempenho e a capacidade de
            um sistema crescer.
          </p>
          <div className="flex flex-wrap gap-3">
            <a className="button button-primary" href="#projetos">
              Explorar projetos
            </a>
            <a className="button button-secondary" href="#sobre">
              Sobre mim
            </a>
          </div>
        </div>
        <div className="hero-aside">
          <div className="orbit-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="orbit-axis axis-x" />
            <div className="orbit-axis axis-y" />
            <span className="orbit-center">
              lf<span>.</span>
            </span>
            <span className="orbit-label">ideia → lógica → software</span>
          </div>
          <p className="mono text-muted">
            DESENVOLVIMENTO DE SOFTWARE
            <br />
            <span className="text-accent">Aprendizado em prática.</span>
          </p>
        </div>
        <div className="hero-bottom">
          <span>Backend · Segurança · Escalabilidade</span>
          <span>
            Conheça o trabalho abaixo <span aria-hidden="true">↓</span>
          </span>
        </div>
      </section>
      <section
        id="projetos"
        className="projects-section shell"
        aria-labelledby="projects-title"
      >
        <div className="section-heading section-heading-row">
          <div>
            <p className="eyebrow">Da teoria à implementação</p>
            <TerminalHeading id="projects-title" text="Projetos selecionados." />
          </div>
          <p>
            Contextos diferentes.{" "}
            <br />
            Decisões técnicas concretas.
          </p>
        </div>
        <article className="featured-project">
          <a
            className="graphic-link"
            tabIndex={-1}
            aria-hidden="true"
            href={projectPath(featured)}
          >
            <ProjectGraphic variant="nci" />
          </a>
          <div className="featured-copy">
            <p className="eyebrow text-accent">
              Em destaque · Projeto Integrador
            </p>
            <h3>
              <a href={projectPath(featured)}>NCI</a>
            </h3>
            <p className="project-subtitle">Sistema de Gestão Institucional</p>
            <p className="text-muted mt-5">
              Atividades, frequência e indicadores mensais para o NCI Idade
              Dourada de Pinheiros. Um projeto acadêmico em equipe, com
              integração entre módulos e regras de negócio.
            </p>
            <Tags items={["Python", "Django", "PostgreSQL"]} />
            <p className="contribution-note">
              Minha atuação: atividades, frequência, FMR e interface.
            </p>
            <a className="text-link" href={projectPath(featured)}>
              Conhecer o projeto
            </a>
          </div>
        </article>
        <div className="secondary-projects">
          {projects.slice(1).map((project) => (
            <article key={project.slug} className="secondary-project">
              <a
                className="graphic-link"
                tabIndex={-1}
                aria-hidden="true"
                href={projectPath(project)}
              >
                <ProjectGraphic variant={project.slug} compact />
              </a>
              <div className="secondary-copy">
                <p className="eyebrow">{project.category}</p>
                <h3>
                  <a href={projectPath(project)}>{project.name}</a>
                </h3>
                <p className="text-muted">{project.short}</p>
                <Tags items={project.technologies} />
                <a className="text-link" href={projectPath(project)}>
                  Conhecer o projeto
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="sobre" className="about-section shell">
        <div>
          <p className="eyebrow">Sobre mim</p>
          <TerminalHeading text="Entender a lógica. Construir a solução." />
        </div>
        <div className="about-copy">
          <p>
            Quando encontro um conceito novo, procuro um problema pequeno em
            que possa aplicá-lo. Assim consigo estudar a teoria, implementar
            uma solução e observar como ela se comporta na prática.
          </p>
          <p className="text-muted">
            Nos meus projetos, dou atenção ao levantamento de requisitos e às
            boas práticas de engenharia desde as primeiras decisões de
            arquitetura. Quero me aprofundar em backend e, no futuro, me
            dedicar também à ciência de dados.
          </p>
          <p className="text-muted">
            Também gosto de matemática e física. Um dos próximos conceitos
            que quero estudar é telemetria. Pretendo experimentar como
            aplicá-la em um sistema.
          </p>
          <div className="interests">
            <span className="eyebrow">Áreas de interesse</span>
            <p>
              Desenvolvimento de software / Segurança / Arquitetura de
              sistemas / Ciência de dados
            </p>
          </div>
        </div>
      </section>
      <section className="skills-section shell" aria-labelledby="skills-title">
        <div className="section-heading">
          <p className="eyebrow">Conhecimentos em prática</p>
          <TerminalHeading id="skills-title" text="O código como evidência." />
          <p className="text-muted mt-4 max-w-xl">
            Competências relacionadas ao trabalho nos projetos. Cada link leva
            ao contexto em que foram aplicadas.
          </p>
        </div>
        <div className="skill-rows">
          {[
            {
              title: "Aplicações web e dados",
              text: "Django, PostgreSQL, regras de negócio, transações e integração entre módulos.",
              project: projects[0],
            },
            {
              title: "Algoritmos e programação",
              text: "C, structs, modularização, execução incremental e renderização com Raylib.",
              project: projects[1],
            },
            {
              title: "Sistemas interativos",
              text: "GDScript, signals, componentes reutilizáveis e gerenciamento de estado.",
              project: projects[2],
            },
          ].map((skill) => (
            <a
              href={projectPath(skill.project)}
              className="skill-row"
              key={skill.title}
            >
              <h3>{skill.title}</h3>
              <p>{skill.text}</p>
              <span>{skill.project.name}</span>
            </a>
          ))}
        </div>
        <section className="mt-10" aria-labelledby="study-projects-title">
          <h3 id="study-projects-title">Projetos de estudo</h3>
          <div className="secondary-projects">
            <article className="secondary-project architecture-list">
              <div>
                <h4 className="mb-2">Sistema de academia · Segurança de APIs</h4>
                <p>
                  Implementei autorização por recurso na rota de faturas. A API
                  verifica se a fatura pertence ao usuário autenticado antes
                  de liberar o acesso. Testei abuso de requisições, apliquei
                  limites de frequência e experimentei um fluxo no pipeline
                  para alertar sobre vulnerabilidades e manter as dependências
                  atualizadas.
                </p>
              </div>
            </article>
            <article className="secondary-project architecture-list">
              <div>
                <h4 className="mb-2">Sistema de mercado · Desempenho</h4>
                <p>
                  Simulei consultas em massa ao banco e usei Redis para
                  melhorar o desempenho. Para resolver timeouts durante o
                  processamento de arquivos pesados, movi o trabalho para uma
                  fila em segundo plano com notificação de conclusão.
                </p>
              </div>
            </article>
          </div>
          <p className="text-muted mt-4">
            Esses exemplos mostram parte do que desenvolvi nos dois projetos.
          </p>
        </section>
      </section>
      <section
        id="contato"
        className="contact-section shell"
        aria-labelledby="contact-title"
      >
        <div className="contact-layout">
          <div>
            <p className="eyebrow text-accent">Contato</p>
            <TerminalHeading
              id="contact-title"
              className="mt-3"
              text="Vamos conversar?"
            />
          </div>
          <ul className="contact-links">
            <li className="contact-email">
              <a href={`mailto:${email}`}>
                <span className="eyebrow text-accent">E-mail profissional</span>
                <span>{email}</span>
              </a>
            </li>
            <li>
              <a href={linkedin} target="_blank" rel="noreferrer">
                <span>LinkedIn</span>
                <span className="text-muted">Luis Felipe</span>
              </a>
            </li>
            <li>
              <a href={github} target="_blank" rel="noreferrer">
                <span>GitHub</span>
                <span className="text-muted">@liphecodez</span>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

function ProjectPage({ project }: { project: Project }) {
  const demoControls = useRef<DemoControls>(null);
  const opensFullscreen =
    project.demo.kind === "web" && project.demo.engine === "raylib";

  return (
    <main id="conteudo" className="shell project-page">
      <a className="text-link back-link" href="/#projetos">
        Voltar aos projetos
      </a>
      <header className="project-heading">
        <p className="eyebrow text-accent">{project.category}</p>
        <TerminalHeading as="h1" text={`${project.name}.`} />
        <p className="project-lead">{project.intro}</p>
        <Tags items={project.technologies} />
        <div className="flex flex-wrap gap-3 mt-7">
          <a
            className="button button-primary"
            href="#demonstracao"
            onClick={(event) => {
              if (
                opensFullscreen &&
                !event.ctrlKey &&
                !event.metaKey &&
                !event.shiftKey &&
                !event.altKey
              ) {
                demoControls.current?.openFullscreen();
              }
            }}
          >
            Ver demonstração
          </a>
          {project.source && (
            <a
              className="button button-secondary"
              href={project.source}
              target="_blank"
              rel="noreferrer"
            >
              Código-fonte no GitHub
            </a>
          )}
        </div>
      </header>
      <ProjectGraphic variant={project.slug} />
      <div className="detail-layout">
        <aside className="project-index">
          <span className="eyebrow">Neste projeto</span>
          <nav aria-label="Seções do projeto">
            <a href="#objetivo">Objetivo</a>
            <a href="#funcionalidades">Funcionalidades</a>
            <a href="#arquitetura">Arquitetura e conceitos</a>
            <a href="#contribuicoes">Minha contribuição</a>
            <a href="#demonstracao">Demonstração</a>
            <a href="#limitacoes">Limitações</a>
          </nav>
        </aside>
        <div className="detail-content">
          <section id="objetivo" className="detail-section">
            <p className="eyebrow">Contexto</p>
            <TerminalHeading text="Problema e objetivo" />
            <p>{project.objective}</p>
            {project.context && <p className="mt-4">{project.context}</p>}
            {project.slug === "nci" && (
              <div className="scope-block">
                <p className="eyebrow">Escopo do MVP</p>
                <dl className="scope-stats">
                  <div>
                    <dt>50</dt>
                    <dd>requisitos funcionais</dd>
                  </div>
                  <div>
                    <dt>18</dt>
                    <dd>requisitos não funcionais</dd>
                  </div>
                  <div>
                    <dt>36</dt>
                    <dd>regras de negócio</dd>
                  </div>
                </dl>
                <p className="text-muted text-sm">
                  A equipe implementou todos os requisitos funcionais e não
                  funcionais e todas as regras de negócio do MVP. Os números
                  descrevem a dimensão desse escopo.
                </p>
              </div>
            )}
          </section>
          <section id="funcionalidades" className="detail-section">
            <p className="eyebrow">O que o projeto contempla</p>
            <TerminalHeading text="Funcionalidades" />
            <ul className="feature-list">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>
          <section id="arquitetura" className="detail-section">
            <p className="eyebrow">Como foi pensado</p>
            <TerminalHeading text="Arquitetura e conceitos" />
            <div className="architecture-list">
              {project.architecture.map((item) => (
                <div key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </section>
          <section id="contribuicoes" className="detail-section">
            <p className="eyebrow">Autoria e participação</p>
            <TerminalHeading text="Minha contribuição" />
            <ul className="feature-list">
              {project.contributions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="authorship-note">{project.development}</p>
          </section>
          <Demo project={project} controlsRef={demoControls} />
          <section id="limitacoes" className="detail-section">
            <p className="eyebrow">Estado da apresentação</p>
            <TerminalHeading text="Limitações e próximos passos" />
            <p>{project.limitations}</p>
            {project.nextSteps && <p className="mt-4">{project.nextSteps}</p>}
            {!project.source && (
              <p className="mt-5 text-muted">
                Código-fonte não disponibilizado publicamente neste portfólio.
              </p>
            )}
          </section>
        </div>
      </div>
      <section className="other-projects">
        <p className="eyebrow">Continue explorando</p>
        <div className="flex flex-wrap gap-5 mt-5">
          {projects
            .filter((item) => item.slug !== project.slug)
            .map((item) => (
              <a
                key={item.slug}
                className="button button-secondary"
                href={projectPath(item)}
              >
                {item.name}
              </a>
            ))}
        </div>
      </section>
    </main>
  );
}

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "");
  const project = projects.find((item) => path === `/projetos/${item.slug}`);
  const home = path === "" || path === "/index.html";
  useEffect(() => {
    if (!home && !project)
      document.title = "Página não encontrada — Luis Felipe";
    // O HTML gerado já contém os metadados de cada projeto; este efeito também cobre o dev server.
    if (project) {
      document.title = `${project.name} — Luis Felipe`;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", project.intro);
    }
  }, [project, home]);
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header home={home} />
      {home ? (
        <main id="conteudo">
          <Home />
        </main>
      ) : project ? (
        <ProjectPage project={project} />
      ) : (
        <main id="conteudo" className="shell not-found">
          <p className="eyebrow">Erro 404</p>
          <TerminalHeading as="h1" text="Página não encontrada." />
          <p className="text-muted">
            O endereço pode ter mudado. Os projetos continuam na página inicial.
          </p>
          <a className="button button-primary mt-6" href="/">
            Ir para o início
          </a>
        </main>
      )}
    </>
  );
}
