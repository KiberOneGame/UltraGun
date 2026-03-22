/*
 * ============================================================================
 * ИНСТРУКЦИЯ ДЛЯ УЧЕНИКА
 * ============================================================================
 *
 * Что делает этот файл
 * ---------------------
 * Пистолет в правой руке: позиция, выстрелы (массив пуль), перезарядка.
 * updatePlayer двигает пули; drawPlayer рисует оружие и снаряды на canvas.
 *
 * Что нужно реализовать
 * ---------------------
 * Добавь прицеливание по мыши, анимацию отдачи, разные типы пуль после апгрейда
 * пистолета. Храни пули в window.bullets, чтобы collisions.js мог их проверять.
 *
 * Что написать в Cursor (Ctrl+K)
 * -----------------------------
 * «В player.js сделай стрельбу по клику мыши внутри canvas: пуля летит в сторону
 * курсора, ограничь скорострельность cooldown в миллисекундах.»
 *
 * ============================================================================
 */

(function () {
  "use strict";

  var cfg = window.GAME_CONFIG;

  window.bullets = [];

  var gun = {
    x: cfg.canvasWidth - 80,
    y: cfg.canvasHeight - 100,
    cooldownMs: 0
  };

  var lastShotTime = 0;

  function spawnBullet(targetX, targetY) {
    var dx = targetX - gun.x;
    var dy = targetY - gun.y;
    var len = Math.sqrt(dx * dx + dy * dy) || 1;
    var speed = 720;
    window.bullets.push({
      x: gun.x,
      y: gun.y,
      vx: (dx / len) * speed,
      vy: (dy / len) * speed,
      r: 4
    });
  }

  window.updatePlayer = function () {
    var dt = typeof window.frameDt === "number" ? window.frameDt : 0;
    gun.cooldownMs = Math.max(0, gun.cooldownMs - dt * 1000);

    if (typeof gameState !== "undefined" && gameState !== "playing") return;

    if (window.isMouseDown && gun.cooldownMs <= 0) {
      var now = performance.now();
      if (now - lastShotTime > 120) {
        lastShotTime = now;
        gun.cooldownMs = 150;
        var tx = window.mouseX;
        var ty = window.mouseY;
        if (typeof canvas !== "undefined" && canvas) {
          var rect = canvas.getBoundingClientRect();
          tx = window.mouseX - rect.left;
          ty = window.mouseY - rect.top;
        }
        spawnBullet(tx, ty);
      }
    }

    for (var i = window.bullets.length - 1; i >= 0; i--) {
      var b = window.bullets[i];
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      if (b.x < -20 || b.x > cfg.canvasWidth + 20 || b.y < -20 || b.y > cfg.canvasHeight + 20) {
        window.bullets.splice(i, 1);
      }
    }
  };

  window.drawPlayer = function () {
    if (typeof ctx === "undefined" || !ctx) return;
    ctx.save();
    ctx.fillStyle = "#30363d";
    ctx.strokeStyle = "#58a6ff";
    ctx.lineWidth = 2;
    ctx.fillRect(gun.x - 24, gun.y - 12, 48, 24);
    ctx.strokeRect(gun.x - 24, gun.y - 12, 48, 24);
    ctx.fillStyle = "#8b949e";
    ctx.beginPath();
    ctx.arc(gun.x + 28, gun.y, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "#f0883e";
    for (var j = 0; j < window.bullets.length; j++) {
      var bullet = window.bullets[j];
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, bullet.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  };
})();
