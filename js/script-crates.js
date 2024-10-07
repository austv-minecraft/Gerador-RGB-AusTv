const itensDicionario = {
  "espadas": "NETHERITE_SWORD",
  "picaretas": "NETHERITE_PICKAXE",
  "enxadas": "NETHERITE_HOE",
  "pás": "NETHERITE_SHOVEL",
  "machados": "NETHERITE_AXE",
  "capacetes": "NETHERITE_HELMET",
  "peitorais": "NETHERITE_CHESTPLATE",
  "calças": "NETHERITE_LEGGINGS",
  "botas": "NETHERITE_BOOTS",
  "arcos": "BOW",
  "bestas": "CROSSBOW",
  "tesouras": "SHEARS",
  "varas de pesca": "FISHING_ROD",
  "clavas": "MACE"
}

// Variáveis globais
const nickName = document.getElementById('nickname');
const coloredNick = document.getElementById('coloredNick');
const savedColors = ['084CFB', 'ADF3FD', getRandomHexColor(), getRandomHexColor(), getRandomHexColor(), getRandomHexColor(), getRandomHexColor(), getRandomHexColor(), getRandomHexColor(), getRandomHexColor()];
let crateNameMiniMessage = "", keyNameMiniMessage = "";

// Pré definições
const presets = {
  1: {
    colors: ["FF0404", "FF540B", "FFF506", "44FF15", "20FFE4", "6D23E4"],
    totalColors: 6
  },
  2: {
    colors: ["3494E6", "EE70AF"],
    totalColors: 2
  }
}

