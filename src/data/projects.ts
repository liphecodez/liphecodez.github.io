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
  context?: string;
  technologies: string[];
  features: string[];
  architecture: { title: string; text: string }[];
  contributions: string[];
  limitations: string;
  nextSteps?: string;
  development: string;
  source?: string;
  demo:
    | { kind: "media"; note: string }
    | {
        kind: "web";
        url: string;
        engine: "raylib" | "godot";
        instructions: string[];
      };
  media: Media[];
};

// Fontes: informações fornecidas pelo autor e repositórios públicos indicados abaixo.
export const projects: Project[] = [
  {
    slug: "nci",
    name: "NCI",
    category: "Projeto Integrador · Em equipe",
    short: "Gestão institucional com regras de negócio reais.",
    intro:
      "Sistema de Gestão Institucional desenvolvido em equipe para o NCI Idade Dourada de Pinheiros, como Projeto Integrador acadêmico.",
    objective:
      "O FMR é um formulário mensal obrigatório para a instituição. Antes do sistema, era difícil preenchê-lo manualmente. O objetivo do projeto foi reunir os registros de participantes, atividades e frequência e usá-los para gerar os indicadores que facilitam o preenchimento do formulário.",
    context:
      "Uma mudança na metodologia do Projeto Integrador exigiu que nossa equipe trocasse de comunidade e recomeçasse o levantamento. Com cerca de dois meses até a entrega, entrevistamos a nova instituição e levantamos requisitos funcionais, não funcionais e regras de negócio. Restaram cerca de duas semanas para implementar. Como já tínhamos priorizado os problemas e planejado a arquitetura com base nas entrevistas, conseguimos entregar enquanto aprendíamos Django, Alpine.js, Bootstrap e a publicar o sistema.",
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
        title: "Segurança e auditoria",
        text: "O NCI é uma instituição parceira do governo e lida com dados sensíveis. A equipe tratou a proteção das informações e a possibilidade de auditar operações como prioridades desde o levantamento de requisitos até a implementação.",
      },
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
      "Visualizador interativo de 12 algoritmos de ordenação em C e Raylib, com execução passo a passo no navegador.",
    objective:
      "Quando aprendi algoritmos de ordenação, tive dificuldade para acompanhar o que acontecia em cada etapa. Criei o visualizador para consolidar o que aprendi e ajudar outras pessoas a entender esses algoritmos, mostrando passo a passo como cada comparação e movimentação afeta o conjunto de dados.",
    technologies: ["C99", "Raylib 5.5", "CMake", "Emscripten", "WebAssembly", "WebGL"],
    features: [
      "Bubble, Selection, Insertion, Cocktail Shaker, Merge, Quick, Heap, Counting, Radix, Gnome, Shell e Comb Sort.",
      "Pausa, avanço de um passo e reinício. A troca de algoritmo preserva a entrada para facilitar comparações.",
      "Geração de dados aleatórios com 3 a 95 elementos e intervalo configurável de 0,01 a 1 segundo por passo.",
      "Descrição e complexidades de cada algoritmo, contadores de comparações e movimentações e destaques de leitura, escrita e conclusão.",
    ],
    architecture: [
      {
        title: "Algoritmos e dados",
        text: "Cada algoritmo mantém uma máquina de estado em seu módulo C. O Quick Sort usa partição de Lomuto com pilha explícita e o Merge Sort intercala faixas de baixo para cima.",
      },
      {
        title: "Execução incremental",
        text: "O desktop e o navegador compartilham a função de quadro. Na web, o loop do Emscripten devolve o controle ao navegador entre quadros.",
      },
      {
        title: "Métricas de ordenação",
        text: "Cada escrita no vetor principal ou auxiliar conta como uma movimentação. Counting e Radix usam frequências e distribuição por dígito, respectivamente, e registram zero comparações entre elementos.",
      },
    ],
    contributions: [
      "Desenvolvimento manual do projeto pessoal em C.",
      "Implementação da visualização e do gerenciamento de estado.",
      "Integração dos algoritmos com a renderização e o controle de velocidade.",
    ],
    limitations:
      "A versão web requer WebAssembly e WebGL. O canvas escala proporcionalmente e os controles ficam menores em telas estreitas. A taxa de quadros limita a velocidade efetiva. A implementação de Counting Sort aceita valores inteiros de 0 a 350.",
    development:
      "Desenvolvi o visualizador manualmente em C e Raylib. Usei IA apenas para adaptá-lo para a web e testá-lo.",
    source: "https://github.com/liphecodez/visualizador-de-algoritimos",
    demo: {
      kind: "web",
      url: "https://liphecodez.github.io/visualizador-de-algoritimos/",
      engine: "raylib",
      instructions: [
        "Selecione um algoritmo na barra lateral. Use os botões do visualizador para executar, pausar, avançar um passo, reiniciar ou gerar novos dados.",
        "Clique no gráfico para dar foco ao teclado. Espaço pausa ou continua, → avança um passo e R reinicia com os mesmos dados.",
      ],
    },
    media: [],
  },
  {
    slug: "lab-rats",
    name: "Lab Rats",
    category: "Projeto pessoal · Godot / GDScript",
    short: "Um puzzle 2D de movimento e interação.",
    intro:
      "Puzzle 2D em Godot e GDScript. Guie um rato por labirintos em que ele desliza até encontrar uma parada ou um obstáculo.",
    objective:
      "Criei o Lab Rats para me divertir desenvolvendo e jogando e para oferecer a outras pessoas um puzzle divertido. A ideia é experimentar trajetos e descobrir como combinar obstáculos e objetos para chegar à saída.",
    technologies: ["Godot 4.7", "GDScript", "WebAssembly", "WebGL 2"],
    features: [
      "Deslizamento em grade com paredes, pisos de parada e redirecionadores.",
      "Portas coloridas que abrem após coletar todas as chaves da cor correspondente.",
      "Espinhos letais quando atingidos de frente, portais que conservam a direção e um inimigo que patrulha o labirinto.",
      "Seleção de fases no menu, com pausa, reinício e avanço pela tela de vitória.",
    ],
    architecture: [
      {
        title: "Eventos e gatilhos",
        text: "A lógica do jogo é orientada a eventos. Gatilhos no cenário acionam interações, e o autoload Events distribui acontecimentos da partida, como a coleta de chaves e os impactos que afetam a câmera.",
      },
      {
        title: "Estado e reutilização",
        text: "As fases são montadas com cenas e componentes reutilizáveis. Um gerenciador acompanha a fase atual e os itens coletados, enquanto os menus controlam a pausa, o reinício e a progressão.",
      },
      {
        title: "Renderização e áudio",
        text: "A versão web usa o renderizador de compatibilidade do Godot. Um gerenciador de áudio concentra a reprodução de música e efeitos durante as partidas.",
      },
    ],
    contributions: [
      "Desenvolvimento manual do projeto pessoal em Godot e GDScript.",
      "Implementação das mecânicas de movimentação e interação.",
      "Organização de eventos, componentes, estado e áudio.",
    ],
    limitations:
      "A versão web requer WebAssembly, WebGL 2 e teclado para movimentação. O progresso dura apenas durante a sessão. O jogo mantém a proporção 16:9 e o áudio depende de interação com o jogo.",
    nextSteps:
      "Quero criar mais fases e já comecei a desenvolver uma ferramenta para criar e editar níveis dentro do próprio jogo.",
    development:
      "Desenvolvi o jogo manualmente em Godot e GDScript. Usei IA apenas para adaptá-lo para a web e testá-lo.",
    source: "https://github.com/liphecodez/lab-rats",
    demo: {
      kind: "web",
      url: "https://liphecodez.github.io/lab-rats/",
      engine: "godot",
      instructions: [
        "Clique no jogo para dar foco ao teclado. Use o mouse para escolher Play ou Select level e navegar pelos menus.",
        "Use as setas ou WASD para escolher uma direção quando o rato estiver parado. P ou Esc pausa ou retoma, R reinicia e Enter avança na tela de vitória ou volta ao menu ao concluir o jogo. F alterna a tela cheia com o jogo em foco.",
      ],
    },
    media: [],
  },
];
