import { useEffect } from "react";
import { projects, type Project } from "./data/projects";
import { ProjectGraphic } from "./components/ProjectGraphic";
import { Demo } from "./components/Demo";

const github = "https://github.com/liphecodez";
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
        aria-label="Luis Bernardo, página inicial"
      >
        lb<span>.</span>
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
            <span className="small-line" /> Luis Bernardo · Portfólio
          </p>
          <h1 id="hero-title">
            Software com
            <br />
            lógica, contexto
            <br />e <span>intenção.</span>
          </h1>
          <p className="hero-description">
            Estudante de Análise e Desenvolvimento de Sistemas na Fatec. Exploro
            a construção de software, dos algoritmos às aplicações.
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
              lb<span>.</span>
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
          <span>Software · Algoritmos · Engenharia · IA</span>
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
            <h2 id="projects-title">
              Projetos selecionados<span className="text-accent">.</span>
            </h2>
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
          <h2>
            Entender a lógica.
            <br />
            <span className="text-muted">Construir a solução.</span>
          </h2>
        </div>
        <div className="about-copy">
          <p>
            Sou Luis Bernardo, estudante de Análise e Desenvolvimento de
            Sistemas na Fatec, com interesse em desenvolvimento de software,
            algoritmos, engenharia de software e inteligência artificial.
          </p>
          <p className="text-muted">
            Minha prática passa por sistemas web, programação em C e
            desenvolvimento de jogos. Neste portfólio, apresento o contexto de
            cada projeto, as escolhas técnicas e o que desenvolvi
            individualmente.
          </p>
          <p className="text-muted">
            Busco uma oportunidade de estágio para aprofundar esses
            conhecimentos e contribuir com uma equipe de desenvolvimento.
          </p>
          <div className="interests">
            <span className="eyebrow">Áreas de interesse</span>
            <p>
              Desenvolvimento de software / Algoritmos / Engenharia de software
              / Inteligência artificial
            </p>
          </div>
        </div>
      </section>
      <section className="skills-section shell" aria-labelledby="skills-title">
        <div className="section-heading">
          <p className="eyebrow">Conhecimentos em prática</p>
          <h2 id="skills-title">O código como evidência.</h2>
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
      </section>
      <section id="contato" className="contact-section shell">
        <p className="eyebrow text-accent">Contato</p>
        <div className="contact-layout">
          <h2>
            Vamos conversar
            <br />
            sobre software?
          </h2>
          <div>
            <p className="text-muted">
              Meu código e meus projetos estão no GitHub.
              <br />
              Esse é meu canal público por aqui.
            </p>
            <a
              className="button button-primary mt-6"
              href={github}
              target="_blank"
              rel="noreferrer"
            >
              Encontrar no GitHub
            </a>
            <p className="mono text-muted mt-4">@liphecodez</p>
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectPage({ project }: { project: Project }) {
  return (
    <main id="conteudo" className="shell project-page">
      <a className="text-link back-link" href="/#projetos">
        Voltar aos projetos
      </a>
      <header className="project-heading">
        <p className="eyebrow text-accent">{project.category}</p>
        <h1>
          {project.name}
          <span className="text-accent">.</span>
        </h1>
        <p className="project-lead">{project.intro}</p>
        <Tags items={project.technologies} />
        <div className="flex flex-wrap gap-3 mt-7">
          <a className="button button-primary" href="#demonstracao">
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
            <h2>Problema e objetivo</h2>
            <p>{project.objective}</p>
            {project.slug === "nci" && (
              <div className="scope-block">
                <p className="eyebrow">Dimensão do escopo documentado</p>
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
                  Números da especificação. Não são métricas de qualidade nem
                  certificação de implementação integral.
                </p>
              </div>
            )}
          </section>
          <section id="funcionalidades" className="detail-section">
            <p className="eyebrow">O que o projeto contempla</p>
            <h2>Funcionalidades</h2>
            <ul className="feature-list">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>
          <section id="arquitetura" className="detail-section">
            <p className="eyebrow">Como foi pensado</p>
            <h2>Arquitetura e conceitos</h2>
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
            <h2>Minha contribuição</h2>
            <ul className="feature-list">
              {project.contributions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="authorship-note">{project.development}</p>
          </section>
          <Demo project={project} />
          <section id="limitacoes" className="detail-section">
            <p className="eyebrow">Estado da apresentação</p>
            <h2>Limitações e próximos passos</h2>
            <p>{project.limitations}</p>
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
      document.title = "Página não encontrada — Luis Bernardo";
    // O HTML gerado já contém os metadados de cada projeto; este efeito também cobre o dev server.
    if (project) {
      document.title = `${project.name} — Luis Bernardo`;
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
          <h1>Página não encontrada.</h1>
          <p className="text-muted">
            O endereço pode ter mudado. Os projetos continuam na página inicial.
          </p>
          <a className="button button-primary mt-6" href="/">
            Ir para o início
          </a>
        </main>
      )}
      <footer className="site-footer shell">
        <a className="footer-name" href="/">
          Luis Bernardo<span className="text-accent">.</span>
        </a>
        <p>Desenvolvido com React e TypeScript.</p>
        <a href={github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </footer>
    </>
  );
}
