/*
Função que vai setar todos as classes e atributos para modo escuro ou claro, dependendo da opção do usuário. É feito dessa forma para que possa ser feito em um script só todos os temas, pois, caso não exista a classe, o HTML não falhe.

Formato antigo:
    document.getElementById('crate-name').classList.add("darktextboxes");
    document.getElementById('output-format').classList.add("dark");
*/ 
function darkMode() {
    let elementos = [
        'output-format', 'color-preset', 'numOfColors', 'graylabel1', 'graylabelRgbResult',
        'graylabelTagName', 'outputText', 'outputTextTag', 'outputTagColor1', 'outputTagColor2',
        'error', 'nickname', 'crate-num-itens', 'crate-custom', 'crate-chance', 'crate-name', 'crate-item-type',
        'etapa-criacao', 'ouputTextTag', 'input-unicode', 'input-key-custom'
    ];

    // Modo escuro
    if (document.getElementById('darkmode').checked == true) {
        document.body.classList.add('dark');

        // Todas as classes a checar
        

        elementos.forEach(id => {
            let elemento = document.getElementById(id);
            if (elemento) {
                if (id.includes("graylabel")) {
                    elemento.classList.replace("gray", "darkgray");
                } else if (id === "error") {
                    elemento.classList.replace("errortext", "darkerrortext");
                } else {
                    elemento.classList.add("darktextboxes");
                }
            }
        });

        Array.from(document.getElementsByClassName("hexColor")).forEach(e => {
            if (document.getElementById(e.id)) {
                document.getElementById(e.id).classList.add("darktextboxes");
            }
        });

    // Modo claro
    } else {
        document.body.classList.remove('dark');
        elementos.forEach(id => {
            let elemento = document.getElementById(id);
            if (elemento) {
                if (id.includes("graylabel")) {
                    elemento.classList.replace("darkgray", "gray");
                } else if (id === "error") {
                    elemento.classList.replace("darkerrortext", "errortext");
                } else {
                    elemento.classList.remove("darktextboxes");
                }
            }
        });

        // Hex color elements
        Array.from(document.getElementsByClassName("hexColor")).forEach(e => {
            if (document.getElementById(e.id)) {
                document.getElementById(e.id).classList.remove("darktextboxes");
            }
        });
    }
}

document.getElementById('darkmode').checked = true
darkMode()