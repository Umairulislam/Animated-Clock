// DOM Elements
const borderColor = document.getElementById("border-color")
const faceColor = document.getElementById("face-color")
const bigTicksColor = document.getElementById("big-ticks-color")
const smallTicksColor = document.getElementById("small-ticks-color")
const hourHandColor = document.getElementById("hour-hand-color")
const minHandColor = document.getElementById("min-hand-color")
const secHandColor = document.getElementById("sec-hand-color")
const colorInput = document.querySelectorAll("input[type='color']")
const downloadBtn = document.getElementById("download-btn")

// Get the refrence to the canvas and its context
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

// Set the center and radius of the clock
const centerX = canvas.width / 2
const centerY = canvas.height / 2
const radius = canvas.width / 2 - 50

// Function to draw the clock
function drawClock() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Get the current time
  const now = new Date()
  const hour = now.getHours()
  const min = now.getMinutes()
  const sec = now.getSeconds()

  // Draw the clock border and face
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
  ctx.lineWidth = 10
  ctx.strokeStyle = borderColor.value
  ctx.stroke()
  ctx.fillStyle = faceColor.value
  ctx.fill()

  // Draw the ticks
  for (let i = 0; i < 60; i++) {
    ctx.beginPath()
    ctx.lineWidth = i % 5 === 0 ? 4 : 2
    ctx.strokeStyle = i % 5 === 0 ? bigTicksColor.value : smallTicksColor.value

    // Set starting point
    ctx.moveTo(
      centerX + radius * 0.9 * Math.sin((Math.PI / 30) * i),
      centerY - radius * 0.9 * Math.cos((Math.PI / 30) * i)
    )
    // Set ending point
    if (i % 5 === 0) {
      // Big ticks
      ctx.lineTo(
        centerX + radius * Math.sin((Math.PI / 30) * i),
        centerY - radius * Math.cos((Math.PI / 30) * i)
      )
    } else {
      // Small ticks
      ctx.lineTo(
        centerX + radius * 0.95 * Math.sin((Math.PI / 30) * i),
        centerY - radius * 0.95 * Math.cos((Math.PI / 30) * i)
      )
    }
    ctx.stroke()
  }

  // Draw the center of the clock
  ctx.beginPath()
  ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI)
  ctx.fillStyle = secHandColor.value
  ctx.fill()

  // Draw the hour hand
  ctx.beginPath()
  ctx.lineWidth = 6
  ctx.strokeStyle = hourHandColor.value
  ctx.moveTo(centerX, centerY)
  ctx.lineTo(
    centerX + radius * 0.5 * Math.sin((Math.PI / 6) * (hour + min / 60)),
    centerY - radius * 0.5 * Math.cos((Math.PI / 6) * (hour + min / 60))
  )
  ctx.stroke()

  // Draw the minute hand
  ctx.beginPath()
  ctx.lineWidth = 4
  ctx.strokeStyle = minHandColor.value
  ctx.moveTo(centerX, centerY)
  ctx.lineTo(
    centerX + radius * 0.75 * Math.sin((Math.PI / 30) * (min + sec / 60)),
    centerY - radius * 0.75 * Math.cos((Math.PI / 30) * (min + sec / 60))
  )
  ctx.stroke()

  // Draw the second hand
  ctx.beginPath()
  ctx.lineWidth = 2
  ctx.strokeStyle = secHandColor.value
  ctx.moveTo(centerX, centerY)
  ctx.lineTo(
    centerX + radius * 0.85 * Math.sin((Math.PI / 30) * sec),
    centerY - radius * 0.85 * Math.cos((Math.PI / 30) * sec)
  )
  ctx.stroke()

  // Request the next frame
  requestAnimationFrame(drawClock)
}
drawClock()

// Function to save the colors to local storage
function saveColors() {
  colorInput.forEach((input) => {
    localStorage.setItem(input.id, input.value)
  })
}

// Function to load the colors from local storage
function loadColors() {
  colorInput.forEach((input) => {
    input.value = localStorage.getItem(input.id) || input.value
  })
}

// Function to download the image of the clock
function downloadImg() {
  const dataURL = canvas.toDataURL("image/png")
  const a = document.createElement("a")
  a.href = dataURL
  a.download = "clock.png"
  a.click()
}

// Event Listeners
colorInput.forEach((input) => {
  input.addEventListener("input", saveColors)
})
window.addEventListener("load", loadColors)
downloadBtn.addEventListener("click", downloadImg)
