/*
 * ============================================================================
 * ИНСТРУКЦИЯ ДЛЯ Артема
 * ============================================================================
 *
 * Что делает этот файл
 * ---------------------
 * «Враги» здесь — это монеты в полёте: бросок слева, гравитация, отрисовка.
 * Апгрейд монеты увеличивает число одновременно подброшенных монет.
 *
 * Что нужно реализовать
 * ---------------------
 * Сделай красивую анимацию вращения, след от монеты, случайный разброс по X.
 * Вызов подброса можно повесить на клавишу или таймер — главное, чтобы
 * getCoinTossCount() из upgrades.js влияло на количество монет за бросок.
 *
 * Что написать в Cursor (Ctrl+K)
 * -----------------------------
 * «В enemies.js добавь функцию tossCoins(), которая создаёт столько монет,
 * сколько возвращает getCoinTossCount(), с разными начальными vx и vy.»
 *
 * ============================================================================
 */

(function () {
  "use strict";

  var cfg = window.GAME_CONFIG;

  window.coins = [];

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  window.tossCoins = function () {
    var count = typeof window.getCoinTossCount === "function" ? window.getCoinTossCount() : 1;
    for (var c = 0; c < count; c++) {
      window.coins.push({
        x: 80 + c * 18,
        y: cfg.canvasHeight - 140,
        vx: rand(-80, 80),
        vy: rand(cfg.coinTossMinVy, cfg.coinTossMaxVy),
        r: 18,
        active: true
      });
    }
  };

  window.updateEnemies = function () {
    var dt = typeof window.frameDt === "number" ? window.frameDt : 0;
    if (typeof gameState !== "undefined" && gameState !== "playing") return;

    for (var i = window.coins.length - 1; i >= 0; i--) {
      var coin = window.coins[i];
      if (!coin.active) continue;
      coin.vy += cfg.gravity * dt;
      coin.x += coin.vx * dt;
      coin.y += coin.vy * dt;
      if (coin.y > cfg.canvasHeight + 40) {
        window.coins.splice(i, 1);
      }
    }
  };

  window.drawEnemies = function () {
    if (typeof ctx === "undefined" || !ctx) return;
    ctx.save();
    ctx.strokeStyle = "#d4a017";
    ctx.fillStyle = "rgba(212, 160, 23, 0.25)";
    ctx.lineWidth = 3;
    for (var i = 0; i < window.coins.length; i++) {
      var coin = window.coins[i];
      if (!coin.active) continue;
      ctx.beginPath();
      ctx.arc(coin.x, coin.y, coin.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#e3b341";
      ctx.beginPath();
      ctx.arc(coin.x - 4, coin.y - 4, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(212, 160, 23, 0.25)";
    }
    ctx.restore();
  };
})();
