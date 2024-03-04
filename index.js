const score1El = document.querySelector("#score-1")
const score2El = document.querySelector("#score-2")

const btn1_np = document.querySelector("#btn1-np")
const btn1_1p = document.querySelector("#btn1-1p")
const btn1_2p = document.querySelector("#btn1-2p")
const btn1_3p = document.querySelector("#btn1-3p")

const btn2_np = document.querySelector("#btn2-np")
const btn2_1p = document.querySelector("#btn2-1p")
const btn2_2p = document.querySelector("#btn2-2p")
const btn2_3p = document.querySelector("#btn2-3p")

const btnNewGame = document.querySelector("#btn-newgame")

const homeCont = document.querySelector("#home-container")
const guestCont = document.querySelector("#guest-container")

let score1 = 0
let score2 = 0

const btnTimerStart = document.querySelector("#btn-timer-start")
const btnTimerReset = document.querySelector("#btn-timer-reset")
const countdownEl = document.querySelector("#timer")
const timerCont = document.querySelector("#timer-container")

const startingMinutes = 10
let time = (startingMinutes * 60) - 1
let timeRunning = false
let interval


btn1_np.addEventListener("click", function() {
  if (score1 > 0) {
    score1--
    renderScore(score1, score1El)
  }
})

btn1_1p.addEventListener("click", function() {
  score1++
  renderScore(score1, score1El)
})

btn1_2p.addEventListener("click", function() {
  score1 += 2
  renderScore(score1, score1El)
})

btn1_3p.addEventListener("click", function() {
  score1 += 3
  renderScore(score1, score1El)
})

btn2_np.addEventListener("click", function() {
  if (score2 > 0) {
    score2--
    renderScore(score2, score2El)
  }
})

btn2_1p.addEventListener("click", function() {
  score2++
  renderScore(score2, score2El)
})

btn2_2p.addEventListener("click", function() {
  score2 += 2
  renderScore(score2, score2El)
})

btn2_3p.addEventListener("click", function() {
  score2 += 3
  renderScore(score2, score2El)
})

btnNewGame.addEventListener("click", function() {
  score1 = 0
  score2 = 0
  renderScore(score1, score1El)
  renderScore(score2, score2El)
  clearInterval(interval)
  timeRunning = false
  btnTimerStart.textContent = "Start"
  if (timerCont.classList.contains("container-glow")) {
    timerCont.classList.remove("container-glow")
  }
  time = startingMinutes * 60
  updateCountdown()
})

btnTimerStart.addEventListener("click", function() {
  if (timeRunning) {
    clearInterval(interval)
    timeRunning = false
    btnTimerStart.textContent = "Start"
    timerCont.classList.toggle("container-glow")
  } else {
    interval = setInterval(updateCountdown, 1000)
    timeRunning = true
    btnTimerStart.textContent = "Pause"
    timerCont.classList.toggle("container-glow")
  }
})

btnTimerReset.addEventListener("click", function() {
  time = startingMinutes * 60
  updateCountdown()
})


const renderScore = function(score, scoreEl) {
  if (score < 10) {
    scoreEl.textContent = `00${score}`
  } else if (score < 100) {
    scoreEl.textContent = `0${score}`
  } else {
    scoreEl.textContent = score
  }

  renderGlow()
}

const renderGlow = function() {
  if (score1 > score2) {

    if (!homeCont.classList.contains("winner-glow")) {
      homeCont.classList.add("winner-glow")
    }
    
    if (guestCont.classList.contains("winner-glow")) {
      guestCont.classList.remove("winner-glow")
    }

  } else if (score2 > score1) {
    
    if (!guestCont.classList.contains("winner-glow")) {
      guestCont.classList.add("winner-glow")
    }

    if (homeCont.classList.contains("winner-glow")) {
      homeCont.classList.remove("winner-glow")
    }

  } else {
    
    if (homeCont.classList.contains("winner-glow")) {
      homeCont.classList.remove("winner-glow")
    }
    
    if (guestCont.classList.contains("winner-glow")) {
      guestCont.classList.remove("winner-glow")
    }
  }
}

function updateCountdown() {
  let minutes = Math.floor(time / 60)
  let seconds = time % 60

  minutes = minutes < 10 ? `0${minutes}` : minutes
  seconds = seconds < 10 ? `0${seconds}` : seconds

  countdownEl.textContent = `${minutes}:${seconds}`
  time--
}