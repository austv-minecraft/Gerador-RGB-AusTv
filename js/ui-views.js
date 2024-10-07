function showCaixasOptions(value) {
    if (value === 'config') {
        document.getElementById('tipo-item-div').style.display = 'none';
        document.getElementById('item-infos-div').style.display = 'none';
        document.getElementById('nome-chave-div').style.display = 'block';
        document.getElementById('text-input-div').style.display = 'block';
        document.getElementById('coloredNick').style.display = 'block';
        document.getElementById('input-title2').textContent = 'Nome da chave';
    } 
    
    else if (value === 'itens') {
        document.getElementById('nome-chave-div').style.display = 'none';
        document.getElementById('tipo-item-div').style.display = 'block';
        document.getElementById('text-input-div').style.display = 'block';
        document.getElementById('item-infos-div').style.display = 'block';
        document.getElementById('coloredNick').style.display = 'block';
        document.getElementById('input-title1').textContent = 'Nome do item';
    } 
    
    else {
        document.getElementById('text-input-div').style.display = 'none';
        document.getElementById('nome-chave-div').style.display = 'none';
        document.getElementById('tipo-item-div').style.display = 'none';
        document.getElementById('item-infos-div').style.display = 'none';
        document.getElementById('coloredNick').style.display = 'none';
    }
}