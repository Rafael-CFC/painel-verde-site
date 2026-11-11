// =========================================================
// Painel Verde Garopaba — versão estilizada (SNCT 2026)
// =========================================================

// Menu do celular: abre e fecha a lista de paginas
const botaoMenu = document.querySelector(".btn-menu");
const menu = document.querySelector(".menu");
if (botaoMenu && menu) {
  botaoMenu.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", aberto);
  });
  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("aberto");
      botaoMenu.setAttribute("aria-expanded", false);
    });
  });
}

// Cores e nomes de cada categoria de residuo
const CATEGORIAS = {
  Reciclaveis: { nome: "Recicláveis", cor: "var(--cat-reciclaveis)" },
  Vidro: { nome: "Vidro", cor: "var(--cat-vidro)" },
  Eletronicos: { nome: "Eletrônicos", cor: "var(--cat-eletronicos)" },
  Oleo: { nome: "Óleo de cozinha", cor: "var(--cat-oleo)" }
};

// Pontos de coleta (dados de exemplo do roteiro da oficina)
const LOCAIS_COLETA = [
  {
    nome: "Ecoponto Central — Secretaria de Meio Ambiente",
    bairro: "Centro",
    categoria: "Eletronicos",
    horario: "Segunda a sexta, 08h às 17h",
    mapaUrl: "https://maps.google.com/?q=Garopaba+Centro"
  },
  {
    nome: "Ponto Verde IFSC Câmpus Garopaba",
    bairro: "Campo D'Una",
    categoria: "Reciclaveis",
    horario: "Segunda a sexta, 08h às 22h",
    mapaUrl: "https://maps.google.com/?q=IFSC+Garopaba"
  },
  {
    nome: "Coleta de Vidro e Óleo — Associação Comunitária",
    bairro: "Ferrugem",
    categoria: "Vidro",
    horario: "Sábados, 09h às 13h",
    mapaUrl: "https://maps.google.com/?q=Praia+da+Ferrugem+Garopaba"
  },
  {
    nome: "Coleta de Óleo de Cozinha — Associação Comunitária",
    bairro: "Ferrugem",
    categoria: "Oleo",
    horario: "Sábados, 09h às 13h",
    mapaUrl: "https://maps.google.com/?q=Praia+da+Ferrugem+Garopaba"
  }
];

const grade = document.getElementById("gradeEcopontos");
const botoesFiltro = document.querySelectorAll(".btn-filtro");

function filtrarEcopontos(categoriaEscolhida) {
  if (!grade) return;

  const filtrados = categoriaEscolhida === "Todos"
    ? LOCAIS_COLETA
    : LOCAIS_COLETA.filter(item => item.categoria === categoriaEscolhida);

  botoesFiltro.forEach(botao => {
    const ativo = botao.dataset.filtro === categoriaEscolhida;
    botao.classList.toggle("ativo", ativo);
    botao.setAttribute("aria-pressed", ativo);
  });

  if (filtrados.length === 0) {
    grade.innerHTML = `<p class="vazio">Ainda não há pontos cadastrados para esta categoria.</p>`;
    return;
  }

  grade.innerHTML = filtrados.map(local => {
    const categoria = CATEGORIAS[local.categoria];
    return `
      <article class="cartao-ecoponto" style="--cor: ${categoria.cor}">
        <span class="tag-residuo">${categoria.nome}</span>
        <h3>${local.nome}</h3>
        <ul class="info">
          <li><strong>Bairro</strong> ${local.bairro}</li>
          <li><strong>Horário</strong> ${local.horario}</li>
        </ul>
        <a class="link-mapa" href="${local.mapaUrl}" target="_blank" rel="noopener">
          Ver no Google Maps →
        </a>
      </article>
    `;
  }).join("");
}

botoesFiltro.forEach(botao => {
  botao.addEventListener("click", () => filtrarEcopontos(botao.dataset.filtro));
});

filtrarEcopontos("Todos");
