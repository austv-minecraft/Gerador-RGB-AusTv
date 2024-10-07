function selecionarTagAnimada() {  
  if (document.getElementById('tagAnimada').checked == true) {
    document.getElementById('numColors').style.display = 'none';
  } else {
    document.getElementById('numColors').style.display = 'block';
  }

  document.getElementById('numOfColors').value = 2;
  toggleColors(2);
}

let outputText = document.getElementById('outputTextTag');
outputText.innerText = "mudar aqui";
