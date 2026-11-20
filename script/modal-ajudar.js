
/* ==========================================
   MODAL GLOBAL - COMO AJUDAR
========================================== */

// SELECIONA A JANELA

const modalAjuda = document.getElementById("modal-ajudar");

// SELECIONA TODOS OS LINKS QUE ABREM A JANELA

const linksAjuda = document.querySelectorAll(
    ".abrir-como-ajudar"
);

// SELECIONA O BOTÃO DE FECHAR

const fecharAjuda = document.querySelector(
    ".modal-ajudar-fechar"
);

// ABRIR A JANELA

linksAjuda.forEach(link => {

    link.addEventListener("click", (evento) => {

        evento.preventDefault();

        if (!modalAjuda.open) {
            modalAjuda.showModal();
        }

    });

});

// FECHAR PELO BOTÃO X

fecharAjuda.addEventListener("click", () => {
    modalAjuda.close();
});

// FECHAR AO CLICAR NO FUNDO ESCURO

modalAjuda.addEventListener("click", (evento) => {

    if (evento.target === modalAjuda) {

        const area = modalAjuda.getBoundingClientRect();

        const clicouFora =
            evento.clientX < area.left ||
            evento.clientX > area.right ||
            evento.clientY < area.top ||
            evento.clientY > area.bottom;

        if (clicouFora) {
            modalAjuda.close();
        }

    }

});

// A TECLA ESC JÁ É SUPORTADA PELO DIALOG
