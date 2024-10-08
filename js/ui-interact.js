function mostrarTextoCopiado() {
    var elemento = document.getElementById('infoCopiado');
    elemento.style.display = 'block';

    setTimeout(function () {
        elemento.style.display = 'none';
    }, 3000);

    window.scrollTo({
        top: 0
    });
}

function descerCor(n) {
    var totalCoresRgb = coresRgbExistentes();
    var corInputAbaixo;

    // Se é o último elemento, troca com o de cima
    if (n === totalCoresRgb) {
        corInputAbaixo = document.getElementById("color-1");
    } else {
        corInputAbaixo = document.getElementById("color-" + (parseInt(n) + 1));
    }

    // Resgatar os dois elementos que serão trocados
    const corInputAtual = document.getElementById("color-" + n);
    const corLabel = corInputAtual.value;
    const corLabelAbaixo = corInputAbaixo.value;

    // Fazer a troca
    corInputAtual.value = corLabelAbaixo;
    corInputAbaixo.value = corLabel;

    // Atualizar a visualização das cores
    corInputAtual.jscolor.fromString(corLabelAbaixo);
    corInputAbaixo.jscolor.fromString(corLabel);

    updateOutputText();
}

function subirCor(n) {
    var corInputAcima;

    // Se é o primeiro elemento, vai trocar com o último
    if (n === 1) {
        const totalCoresRgb = coresRgbExistentes();
        corInputAcima = document.getElementById("color-" + totalCoresRgb);
    } else {
        corInputAcima = document.getElementById("color-" + (parseInt(n) - 1));
    }

    const corInputAtual = document.getElementById("color-" + n);
    const corLabel = corInputAtual.value;
    const corLabelAcima = corInputAcima.value;

    // Fazer a troca
    corInputAtual.value = corLabelAcima;
    corInputAcima.value = corLabel;

    // Atualizar a visualização das cores
    corInputAtual.jscolor.fromString(corLabelAcima);
    corInputAcima.jscolor.fromString(corLabel);

    updateOutputText();
}

function coresRgbExistentes() {
    var elementoChecado, totalDeElementos;

    for (var i = 0; i < 20; i++) {
        elementoChecado = document.getElementById("color-" + i);

        if (elementoChecado) {
            totalDeElementos = i;
        }
    }

    return totalDeElementos;
}