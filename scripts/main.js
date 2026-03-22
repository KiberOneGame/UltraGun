/*
 * ============================================================================
 * ИНСТРУКЦИЯ ДЛЯ Алтынай
 * ============================================================================
 *
 * Что делает этот файл
 * ---------------------
 * Ядро игры: получение canvas и контекста, глобальные переменные, цикл
 * requestAnimationFrame, порядок вызовов update/draw и обработка смены состояний
 * (меню, игра, конец раунда).
 *
 * Что нужно реализовать
 * ---------------------
 * Добавь паузу, звуки, сохранение лучшего результата в localStorage, экран
 * настроек. Следи, чтобы frameDt выставлялся до update-функций, использующих dt.
 *
 * Что написать в Cursor (Ctrl+K)
 * -----------------------------
 * «В main.js добавь состояние paused и обработку клавиши P: при паузе не
 * вызывай update, но продолжай рисовать UI с надписью Пауза.»
 *
 * ============================================================================
 */

var canvas;
var ctx;
var score = 0;
var gameState = "menu";

window.roundTimeLeft = 0;

var lastTs = 0;

function initGame() {
  score = 0;
  window.bullets = [];
  window.coins = [];
  window.roundTimeLeft =
    typeof window.getRoundSeconds === "function" ? window.getRoundSeconds() : 30;
  if (typeof window.shopOpen !== "undefined") {
    window.shopOpen = false;
  }
}

function gameLoop(ts) {
  var dt = lastTs ? Math.min((ts - lastTs) / 1000, 0.1) : 0;
  lastTs = ts;
  window.frameDt = dt;

  if (canvas && ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === "playing") {
      window.roundTimeLeft -= dt;
      if (window.roundTimeLeft <= 0) {
        window.roundTimeLeft = 0;
        gameState = "gameover";
      }
    }

    if (gameState === "playing") {
      updatePlayer();
      updateEnemies();
      checkCollisions();
    }

    drawPlayer();
    drawEnemies();
    drawUI();
  }

  requestAnimationFrame(gameLoop);
}

document.addEventListener("DOMContentLoaded", function () {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  if (typeof initInput === "function") {
    initInput();
  }
  initGame();

  document.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      if (gameState === "menu" || gameState === "gameover") {
        gameState = "playing";
        initGame();
        if (typeof tossCoins === "function") {
          tossCoins();
        }
      }
    }
    if (e.code === "Space" && gameState === "playing") {
      e.preventDefault();
      if (typeof tossCoins === "function") {
        tossCoins();
      }
    }
    if (e.code === "KeyB" && gameState === "playing") {
      window.shopOpen = !window.shopOpen;
    }
    if (window.shopOpen && gameState === "playing") {
      if (e.code === "Digit1" && typeof window.tryBuyCoinUpgrade === "function") {
        window.tryBuyCoinUpgrade();
      }
      if (e.code === "Digit2" && typeof window.tryBuyTimeUpgrade === "function") {
        window.tryBuyTimeUpgrade();
      }
      if (e.code === "Digit3" && typeof window.tryBuyPistolUpgrade === "function") {
        window.tryBuyPistolUpgrade();
      }
    }
  });

  requestAnimationFrame(gameLoop);
});
