let container = document.querySelector('.container-colors')

function hexToDecimal(hex) {
  return parseInt(hex.replace('#', ''), 16)
}

function decimalToHexColor(decimal) {
  return decimal.toString(16).toUpperCase().padStart(6, '0').padStart(7, '#')
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

function getDarkenessHex(color, coeficiente = '#0A0A0A') {
  let result = hexToDecimal(color) - hexToDecimal(coeficiente)
  return decimalToHexColor(result)
}

function getLightnessHex(color, coeficiente = '#0A0A0A') {
  let result = hexToDecimal(color) + hexToDecimal(coeficiente)
  return decimalToHexColor(result)
}

function putColorToContainer(hex) {
  let rgb = hexToRgb(hex)
  let textColor = rgb.r + rgb.g + rgb.b < 500 ? 'white' : '#212121'
  let box = document.createElement('div')
  box.className = 'box'
  box.style = `background: ${hex}; color: ${textColor}`
  box.innerHTML = hex
  container.appendChild(box)
}

function canDarkeness(color, coeficiente = '#0A0A0A') {
  let colorRGB = hexToRgb(color)
  let coefRGB = hexToRgb(coeficiente)
  if (
    colorRGB.r - coefRGB.r < 0 ||
    colorRGB.g - coefRGB.g < 0 ||
    colorRGB.b - coefRGB.b < 0
  ) {
    return false
  }

  return true
}

function canLightness(color, coeficiente = '#0A0A0A') {
  let colorRGB = hexToRgb(color)
  let coefRGB = hexToRgb(coeficiente)
  if (
    colorRGB.r + coefRGB.r > 255 ||
    colorRGB.g + coefRGB.g > 255 ||
    colorRGB.b + coefRGB.b > 255
  ) {
    return false
  }

  return true
}

function generateDarkenColors(lightColor, qtd = 10) {
  let color = lightColor
  putColorToContainer(color)
  for (qtd; qtd > 0; qtd--) {
    color = getDarkenessHex(color)
    console.log(color)
    if (!canDarkeness(color)) {
      putColorToContainer(color)
      break
    } else {
      putColorToContainer(color)
    }
  }
}

function generateDarken() {
  document.querySelectorAll('.box').forEach((item) => {
    item.remove()
  })
  let color = document.querySelector('#input-color').value
  let qtd = 10
  // let qtd = parseInt(document.querySelector('#input-qtd').value)

  generateDarkenColors(color, qtd)
}
