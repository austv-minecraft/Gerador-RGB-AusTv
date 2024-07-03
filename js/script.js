// elements for obtaining vals
const nickName = document.getElementById('nickname');
const coloredNick = document.getElementById('coloredNick');
const savedColors = ['084CFB', 'ADF3FD', getRandomHexColor(), getRandomHexColor(), getRandomHexColor(), getRandomHexColor(), getRandomHexColor(), getRandomHexColor(), getRandomHexColor(), getRandomHexColor()];
const presets = {
  1: {
    colors: ["FF0000", "FF7F00", "FFFF00", "00FF00", "0000FF", "4B0082", "9400D3"],
  }
}
const formats = {
  0: {
    outputPrefix: '',
    template: '&#$1$2$3$4$5$6$f$c',
    formatChar: '&',
    maxLength: 256
  },
  1: {
    outputPrefix: '/nome ',
    template: '&#$1$2$3$4$5$6$f$c',
    formatChar: '&',
    maxLength: 256
  },
  2: {
    outputPrefix: '/clan mudartag ',
    template: '<#$1$2$3$4$5$6>$f$c',
    formatChar: '&',
    maxLength: 256
  },
  3: {
    outputPrefix: '/nick ',
    template: '&#$1$2$3$4$5$6$f$c',
    formatChar: '&',
    maxLength: 256
  },
  4: {
    outputPrefix: '/nick ',
    template: '<#$1$2$3$4$5$6>$f$c',
    formatChar: '&',
    maxLength: 256
  },
  5: {
    outputPrefix: '/nick ',
    template: '&x&$1&$2&$3&$4&$5&$6$f$c',
    formatChar: '&',
    maxLength: 256
  },
  6: {
    outputPrefix: '',
    template: '§x§$1§$2§$3§$4§$5§$6$f$c',
    formatChar: '§',
    maxLength: null
  },
  7: {
    outputPrefix: '',
    template: '[COLOR=#$1$2$3$4$5$6]$c[/COLOR]',
    formatChar: null,
    maxLength: null
  },
  8: {
    outputPrefix: '',
    template: '\\u00A7x\\u00A7$1\\u00A7$2\\u00A7$3\\u00A7$4\\u00A7$5\\u00A7$6$c',
    formatChar: null,
    maxLength: null
  },
};

function darkMode() {
  if (document.getElementById('darkmode').checked == true) {
    document.body.classList.add('dark');
    document.getElementById('output-format').classList.add("dark");
    document.getElementById('color-preset').classList.add("dark");
    document.getElementById('numOfColors').classList.add("dark");
    document.getElementById('graylabel1').classList.replace("gray", "darkgray");
    document.getElementById('graylabel2').classList.replace("gray", "darkgray");
    document.getElementById('outputText').classList.replace("gray", "darkgray");
    document.getElementById('outputText').classList.replace("gray", "darkgray");
    document.getElementById('error').classList.replace("errortext", "darkerrortext");
    document.getElementById('numOfColors').classList.add("darktextboxes");
    document.getElementById('nickname').classList.add("darktextboxes");
    document.getElementById('outputText').classList.add("darktextboxes");
    Array.from(document.getElementsByClassName("hexColor")).forEach(e => {
      document.getElementById(e.id).classList.add("darktextboxes");
    })
  } else {
    document.body.classList.remove('dark');
    document.getElementById('output-format').classList.remove("dark");
    document.getElementById('color-preset').classList.remove("dark");
    document.getElementById('numOfColors').classList.remove("dark");
    document.getElementById('graylabel1').classList.replace("darkgray", "gray");
    document.getElementById('graylabel2').classList.replace("darkgray", "gray");
    document.getElementById('outputText').classList.replace("darkgray", "gray");
    document.getElementById('error').classList.replace("darkerrortext", "errortext");
    document.getElementById('numOfColors').classList.remove("darktextboxes");
    document.getElementById('nickname').classList.remove("darktextboxes");
    document.getElementById('outputText').classList.remove("darktextboxes");
    Array.from(document.getElementsByClassName("hexColor")).forEach(e => {
      document.getElementById(e.id).classList.remove("darktextboxes");
    })
  }
}

