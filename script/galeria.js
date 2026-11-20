
/* ==========================================
   LIGHTBOX - GALERIA DE MOMENTOS
========================================== */

// SELECIONANDO OS ELEMENTOS DO HTML

const imagensGaleria = document.querySelectorAll(
    ".galeria-imagem img"
);

const lightbox = document.getElementById("lightbox");
const imagemAmpliada = document.getElementById("lightbox-imagem");
const legendaAmpliada = document.getElementById("lightbox-legenda");
const botaoFechar = document.getElementById("lightbox-fechar");

// CONTROLE DA FOTOGRAFIA ATUAL

let indiceAtual = 0;
let elementoAnterior = null;

// ==========================================
// FUNÇÃO PARA EXIBIR UMA FOTOGRAFIA
// ==========================================

function mostrarFotografia(indice) {

    // GARANTE QUE O ÍNDICE FIQUE DENTRO DA GALERIA

    indiceAtual = (
        indice + imagensGaleria.length
    ) % imagensGaleria.length;

    const imagemSelecionada = imagensGaleria[indiceAtual];

    // CARREGA A IMAGEM ORIGINAL

    imagemAmpliada.src =
        imagemSelecionada.currentSrc ||
        imagemSelecionada.src;

    imagemAmpliada.alt = imagemSelecionada.alt;

    // BUSCA A LEGENDA DA FOTOGRAFIA

    const itemGaleria = imagemSelecionada.closest(
        ".galeria-item"
    );

    const legenda = itemGaleria.querySelector(
        "figcaption"
    );

    legendaAmpliada.textContent = legenda
        ? legenda.textContent.trim()
        : "";
}

// ==========================================
// ABRIR LIGHTBOX
// ==========================================

function abrirLightbox(indice) {

    elementoAnterior = document.activeElement;

    mostrarFotografia(indice);

    // MOSTRA A JANELA

    lightbox.hidden = false;

    // IMPEDE ROLAGEM DO FUNDO

    document.body.style.overflow = "hidden";

    // COLOCA O FOCO NO BOTÃO FECHAR

    botaoFechar.focus();
}

// ==========================================
// FECHAR LIGHTBOX
// ==========================================

function fecharLightbox() {

    // ESCONDE A JANELA

    lightbox.hidden = true;

    // LIMPA A IMAGEM

    imagemAmpliada.removeAttribute("src");

    // LIBERA A ROLAGEM

    document.body.style.overflow = "";

    // DEVOLVE O FOCO AO ELEMENTO ANTERIOR

    if (elementoAnterior) {
        elementoAnterior.focus();
    }
}

// ==========================================
// CLICAR NAS FOTOGRAFIAS
// ==========================================

imagensGaleria.forEach((imagem, indice) => {

    const botao = imagem.closest(".galeria-abrir");

    // SE A IMAGEM ESTIVER DENTRO DE UM BOTÃO

    if (botao) {

        botao.addEventListener("click", () => {
            abrirLightbox(indice);
        });

    } else {

        // COMPATIBILIDADE COM O HTML ATUAL

        imagem.addEventListener("click", () => {
            abrirLightbox(indice);
        });

    }
});

// ==========================================
// FECHAR PELO BOTÃO X
// ==========================================

botaoFechar.addEventListener("click", fecharLightbox);

// ==========================================
// FECHAR CLICANDO NO FUNDO ESCURO
// ==========================================

lightbox.addEventListener("click", (evento) => {

    if (evento.target === lightbox) {
        fecharLightbox();
    }

});

// ==========================================
// NAVEGAÇÃO PELO TECLADO
// ==========================================

document.addEventListener("keydown", (evento) => {

    // NÃO EXECUTA SE ESTIVER FECHADO

    if (lightbox.hidden) {
        return;
    }

    // FECHAR COM ESC

    if (evento.key === "Escape") {
        fecharLightbox();
    }

    // PRÓXIMA FOTOGRAFIA

    if (evento.key === "ArrowRight") {
        mostrarFotografia(indiceAtual + 1);
    }

    // FOTOGRAFIA ANTERIOR

    if (evento.key === "ArrowLeft") {
        mostrarFotografia(indiceAtual - 1);
    }

    // MANTER O FOCO DENTRO DO LIGHTBOX

    if (evento.key === "Tab") {
        evento.preventDefault();
        botaoFechar.focus();
    }

});
