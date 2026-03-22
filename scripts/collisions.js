/*
 * ============================================================================
 * ИНСТРУКЦИЯ ДЛЯ Кристиана
 * ============================================================================
 *
 * Что делает этот файл
 * ---------------------
 * Проверка пересечения пуль (window.bullets) и монет (window.coins). При попадании
 * начисляются деньги через upgrades.js и увеличивается счёт в main.js.
 *
 * Что нужно реализовать
 * ---------------------
 * Замени круг-круг на более точную форму при необходимости, добавь эффект
 * вспышки или звук. Учитывай множитель пистолета через getMoneyPerHit().
 *
 * Что написать в Cursor (Ctrl+K)
 * -----------------------------
 * «В collisions.js при попадании пули в монету вызови addMoney с учётом
 * getMoneyPerHit(), удали пулю и монету, и увеличь глобальный score на 1.»
 *
 * ============================================================================
 */

(function () {
  "use strict";

  function dist2(ax, ay, bx, by) {
    var dx = ax - bx;
    var dy = ay - by;
    return dx * dx + dy * dy;
  }

  window.checkCollisions = function () {
    if (typeof gameState !== "undefined" && gameState !== "playing") return;

    var perHit =
      typeof window.getMoneyPerHit === "function" ? window.getMoneyPerHit() : 10;

    for (var i = window.bullets.length - 1; i >= 0; i--) {
      var b = window.bullets[i];
      for (var j = window.coins.length - 1; j >= 0; j--) {
        var coin = window.coins[j];
        if (!coin.active) continue;
        var r = b.r + coin.r;
        if (dist2(b.x, b.y, coin.x, coin.y) <= r * r) {
          window.bullets.splice(i, 1);
          coin.active = false;
          window.coins.splice(j, 1);
          if (typeof window.addMoney === "function") {
            window.addMoney(perHit);
          }
          if (typeof score !== "undefined") {
            score += 1;
          }
          break;
        }
      }
    }
  };
})();