/* Get a random HEX color */
function getRandomHexColor() {
     return Math.floor(Math.random()*16777215).toString(16).toUpperCase();
}

function copyTextToClipboard(text) {
  let textArea = document.createElement('textarea');
  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  document.execCommand('copy');
  document.body.removeChild(textArea);

  mostrarTextoCopiado();
}

function showError(show) {
  if (show) {
    document.getElementById('error').style.display = 'block';
    document.getElementById('outputText').style.height = '70px';
    document.getElementById('outputText').style.marginBottom = '5px';
  } else {
    document.getElementById('error').style.display = 'none';
    document.getElementById('outputText').style.height = '95px';
    document.getElementById('outputText').style.marginBottom = '10px';
  }
}

function hex(c) {
  let s = '0123456789abcdef';
  let i = parseInt(c);
  if (i == 0 || isNaN(c))
    return '00';
  i = Math.round(Math.min(Math.max(0, i), 255));
  return s.charAt((i - i % 16) / 16) + s.charAt(i % 16);
}

/* Convert an RGB triplet to a hex string */
function convertToHex(rgb) {
  return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
}

/* Remove '#' in color hex string */
function trim(s) {
  return (s.charAt(0) == '#') ? s.substring(1, 7) : s
}

/* Convert a hex string to an RGB triplet */
function convertToRGB(hex) {
  let color = [];
  color[0] = parseInt((trim(hex)).substring(0, 2), 16);
  color[1] = parseInt((trim(hex)).substring(2, 4), 16);
  color[2] = parseInt((trim(hex)).substring(4, 6), 16);
  return color;
}

/**
 * JavaScript implementation of HexUtils Gradients from RoseGarden.
 * https://github.com/Rosewood-Development/RoseGarden/blob/master/src/main/java/dev/rosewood/rosegarden/utils/HexUtils.java#L358
 */
class Gradient {
  constructor(colors, numSteps) {
    this.colors = colors;
    this.gradients = [];
    this.steps = numSteps - 1;
    this.step = 0;

    const increment = this.steps / (colors.length - 1);
    for (let i = 0; i < colors.length - 1; i++)
      this.gradients.push(new TwoStopGradient(colors[i], colors[i + 1], increment * i, increment * (i + 1)));
  }

  /* Gets the next color in the gradient sequence as an array of 3 numbers: [r, g, b] */
  next() {
    if (this.steps <= 1)
      return this.colors[0];

    const adjustedStep = Math.round(Math.abs(((2 * Math.asin(Math.sin(this.step * (Math.PI / (2 * this.steps))))) / Math.PI) * this.steps));
    let color;
    if (this.gradients.length < 2) {
      color = this.gradients[0].colorAt(adjustedStep);
    } else {
      const segment = this.steps / this.gradients.length;
      const index = Math.min(Math.floor(adjustedStep / segment), this.gradients.length - 1);
      color = this.gradients[index].colorAt(adjustedStep);
    }

    this.step++;
    return color;
  }
}

class TwoStopGradient {
  constructor(startColor, endColor, lowerRange, upperRange) {
    this.startColor = startColor;
    this.endColor = endColor;
    this.lowerRange = lowerRange;
    this.upperRange = upperRange;
  }

  colorAt(step) {
    return [
      this.calculateHexPiece(step, this.startColor[0], this.endColor[0]),
      this.calculateHexPiece(step, this.startColor[1], this.endColor[1]),
      this.calculateHexPiece(step, this.startColor[2], this.endColor[2])
    ];
  }

  calculateHexPiece(step, channelStart, channelEnd) {
    const range = this.upperRange - this.lowerRange;
    const interval = (channelEnd - channelStart) / range;
    return Math.round(interval * (step - this.lowerRange) + channelStart);
  }
}

