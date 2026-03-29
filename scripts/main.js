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
var paused = false; // Добавлено: переменная состояния паузы

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
  paused = false; // Сбрасываем паузу при начале новой игры
}

function gameLoop(ts) {
  var dt = lastTs ? Math.min((ts - lastTs) / 1000, 0.1) : 0;
  lastTs = ts;
  window.frameDt = dt;

  if (canvas && ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Логика таймера (работает только если игра идет и не на паузе)
    if (gameState === "playing" && !paused) {
      window.roundTimeLeft -= dt;
      if (window.roundTimeLeft <= 0) {
        window.roundTimeLeft = 0;
        gameState = "gameover";
      }
    }

    // Логика обновлений (физика, враги) (работает только если игра идет и не на паузе)
    if (gameState === "playing" && !paused) {
      updatePlayer();
      updateEnemies();
      checkCollisions();
    }

    // Отрисовка (работает всегда, даже на паузе)
    drawPlayer();
    drawEnemies();
    drawUI();

    // Отрисовка оверлея паузы
    if (paused && gameState === "playing") {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 48px Arial";
      ctx.textAlign = "center";
      ctx.fillText("ПАУЗА", canvas.width / 2, canvas.height / 2);
      
      ctx.font = "20px Arial";
      ctx.fillText("Нажми P для продолжения", canvas.width / 2, canvas.height / 2 + 40);
    }
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
    if (e.code === "KeyP") {
      if (gameState === "playing") {
        paused = !paused;
      }
    }

    if (e.code === "Enter") {
      if (gameState === "menu" || gameState === "gameover") {
        gameState = "playing";
        initGame();
        if (typeof tossCoins === "function") {
          tossCoins();
        }
      }
    }
    if (e.code === "Space" && gameState === "playing" && !paused) { // Не стрелять на паузе
      e.preventDefault();
      if (typeof tossCoins === "function") {
        tossCoins();
      }
    }
    if (e.code === "KeyB" && gameState === "playing" && !paused) { // Не открывать магазин на паузе
      window.shopOpen = !window.shopOpen;
    }
    if (window.shopOpen && gameState === "playing" && !paused) {
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