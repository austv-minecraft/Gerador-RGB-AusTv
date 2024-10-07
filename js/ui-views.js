function showCaixasOptions(value) {
    if (value === 'config') {
        document.getElementById('tipo-item-div').style.display = 'none';

        document.getElementById('nome-chave-div').style.display = 'block';
        document.getElementById('text-input-div').style.display = 'block';

        document.getElementById('test-test').textContent = 'Nome da caixa';
    }

    if (value === 'itens') {
        document.getElementById('nome-chave-div').style.display = 'none';

        document.getElementById('tipo-item-div').style.display = 'block';
        document.getElementById('text-input-div').style.display = 'block';

        document.getElementById('test-test').textContent = 'Nome do item';
    }
}