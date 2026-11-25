export type Media = {
  kind: "image" | "video";
  src: string;
  description: string;
};
export type Project = {
  slug: string;
  name: string;
  category: string;
  short: string;
  intro: string;
  objective: string;
  technologies: string[];
  features: string[];
  architecture: { title: string; text: string }[];
  contributions: string[];
  limitations: string;
  development: string;
  source?: string;
  demo: { kind: "media" | "web"; note: string; url?: string };
  media: Media[];
};

// Fontes: informações fornecidas pelo autor e repositórios públicos indicados abaixo.
// URLs de demonstração e mídias ficam ausentes até existirem exportações reais revisadas.
export const projects: Project[] = [
  {
    slug: "nci",
    name: "NCI",
    category: "Projeto Integrador · Em equipe",
    short: "Gestão institucional com regras de negócio reais.",
    intro:
      "Sistema de Gestão Institucional desenvolvido em equipe para o NCI Idade Dourada de Pinheiros, como Projeto Integrador acadêmico.",
    objective:
      "Organizar participantes, atividades e frequência, integrando essas informações ao processamento de indicadores mensais do FMR.",
    technologies: [
      "Python",
      "Django",
      "PostgreSQL",
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap",
      "Alpine.js",
      "Docker",
      "Git",
      "GitHub Actions",
    ],
    features: [
      "Gestão de participantes e atividades.",
      "Registro e acompanhamento de frequência.",
      "Processamento de indicadores mensais do FMR.",
      "Relatórios e integração entre os módulos institucionais.",
    ],
    architecture: [
      {
        title: "Organização modular",
        text: "Módulos com responsabilidades distintas e integração entre participantes, atividades, frequência e indicadores.",
      },
      {
        title: "Consistência dos dados",
        text: "Banco relacional, regras de negócio, validação de integridade, transações e controle de concorrência.",
      },
      {
        title: "Verificação e colaboração",
        text: "Testes automatizados e trabalho colaborativo com Git. Docker e GitHub Actions integram o conjunto de tecnologias do projeto.",
      },
      {
        title: "Indicadores mensais",
        text: "Processamento das informações dos módulos para composição dos indicadores e relatórios FMR.",
      },
    ],
    contributions: [
      "Desenvolvimento dos módulos de atividades e frequência.",
      "Desenvolvimento do módulo de indicadores e relatórios FMR.",
      "Desenvolvimento da interface do sistema.",
      "Integração dessas funcionalidades com os demais módulos.",
    ],
    limitations:
      "Este portfólio apresenta o escopo e as contribuições declaradas pelo autor. Não há demonstração pública nem código-fonte disponibilizado aqui. As capturas e os vídeos dependem de revisão para não expor dados institucionais ou pessoais.",
    development:
      "Desenvolvimento acadêmico em equipe, com assistência de inteligência artificial.",
    demo: {
      kind: "media",
      note: "Capturas e vídeos reais serão adicionados após revisão de privacidade. Nenhuma tela do sistema foi simulada.",
    },
    media: [],
  },
  {
    slug: "algorithm-visualizer",
    name: "Algorithm Visualizer",
    category: "Projeto pessoal · C / Raylib",
    short: "Algoritmos de ordenação, passo a passo.",
    intro:
      "Aplicação gráfica para visualização interativa de algoritmos de ordenação, desenvolvida manualmente em C com Raylib.",
    objective:
      "Tornar o funcionamento dos algoritmos de ordenação observável, relacionando a execução incremental às mudanças exibidas em tempo real.",
    technologies: ["C", "Raylib", "Git"],
    features: [
      "Visualização interativa de algoritmos de ordenação.",
      "Execução incremental e renderização em tempo real.",
      "Controle de velocidade da visualização.",
    ],
    architecture: [
      {
        title: "Algoritmos e dados",
        text: "Algoritmos de ordenação, estruturas de dados e structs representam os elementos e seu estado durante a execução.",
      },
      {
        title: "Execução incremental",
        text: "O avanço dos algoritmos é coordenado com o estado da aplicação e a velocidade selecionada.",
      },
      {
        title: "Renderização",
        text: "Raylib fornece a base gráfica para exibir as mudanças em tempo real. A modularização organiza as responsabilidades do programa em C.",
      },
    ],
    contributions: [
      "Desenvolvimento manual do projeto pessoal em C.",
      "Implementação da visualização e do gerenciamento de estado.",
      "Integração dos algoritmos com a renderização e o controle de velocidade.",
    ],
    limitations:
      "A versão web ainda não está disponível. A futura exportação depende de compilação do projeto original com Emscripten e validação de compatibilidade no navegador.",
    development: "Projeto pessoal desenvolvido manualmente em C e Raylib.",
    source: "https://github.com/liphecodez/visualizador-de-algoritimos",
    demo: {
      kind: "web",
      note: "A demonstração web aguarda a exportação real em WebAssembly via Emscripten. O código original em C será preservado.",
    },
    media: [],
  },
  {
    slug: "lab-rats",
    name: "Lab Rats",
    category: "Projeto pessoal · Godot / GDScript",
    short: "Um puzzle 2D de movimento e interação.",
    intro:
      "Jogo de puzzle 2D desenvolvido manualmente em Godot e GDScript, baseado em movimentação direcionada e interação entre objetos.",
    objective:
      "Explorar desafios de lógica por meio de movimento em grade, obstáculos e objetos com comportamentos que se combinam ao longo das fases.",
    technologies: ["Godot", "GDScript", "Git"],
    features: [
      "Movimentação baseada em grade e colisões.",
      "Chaves e obstáculos coloridos.",
      "Portais, inimigos, armadilhas e redirecionadores.",
      "Progressão entre fases e gerenciamento de áudio.",
    ],
    architecture: [
      {
        title: "Eventos e comunicação",
        text: "Arquitetura orientada a eventos com signals para a comunicação entre os elementos do jogo.",
      },
      {
        title: "Estado e reutilização",
        text: "Autoloads, gerenciamento de estado e componentes reutilizáveis apoiam a organização do projeto e a progressão entre fases.",
      },
      {
        title: "Interações em 2D",
        text: "Movimentação em grade, colisões e física 2D definem como o jogador interage com obstáculos e objetos. O áudio acompanha o estado do jogo.",
      },
    ],
    contributions: [
      "Desenvolvimento manual do projeto pessoal em Godot e GDScript.",
      "Implementação das mecânicas de movimentação e interação.",
      "Organização de eventos, componentes, estado e áudio.",
    ],
    limitations:
      "A exportação web ainda não está disponível. Compatibilidade e desempenho no navegador serão verificados após a exportação real do Godot. GitHub Pages não permite configurar cabeçalhos arbitrários; uma exportação sem threads é a opção inicial a avaliar.",
    development:
      "Projeto pessoal desenvolvido manualmente em Godot e GDScript.",
    source: "https://github.com/liphecodez/lab-rats",
    demo: {
      kind: "web",
      note: "A versão jogável no navegador será incorporada após a exportação real do Godot. Por enquanto, o projeto pode ser consultado no GitHub.",
    },
    media: [],
  },
];
