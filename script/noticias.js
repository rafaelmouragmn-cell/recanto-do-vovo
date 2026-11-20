
/* ==========================================
   NOTÍCIAS - FILTROS E PAGINAÇÃO
========================================== */

// ELEMENTOS DA PÁGINA

const formulario = document.getElementById("form-filtros");

const campoCategoria = document.getElementById("filtro-categoria");
const campoPeriodo = document.getElementById("filtro-periodo");
const campoTitulo = document.getElementById("filtro-titulo");

const todasNoticias = Array.from(
    document.querySelectorAll(".noticia-card")
);

const contador = document.getElementById("quantidade-noticias");
const mensagemVazia = document.getElementById("noticias-vazio");

const botaoAnterior = document.getElementById("pagina-anterior");
const botaoProximo = document.getElementById("proxima-pagina");
const botaoAtual = document.getElementById("pagina-atual");

// CONFIGURAÇÕES

const noticiasPorPagina = 3;

let paginaAtual = 1;
let noticiasFiltradas = [...todasNoticias];

// ==========================================
// MOSTRAR NOTÍCIAS DA PÁGINA
// ==========================================

function mostrarNoticias() {

    const totalPaginas = Math.max(
        1,
        Math.ceil(noticiasFiltradas.length / noticiasPorPagina)
    );

    paginaAtual = Math.min(
        Math.max(paginaAtual, 1),
        totalPaginas
    );

    const inicio = (paginaAtual - 1) * noticiasPorPagina;
    const fim = inicio + noticiasPorPagina;

    // ESCONDER TODAS AS NOTÍCIAS

    todasNoticias.forEach(noticia => {
        noticia.hidden = true;
    });

    // MOSTRAR APENAS AS NOTÍCIAS DA PÁGINA ATUAL

    noticiasFiltradas.slice(inicio, fim).forEach(noticia => {
        noticia.hidden = false;
    });

    // ATUALIZAR CONTADOR

    contador.textContent = noticiasFiltradas.length;

    // MENSAGEM SEM RESULTADOS

    mensagemVazia.hidden = noticiasFiltradas.length > 0;

    // ATUALIZAR PAGINAÇÃO

    botaoAtual.textContent = paginaAtual;
    botaoAtual.setAttribute("aria-label", `Página ${paginaAtual}`);

    botaoAnterior.disabled = paginaAtual === 1;
    botaoProximo.disabled = paginaAtual === totalPaginas;
}

// ==========================================
// FILTRAR NOTÍCIAS
// ==========================================

function filtrarNoticias() {

    const categoria = campoCategoria.value;
    const periodo = Number(campoPeriodo.value);
    const titulo = campoTitulo.value.trim().toLowerCase();

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    noticiasFiltradas = todasNoticias.filter(noticia => {

        const categoriaNoticia = noticia.dataset.categoria;

        const tituloNoticia = noticia.dataset.titulo.toLowerCase();

        const dataNoticia = new Date(
            noticia.dataset.data + "T00:00:00"
        );

        // FILTRAR CATEGORIA

        const categoriaValida =
            !categoria || categoriaNoticia === categoria;

        // FILTRAR TÍTULO

        const tituloValido = tituloNoticia.includes(titulo);

        // FILTRAR PERÍODO

        let periodoValido = true;

        if (periodo > 0) {
            const limite = new Date(hoje);
            limite.setDate(limite.getDate() - periodo);

            periodoValido =
                dataNoticia >= limite &&
                dataNoticia <= hoje;
        }

        return categoriaValida && tituloValido && periodoValido;
    });

    // VOLTAR À PRIMEIRA PÁGINA

    paginaAtual = 1;

    mostrarNoticias();
}

// ==========================================
// EVENTO DO FORMULÁRIO
// ==========================================

formulario.addEventListener("submit", evento => {
    evento.preventDefault();
    filtrarNoticias();
});

// ==========================================
// BOTÃO PRÓXIMA PÁGINA
// ==========================================

botaoProximo.addEventListener("click", () => {
    paginaAtual++;
    mostrarNoticias();
});

// ==========================================
// BOTÃO PÁGINA ANTERIOR
// ==========================================

botaoAnterior.addEventListener("click", () => {
    paginaAtual--;
    mostrarNoticias();
});

// ==========================================
// INICIAR A PÁGINA
// ==========================================

mostrarNoticias();