const formats = {
  0: {
    formatType: '',
    outputPrefix: '',
    template: '&#$1$2$3$4$5$6$f$c',
    formatChar: '&',
    maxLength: 256
  },
  1: {
    formatType: 'nickname',
    outputPrefix: '/nome ',
    template: '&#$1$2$3$4$5$6$f$c',
    formatChar: '&',
    maxLength: 256
  },
  2: {
    formatType: 'clantag',
    outputPrefix: '/clan mudartag ',
    template: '<#$1$2$3$4$5$6>$f$c',
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
  9: {
    formatType: '',
    outputPrefix: '',
    template: '<#$1$2$3$4$5$6>$f$c',
    formatChar: '&',
    maxLength: 256
  },
  10: {
    formatType: '',
    outputPrefix: '',
    template: '{#$1$2$3$4$5$6}$f$c',
    formatChar: '&',
    maxLength: 256
  },
  90: {
    formatType: 'tagPersonalizada',
    outputPrefix: '',
    template: '&#$1$2$3$4$5$6$f$c',
    formatChar: '&',
    maxLength: 256
  },
  91: {
    formatType: 'tagAnimada',
    outputPrefix: '',
    template: '&#$1$2$3$4$5$6$f$c',
    formatChar: '&',
    maxLength: 256
  }
};

function darkMode() {
  if (document.getElementById('darkmode').checked == true) {
    document.body.classList.add('dark');
    document.getElementById('crate-num-itens').classList.add("darktextboxes");
    document.getElementById('crate-custom').classList.add("darktextboxes");
    document.getElementById('crate-chance').classList.add("darktextboxes");
    document.getElementById('crate-name').classList.add("darktextboxes");
    document.getElementById('output-format').classList.add("dark");
    document.getElementById('crate-item-type').classList.add("dark");
    document.getElementById('etapa-criacao').classList.add("dark");
    document.getElementById('color-preset').classList.add("dark");
    document.getElementById('numOfColors').classList.add("dark");
    document.getElementById('graylabel1').classList.replace("gray", "darkgray");
    document.getElementById('graylabelRgbResult').classList.replace("gray", "darkgray");
    document.getElementById('graylabelTagName').classList.replace("gray", "darkgray");
    document.getElementById('outputText').classList.replace("gray", "darkgray");
    document.getElementById('outputText').classList.add("darktextboxes");
    document.getElementById('outputTextTag').classList.replace("gray", "darkgray");
    document.getElementById('outputTextTag').classList.add("darktextboxes");
    document.getElementById('outputTagColor1').classList.replace("gray", "darkgray");
    document.getElementById('outputTagColor1').classList.add("darktextboxes");
    document.getElementById('outputTagColor2').classList.replace("gray", "darkgray");
    document.getElementById('outputTagColor2').classList.add("darktextboxes");
    document.getElementById('error').classList.replace("errortext", "darkerrortext");
    document.getElementById('numOfColors').classList.add("darktextboxes");
    document.getElementById('nickname').classList.add("darktextboxes");
    Array.from(document.getElementsByClassName("hexColor")).forEach(e => {
      document.getElementById(e.id).classList.add("darktextboxes");
    })
  } else {
    document.body.classList.remove('dark');
    document.getElementById('output-format').classList.remove("dark");
    document.getElementById('etapa-criacao').classList.remove("dark");
    document.getElementById('color-preset').classList.remove("dark");
    document.getElementById('numOfColors').classList.remove("dark");
    document.getElementById('graylabel1').classList.replace("darkgray", "gray");
    document.getElementById('graylabelRgbResult').classList.replace("darkgray", "gray");
    document.getElementById('graylabelTagName').classList.replace("darkgray", "gray");
    document.getElementById('outputText').classList.replace("darkgray", "gray");
    document.getElementById('outputText').classList.remove("darktextboxes");
    document.getElementById('outputTextTag').classList.replace("darkgray", "gray");
    document.getElementById('outputTextTag').classList.remove("darktextboxes");
    document.getElementById('outputTagColor1').classList.replace("darkgray", "gray");
    document.getElementById('outputTagColor1').classList.remove("darktextboxes");
    document.getElementById('outputTagColor2').classList.replace("darkgray", "gray");
    document.getElementById('outputTagColor2').classList.remove("darktextboxes");
    document.getElementById('error').classList.replace("darkerrortext", "errortext");
    document.getElementById('numOfColors').classList.remove("darktextboxes");
    document.getElementById('nickname').classList.remove("darktextboxes");
    Array.from(document.getElementsByClassName("hexColor")).forEach(e => {
      document.getElementById(e.id).classList.remove("darktextboxes");
    })
  }
}

function getRandomHexColor() {
  return Math.floor(Math.random() * 16777215).toString(16).toUpperCase();
}

function copyTextToClipboard(text) {
  const outputText = document.getElementById('outputText');
  if (document.createRange && window.getSelection) {
    const range = document.createRange();
    range.selectNodeContents(outputText);
    const selection = window.getSelection();
    selection.removeAllRanges();  // Remove qualquer seleção anterior
    selection.addRange(range);    // Adiciona a nova seleção
  } else if (document.body.createTextRange) { // Para navegadores antigos
    const range = document.body.createTextRange();
    range.moveToElementText(outputText);
    range.select();
  }

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

  if (i == 0 || isNaN(c)) {
    return '00';
  }

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
  let tipoDeComando = document.getElementById('output-format').value;

  // Obter valores dos inputs
  const crateNameValue = document.getElementById('nickname').value || 'Caixa Nova'; // Valor da caixa
  const keyNameValue = document.getElementById('crate-name').value || 'Chave Nova'; // Valor da chave

  // Transforma o crateName e keyName em MiniMessage utilizando o formato 9 (MiniMessage)
  let crateNameMiniMessage = transformToMiniMessage(crateNameValue, formats[9]);
  let keyNameMiniMessage = transformToMiniMessage(keyNameValue, formats[9]);

  // Gerar o texto RGB para o output (gradiente)
  let newNick = crateNameValue.replace(/ /g, ''); // Remover espaços
  const bold = document.getElementById('bold').checked;
  const italic = document.getElementById('italics').checked;
  const underline = document.getElementById('underline').checked;
  const strike = document.getElementById('strike').checked;

  let gradient = new Gradient(getColors(), newNick.length);
  let output = generateRGBOutput(newNick, format, gradient, { bold, italic, underline, strike });

  // Atualizar exibição de nome colorido
  let colorsForDisplay = [];
  for (let i = 0; i < newNick.length; i++) {
    colorsForDisplay.push(convertToHex(gradient.next()));
  }
  displayColoredName(newNick, colorsForDisplay);  // Chamar a função aqui para exibir o nome colorido

  // Configuração para "config"
  let crateConfig = `Crate:
  CrateType: CSGO
  CrateName: '${crateNameMiniMessage}'
  Preview-Name: '<white>'

  StartingKeys: 0
  InGUI: false
  Slot: 21
  OpeningBroadCast: false
  BroadCast: ''

  Item: CHEST
  Glowing: false
  Name: '${crateNameMiniMessage}'
  Lore: []

  Preview:
    Toggle: true
    ChestLines: 4
    Glass:
      Toggle: true
      Item: JIGSAW

  PhysicalKey:
    Name: '${keyNameMiniMessage}'
    Lore:
    - '<gray>Você pode adquirir mais'
    - '<gray>chaves em nossa <light_purple>/ausloja'
    - '<white> '
    - '<gray>Use essa chave em <green>/spawn'
    Item: PAPER#100033
    Glowing: false

  Hologram:
    Toggle: true
    Height: 1.3
    Message:
    - '${output}'`;

  // Configuração para "itens"
  const itemCustomModelData = document.getElementById('crate-custom').value || 100;
  const itemChance = document.getElementById('crate-chance').value || 4;
  const itemNumId = document.getElementById('crate-num-itens').value || 1;
  const itemType = document.getElementById('crate-item-type').value || "espadas";
  let itemConfig = `    ${itemNumId}:
      DisplayName: '${crateNameMiniMessage}'
      DisplayItem: ${itensDicionario[itemType]}#${itemCustomModelData}
      DisplayAmount: 1
      Lore:
      - '<white>Skin da coleção:'
      - ''
      - '<white>ퟁ'
      - ''
      - '<white>ਦ <yellow>Assinado com seu nome!'
      - ''
      - '<white><bold>* <light_purple>Skin para ${itemType}!'
      MaxRange: 100
      Chance: ${itemChance}
      Firework: true
      HideItemFlags: true
      Commands:
      - 'aegive %player% NETHERITE_SWORD 1 custommodeldata:104 name:${transformToFormat10(crateNameValue, formats[10])} lore:&fਦ_&e%essentials_nickname%|&f|&fퟁ|&f'
      - 'broadcast &f⨏ &7%player% encontrou ${generateRGBOutput(crateNameValue, formats[0], gradient, { bold: false, italic: false, underline: false, strike: false })}&7!'`;

  // Atualiza o campo de texto com a configuração final
  if (document.getElementById('etapa-criacao').value == "config") {
    document.getElementById('outputText').innerText = crateConfig;
  } else if (document.getElementById('etapa-criacao').value == "itens") {
    document.getElementById('outputText').innerText = itemConfig;
  } else {
    document.getElementById('outputText').innerText = "Selecione uma opção.";
  }
}


// Função para transformar o valor em formato 10, usando &l em vez de <bold>
function transformToFormat10(value, format) {
  let output = format.outputPrefix;
  let gradient = new Gradient(getColors(), value.length);

  // Captura as opções de formatação
  const bold = document.getElementById('bold').checked;
  const italic = document.getElementById('italics').checked;
  const underline = document.getElementById('underline').checked;
  const strike = document.getElementById('strike').checked;

  // Formatação com &l, &o, &n, &m
  let formatCodes = '';
  if (bold) formatCodes += "&l";       // Negrito
  if (italic) formatCodes += "&o";     // Itálico
  if (underline) formatCodes += "&n";  // Sublinhado
  if (strike) formatCodes += "&m";     // Tachado

  for (let i = 0; i < value.length; i++) {
    let char = value.charAt(i);
    if (char === ' ') {
      output += char;
      continue;
    }

    let hex = convertToHex(gradient.next());
    let hexOutput = format.template;

    for (let n = 1; n <= 6; n++) {
      hexOutput = hexOutput.replace(`$${n}`, hex.charAt(n - 1));
    }

    hexOutput = hexOutput.replace('$f', formatCodes); // Adicionar formatação com &
    hexOutput = hexOutput.replace('$c', char);
    output += hexOutput;
  }

  return output;
}


// Função para transformar o valor em MiniMessage com base no formato
function transformToMiniMessage(value, format) {
  let output = format.outputPrefix;
  let gradient = new Gradient(getColors(), value.length);
  
  // Captura as opções de formatação
  const bold = document.getElementById('bold').checked;
  const italic = document.getElementById('italics').checked;
  const underline = document.getElementById('underline').checked;
  const strike = document.getElementById('strike').checked;

  // Formatação MiniMessage
  let formatCodes = '';
  if (bold) formatCodes += "<bold>";
  if (italic) formatCodes += "<italic>";
  if (underline) formatCodes += "<underlined>";
  if (strike) formatCodes += "<strikethrough>";

  for (let i = 0; i < value.length; i++) {
    let char = value.charAt(i);
    if (char === ' ') {
      output += char;
      continue;
    }

    let hex = convertToHex(gradient.next());
    let hexOutput = format.template;

    for (let n = 1; n <= 6; n++) {
      hexOutput = hexOutput.replace(`$${n}`, hex.charAt(n - 1));
    }

    hexOutput = hexOutput.replace('$f', formatCodes); // Adicionar formatação
    hexOutput = hexOutput.replace('$c', char);
    output += hexOutput;
  }

  return output;
}

// Função para gerar o output no formato RGB com gradiente
function generateRGBOutput(nick, format, gradient, styles) {
  let output = format.outputPrefix;
  for (let i = 0; i < nick.length; i++) {
    let char = nick.charAt(i);

    if (char === ' ') {
      output += char;
      continue;
    }

    let hex = convertToHex(gradient.next());
    let hexOutput = format.template;

    for (let n = 1; n <= 6; n++) {
      hexOutput = hexOutput.replace(`$${n}`, hex.charAt(n - 1));
    }

    let formatCodes = '';
    if (format.formatChar != null) {
      if (styles.bold) formatCodes += format.formatChar + 'l';
      if (styles.italic) formatCodes += format.formatChar + 'o';
      if (styles.underline) formatCodes += format.formatChar + 'n';
      if (styles.strike) formatCodes += format.formatChar + 'm';
    }

    hexOutput = hexOutput.replace('$f', formatCodes);
    hexOutput = hexOutput.replace('$c', char);
    output += hexOutput;
  }

  return output;
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
  const colors = presets[n].colors;
  const numDeCores = presets[n].totalColors;
  const container = $('#hexColors');
  container.empty();
  // Need to add some colors
  let template = $('#hexColorTemplate').html();
  for (let i = 0 + 1; i <= colors.length; i++) {
    let html = template.replace(/\$NUM/g, i).replace(/\$VAL/g, colors[i - 1]);
    container.append(html);
  }
  jscolor.install(); // Refresh all jscolor elements

  // Atualizar total de cores que tem na paleta
  document.getElementById('numOfColors').value = numDeCores;
}
toggleColors(2);
updateOutputText();
document.getElementById('darkmode').checked = true
darkMode()

function ajustarPresetsBaseadoNoTipo(tipoPreset) {
  limparConfiguracoes();
  ajustarCampos();
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
    case "90":
      boldCheckbox.disabled = true;
      boldCheckbox.checked = false;
      italicCheckbox.disabled = true;
      italicCheckbox.checked = false;
      underlineCheckbox.disabled = true;
      underlineCheckbox.checked = false;
      criacaoTagPersonalizada();
      break;
    case "91":
      boldCheckbox.disabled = true;
      boldCheckbox.checked = false;
      italicCheckbox.disabled = true;
      italicCheckbox.checked = false;
      underlineCheckbox.disabled = true;
      underlineCheckbox.checked = false;
      criacaoTagPersonalizadaAnimada();
      break;
    case "config":
      boldCheckbox.disabled = true;
      boldCheckbox.checked = true;
      italicCheckbox.disabled = true;
      italicCheckbox.checked = false;
      underlineCheckbox.disabled = true;
      underlineCheckbox.checked = false;
      updateOutputText();
      document.getElementById('labelRgbResult').innerText = "Código resultante";
      document.getElementById('graylabelRgbResult').innerText = "Copie e cole o resultado no arquivo YML.";
    case "itens":
      boldCheckbox.disabled = true;
      boldCheckbox.checked = true;
      underlineCheckbox.disabled = true;
      underlineCheckbox.checked = false;
      updateOutputText();
      document.getElementById('labelRgbResult').innerText = "Código resultante";
      document.getElementById('graylabelRgbResult').innerText = "Copie e cole o resultado no arquivo YML.";
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
  updateOutputText();
}

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

function criacaoTagPersonalizada() {
  document.getElementById('labelRgbResult').innerText = "Resultado da tag";
  document.getElementById('graylabelRgbResult').innerText = "Copie e cole este texto em 'Sua tag personalizada'";
  document.getElementById('quadroNomeDaTag').style.display = 'block';
  document.getElementById('nickname').value = "MinhaTag";
  updateOutputText();
}

function criacaoTagPersonalizadaAnimada() {
  document.getElementById('quadroTextoRgbGerado').style.display = 'none';
  document.getElementById('selecaoQuantidadeCores').style.display = 'none';
  document.getElementById('quadroNomeDaTag').style.display = 'block';
  document.getElementById('quadroCor1').style.display = 'block';
  document.getElementById('quadroCor2').style.display = 'block';
  document.getElementById('nickname').value = "MinhaTag";
  toggleColors(2);
  updateOutputText();
}

// Função para ajustar os campos ao padrão, devido a possibilidade de tags personalizadas
function ajustarCampos() {
  document.getElementById('labelRgbResult').innerText = "Texto RGB";
  document.getElementById('graylabelRgbResult').innerText = "Copie e cole este texto RGB no chat!";
  document.getElementById('quadroTextoRgbGerado').style.display = 'block';
  document.getElementById('selecaoQuantidadeCores').style.display = 'block';
  document.getElementById('quadroNomeDaTag').style.display = 'none';
  document.getElementById('quadroCor1').style.display = 'none';
  document.getElementById('quadroCor2').style.display = 'none';
  // document.getElementById('nickname').value = "Seu texto";
  updateOutputText();
}

function exibirIdentificador() {
  let outputText = document.getElementById('outputTextTag');
  let tagInserida = document.getElementById('nickname').value;

  tagInserida = tagInserida.replace(/[ \[\]]/g, '');

  outputText.innerText = tagInserida;
}

function exibirCoresParaInserir() {
  let labelCorUm = document.getElementById('outputTagColor1');
  let labelCorDois = document.getElementById('outputTagColor2');
  const primeiraCor = document.getElementById("color-1").value;
  const segundaCor = document.getElementById("color-2").value;

  labelCorUm.innerText = primeiraCor.replace('#', '');
  labelCorDois.innerText = segundaCor.replace('#', '');
}