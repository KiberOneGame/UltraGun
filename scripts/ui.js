/*
 * ============================================================================
 * ИНСТРУКЦИЯ ДЛЯ Ярика
 * ============================================================================
 *
 * Что делает этот файл
 * ---------------------
 * Отрисовка интерфейса на canvas: деньги, таймер раунда, счёт, подсказки по
 * управлению, экран магазина (апгрейды монеты, времени, пистолета).
 *
 * Что нужно реализовать
 * ---------------------
 * Сделай красивые панели, иконки, прогресс-бары уровней апгрейдов. Добавь
 * переключение магазина по клавише и кнопки-покупки с отображением цены.
 *
 * Что написать в Cursor (Ctrl+K)
 * -----------------------------
 * «В ui.js нарисуй оверлей магазина: три строки апгрейда с ценой и уровнем,
 * обработай клики по кнопкам или горячие клавиши 1/2/3 для покупки.»
 *
 * ============================================================================
 */

(function () {
  "use strict";

  var cfg = window.GAME_CONFIG;

  window.shopOpen = false;

  window.drawUI = function () {
    if (typeof ctx === "undefined" || !ctx) return;

    ctx.save();
    ctx.font = "16px Segoe UI, system-ui, sans-serif";
    ctx.fillStyle = "#e6edf3";
    ctx.textAlign = "left";
    ctx.fillText("Деньги: " + (typeof window.money === "number" ? window.money : 0), 16, 28);
    ctx.fillText("Попадания (score): " + (typeof score !== "undefined" ? score : 0), 16, 50);

    if (typeof window.roundTimeLeft === "number") {
      ctx.fillText("Время: " + Math.max(0, window.roundTimeLeft).toFixed(1) + " c", 16, 72);
    }

    ctx.fillStyle = "#8b949e";
    ctx.font = "13px Segoe UI, system-ui, sans-serif";
    ctx.fillText("ЛКМ — стрельба | Пробел — подброс монет | B — магазин | 1/2/3 — покупка", 16, cfg.canvasHeight - 14);

    if (window.shopOpen) {
      ctx.fillStyle = "rgba(1, 4, 9, 0.75)";
      ctx.fillRect(0, 0, cfg.canvasWidth, cfg.canvasHeight);
      ctx.fillStyle = "#e6edf3";
      ctx.font = "bold 22px Segoe UI, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Магазин улучшений", cfg.canvasWidth / 2, 120);
      ctx.font = "15px Segoe UI, system-ui, sans-serif";
      ctx.textAlign = "left";
      var y = 170;
      ctx.fillText(
        "1 — Монета (ур. " +
          window.coinUpgradeLevel +
          "/" +
          cfg.maxCoinUpgradeLevel +
          "): больше монет за бросок",
        120,
        y
      );
      ctx.fillText(
        "2 — Время (ур. " +
          window.timeUpgradeLevel +
          "/" +
          cfg.maxTimeUpgradeLevel +
          "): +10 c за уровень",
        120,
        y + 32
      );
      ctx.fillText(
        "3 — Пистолет (ур. " +
          window.pistolUpgradeLevel +
          "/" +
          cfg.maxPistolUpgradeLevel +
          "): больше денег за попадание",
        120,
        y + 64
      );
      ctx.fillStyle = "#58a6ff";
      ctx.textAlign = "center";
      ctx.fillText("Закройте магазин клавишей B", cfg.canvasWidth / 2, cfg.canvasHeight - 80);
    }

    if (typeof gameState !== "undefined" && gameState === "menu") {
      ctx.fillStyle = "rgba(1, 4, 9, 0.6)";
      ctx.fillRect(0, 0, cfg.canvasWidth, cfg.canvasHeight);
      ctx.fillStyle = "#e6edf3";
      ctx.font = "bold 28px Segoe UI, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("UltraGun — Product Lab", cfg.canvasWidth / 2, cfg.canvasHeight / 2 - 24);
      ctx.font = "16px Segoe UI, system-ui, sans-serif";
      ctx.fillText("Нажмите Enter, чтобы начать", cfg.canvasWidth / 2, cfg.canvasHeight / 2 + 16);
    }

    if (typeof gameState !== "undefined" && gameState === "gameover") {
      ctx.fillStyle = "rgba(1, 4, 9, 0.65)";
      ctx.fillRect(0, 0, cfg.canvasWidth, cfg.canvasHeight);
      ctx.fillStyle = "#f85149";
      ctx.font = "bold 26px Segoe UI, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Раунд окончен", cfg.canvasWidth / 2, cfg.canvasHeight / 2 - 16);
      ctx.fillStyle = "#e6edf3";
      ctx.font = "16px Segoe UI, system-ui, sans-serif";
      ctx.fillText("Enter — новый раунд", cfg.canvasWidth / 2, cfg.canvasHeight / 2 + 20);
    }

    ctx.restore();
  };
})();
