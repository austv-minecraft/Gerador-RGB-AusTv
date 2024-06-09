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
  // CrazyCrates DisplayName
  0: {
    outputPrefix: '',
    template: '#$1$2$3$4$5$6$f$c',
    formatChar: '&',
    maxLength: 600
  },
  // Essentials Broadcast
  1: {
    outputPrefix: '',
    template: '&#$1$2$3$4$5$6$f$c',
    formatChar: '&',
    maxLength: 600
  },
  // AdvancedEnchantments Give Command
  2: {
    outputPrefix: 'name:',
    template: '{#$1$2$3$4$5$6}$f$c',
    formatChar: '&',
    maxLength: 600
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
    document.getElementById('outputTextDois').classList.replace("gray", "darkgray");
    document.getElementById('outputTextTres').classList.replace("gray", "darkgray");
    document.getElementById('error').classList.replace("errortext", "darkerrortext");
    document.getElementById('numOfColors').classList.add("darktextboxes");
    document.getElementById('nickname').classList.add("darktextboxes");
    document.getElementById('outputText').classList.add("darktextboxes");
    document.getElementById('outputTextDois').classList.add("darktextboxes");
    document.getElementById('outputTextTres').classList.add("darktextboxes");
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
    document.getElementById('outputTextDois').classList.replace("darkgray", "gray");
    document.getElementById('outputTextTres').classList.replace("darkgray", "gray");
    document.getElementById('error').classList.replace("darkerrortext", "errortext");
    document.getElementById('numOfColors').classList.remove("darktextboxes");
    document.getElementById('nickname').classList.remove("darktextboxes");
    document.getElementById('outputText').classList.remove("darktextboxes");
    document.getElementById('outputTextDois').classList.remove("darktextboxes");
    document.getElementById('outputTextTres').classList.remove("darktextboxes");
    Array.from(document.getElementsByClassName("hexColor")).forEach(e => {
      document.getElementById(e.id).classList.remove("darktextboxes");
    })
  }
}

/* Get a random HEX color */
function getRandomHexColor() {
     return Math.floor(Math.random()*16777215).toString(16).toUpperCase();
}

/* 
Copies contents to clipboard
function copyTextToClipboard(text) {
  let textArea = document.createElement('textarea');
  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  document.execCommand('copy');
  alert('Copied output!');
  document.body.removeChild(textArea);
}
*/

function showError(show) {
  if (show) {
    document.getElementById('error').style.display = 'block';
    document.getElementById('outputText').style.height = '70px';
    document.getElementById('outputText').style.marginBottom = '5px';
    document.getElementById('outputTextDois').style.height = '70px';
    document.getElementById('outputTextDois').style.marginBottom = '5px';
    document.getElementById('outputTextTres').style.height = '70px';
    document.getElementById('outputTextTres').style.marginBottom = '5px';
  } else {
    document.getElementById('error').style.display = 'none';
    document.getElementById('outputText').style.height = '95px';
    document.getElementById('outputText').style.marginBottom = '10px';
    document.getElementById('outputTextDois').style.height = '95px';
    document.getElementById('outputTextDois').style.marginBottom = '10px';
    document.getElementById('outputTextTres').style.height = '95px';
    document.getElementById('outputTextTres').style.marginBottom = '10px';
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
  
  // Formato 1
  let format = formats[0];
  let formatDois = formats[2];
  let formatTres = formats[1];

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
  let outputTextDois = document.getElementById('outputTextDois');
  let outputTextTres = document.getElementById('outputTextTres');
  let gradient = new Gradient(getColors(), newNick.replace(/ /g, '').length);
  let charColors = [];
  let output = format.outputPrefix;
  let outputDois = formatDois.outputPrefix; // Inicializa outputDois com o prefixo de formatDois
  let outputTres = formatTres.outputPrefix;

  for (let i = 0; i < newNick.length; i++) {
    let char = newNick.charAt(i);
    if (char == ' ') {
      output += char;
      outputDois += char;
      outputTres += char; // Adiciona espaço em outputDois também
      charColors.push(null);
      continue;
    }

    let hex = convertToHex(gradient.next());
    charColors.push(hex);
    let hexOutput = format.template;
    let hexOutputDois = formatDois.template;
    let hexOutputTres = formatTres.template; // Template para formatDois

    for (let n = 1; n <= 6; n++) {
      hexOutput = hexOutput.replace(`$${n}`, hex.charAt(n - 1));
      hexOutputDois = hexOutputDois.replace(`$${n}`, hex.charAt(n - 1));
      hexOutputTres = hexOutputTres.replace(`$${n}`, hex.charAt(n - 1)); // Substitui caracteres hex em hexOutputDois
    }

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

    // Processamento similar para outputDois
    let formatCodesDois = '';
    if (formatDois.formatChar != null) {
      if (bold) formatCodesDois += formatDois.formatChar + 'l';
      if (italic) formatCodesDois += formatDois.formatChar + 'o';
      if (underline) formatCodesDois += formatDois.formatChar + 'n';
      if (strike) formatCodesDois += formatDois.formatChar + 'm';
    }

    hexOutputDois = hexOutputDois.replace('$f', formatCodesDois);
    hexOutputDois = hexOutputDois.replace('$c', char);
    outputDois += hexOutputDois;

    // Processamento similar para outputDois
    let formatCodesTres = '';
    if (formatTres.formatChar != null) {
      if (bold) formatCodesTres += formatTres.formatChar + 'l';
      if (italic) formatCodesTres += formatTres.formatChar + 'o';
      if (underline) formatCodesTres += formatTres.formatChar + 'n';
      if (strike) formatCodesTres += formatTres.formatChar + 'm';
    }

    hexOutputTres = hexOutputTres.replace('$f', formatCodesTres);
    hexOutputTres = hexOutputTres.replace('$c', char);
    outputTres += hexOutputTres;
  }

  // Atualiza os elementos de saída com os respectivos outputs
  outputText.innerText = output;
  outputTextDois.innerText = outputDois;
  outputTextTres.innerText = outputTres;

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