/* Toggles the number of gradient colors between 2 and 10 based on user input */
function toggleColors(colors) {
  let clamped = Math.min(10, Math.max(2, colors));
  if (colors == 1 || colors == '') {
    colors = getColors().length;
  } else if (colors != clamped) {
    $('#numOfColors').val(clamped);
    colors = clamped;
  }
  const container = $('#hexColors');
  const hexColors = container.find('.hexColor');
  const number = hexColors.size();
  if (number > colors) {
    // Need to remove some colors
    hexColors.each((index, element) => {
      if (index + 1 > colors) {
        savedColors[index] = $(element).val();
        $(element).parent().remove();
      }
    });
  } else if (number < colors) {
    // Need to add some colors
    let template = $('#hexColorTemplate').html();
    for (let i = number + 1; i <= colors; i++) {
      let html = template.replace(/\$NUM/g, i).replace(/\$VAL/g, savedColors[i - 1]);
      container.append(html);
    }
    jscolor.install(); // Refresh all jscolor elements
  }
}

/* Gets all colored entered by the user */
function getColors() {
  const hexColors = $('#hexColors').find('.hexColor');
  const colors = [];
  hexColors.each((index, element) => {
    const value = $(element).val();
    savedColors[index] = value;
    colors[index] = convertToRGB(value);
  });
  return colors;
}

function updateOutputText(event) {
  
  let format = formats[document.getElementById('output-format').value];

  if (format.outputPrefix) {
    nickName.value = nickName.value.replace(/ /g, '');
    if (nickName.value) {
      let letters = /^[0-9a-zA-Z_]+$/;
      if (!nickName.value.match(letters)) nickName.value = nickName.value.replace(event.data, '');
      if (!nickName.value.match(letters)) nickName.value = 'austv.net';
    }
  }

  let newNick = nickName.value
  if (!newNick) {
    newNick = 'Digite algo!'
  }

  const bold = document.getElementById('bold').checked;
  const italic = document.getElementById('italics').checked;
  const underline = document.getElementById('underline').checked;
  const strike = document.getElementById('strike').checked;

  let outputText = document.getElementById('outputText');
  let gradient = new Gradient(getColors(), newNick.replace(/ /g, '').length);
  let charColors = [];
  let output = format.outputPrefix;
  for (let i = 0; i < newNick.length; i++) {
    let char = newNick.charAt(i);
    if (char == ' ') {
      output += char;
      charColors.push(null);
      continue;
    }

    let hex = convertToHex(gradient.next());
    charColors.push(hex);
    let hexOutput = format.template;
    for (let n = 1; n <= 6; n++)
      hexOutput = hexOutput.replace(`$${n}`, hex.charAt(n - 1));
    let formatCodes = '';
    if (format.formatChar != null) {
      if (bold) formatCodes += format.formatChar + 'l';
      if (italic) formatCodes += format.formatChar + 'o';
      if (underline) formatCodes += format.formatChar + 'n';
      if (strike) formatCodes += format.formatChar + 'm';
    }
    hexOutput = hexOutput.replace('$f', formatCodes);
    hexOutput = hexOutput.replace('$c', char);
    output += hexOutput;
  }

  outputText.innerText = output;
  showError(format.maxLength != null && format.maxLength < output.length);
  displayColoredName(newNick, charColors);
}

/**
 * padding function:
 * cba to roll my own, thanks Pointy!
 * ==================================
 * source: http://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
 */
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function displayColoredName(nickName, colors) {
  coloredNick.classList.remove('minecraftbold', 'minecraftibold', 'minecraftitalic');
  if (document.getElementById('bold').checked) {
    if (document.getElementById('italics').checked) {
      coloredNick.classList.add('minecraftibold');
    } else {
      coloredNick.classList.add('minecraftbold');
    }
  } else if (document.getElementById('italics').checked) {
    coloredNick.classList.add('minecraftitalic');
  }
  coloredNick.innerHTML = '';
  for (let i = 0; i < nickName.length; i++) {
    const coloredNickSpan = document.createElement('span');
    if (document.getElementById('underline').checked) {
      if (document.getElementById('strike').checked) {
        coloredNickSpan.classList.add('minecraftustrike');
      } else coloredNickSpan.classList.add('minecraftunderline');
    } else if (document.getElementById('strike').checked) {
      coloredNickSpan.classList.add('minecraftstrike');
    }
    coloredNickSpan.style.color = colors[i];
    coloredNickSpan.textContent = nickName[i];
    coloredNick.append(coloredNickSpan);
  }
}

function preset(n) {
  const colors = presets[n].colors
  const container = $('#hexColors');
  container.empty();
    // Need to add some colors
    let template = $('#hexColorTemplate').html();
    for (let i = 0 + 1; i <= colors.length; i++) {
      let html = template.replace(/\$NUM/g, i).replace(/\$VAL/g, colors[i - 1]);
      container.append(html);
    }
    jscolor.install(); // Refresh all jscolor elements
}
toggleColors(2);
updateOutputText();
document.getElementById('darkmode').checked = true
darkMode()

function ajustarPresetsBaseadoNoTipo(tipoPreset) {
  limparConfiguracoes();
  const boldCheckbox = document.getElementById('bold');
  const italicCheckbox = document.getElementById('italics');
  const underlineCheckbox = document.getElementById('underline');

  switch (tipoPreset) {
    case "1": // Nickname jogador, remover presets
      boldCheckbox.disabled = true;
      boldCheckbox.checked = false;
      italicCheckbox.disabled = true;
      italicCheckbox.checked = false;
      underlineCheckbox.disabled = true;
      underlineCheckbox.checked = false;
      updateOutputText();
      break;
    case "2": // Tag de clã, selecionar BOLD
      boldCheckbox.checked = true;
      underlineCheckbox.disabled = true;
      underlineCheckbox.checked = false;
      updateOutputText();
      break;
    default:
      break;
  }
}

function limparConfiguracoes() {
  const boldCheckbox = document.getElementById('bold');
  const italicCheckbox = document.getElementById('italics');
  const underlineCheckbox = document.getElementById('underline');

  boldCheckbox.disabled = false;
  boldCheckbox.checked = false;
  italicCheckbox.disabled = false;
  italicCheckbox.checked = false;
  underlineCheckbox.disabled = false;
  underlineCheckbox.checked = false;
}

function mostrarTextoCopiado() {
  var elemento = document.getElementById('infoCopiado');
  elemento.style.display = 'block';
  
  setTimeout(function() {
    elemento.style.display = 'none';
  }, 3000);

  window.scrollTo({
    top: 0
  });
}

function descerCor(n) {
  var totalCoresRgb = coresRgbExistentes();

  // Se é a última cor, não tem como descer
  if (n !== totalCoresRgb) {
      // Resgatar os dois elementos que serão trocados
      const corInputAtual = document.getElementById("color-" + n);
      const corInputAbaixo = document.getElementById("color-" + (parseInt(n) + 1));
      const corLabel = corInputAtual.value;
      const corLabelAbaixo = corInputAbaixo.value;

      // Fazer a troca
      corInputAtual.value = corLabelAbaixo;
      corInputAbaixo.value = corLabel;

      // Atualizar a visualização das cores
      corInputAtual.jscolor.fromString(corLabelAbaixo);
      corInputAbaixo.jscolor.fromString(corLabel);

      updateOutputText();
      ponteirosBloqueados();
  }
}

function subirCor(n) {
  // Se é a primeira cor, não tem como subir
  if (n !== 1) {
      // Resgatar os dois elementos que serão trocados
      const corInputAtual = document.getElementById("color-" + n);
      const corInputAcima = document.getElementById("color-" + (parseInt(n) - 1));
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

// Função que deixa o ponteiro do mouse bloqueado para as setas da extremidade
function ponteirosBloqueados() {
  var totalCoresRgb = coresRgbExistentes();

  document.getElementById('setaCima#1').classList.add('iconeSetasBloqueado');
  document.getElementById('setaBaixo#' + totalCoresRgb).classList.add('iconeSetasBloqueado');

  // ponteirosBloqueados();
  // Problema: ao adicionar uma nova cor, a antiga ainda fica bloqueada
}
