/*
 * ============================================================================
 * ИНСТРУКЦИЯ ДЛЯ Киры
 * Что делает этот файл
 * ---------------------
 * Слушает клавиатуру и мышь, сохраняет состояние в простых переменных на window,
 * чтобы player.js и ui.js могли читать нажатия без дублирования addEventListener.
 *
 * Что нужно реализовать
 * ---------------------
 * Вызови initInput() один раз при старте игры (уже вызывается из main.js).
 * Добавь обработку нужных клавиш (пробел, WASD, открытие магазина и т.д.).
 * Обновляй mouseX, mouseY относительно canvas, если нужен прицел.
 *
 * Что написать в Cursor (Ctrl+K)
 * -----------------------------
 * «В input.js добавь отслеживание координат мыши внутри canvas и флаг
 * isMouseDown, а также объект keys с булевыми значениями для Space и KeyB.»
 *
 * ============================================================================
 */

(function () {
  "use strict";

  window.keys = {};
  window.mouseX = 0;
  window.mouseY = 0;
  window.isMouseDown = false;

  window.initInput = function () {
    window.addEventListener("keydown", function (e) {
      window.keys[e.code] = true;
    });
    window.addEventListener("keyup", function (e) {
      window.keys[e.code] = false;
    });
    window.addEventListener("mousedown", function () {
      window.isMouseDown = true;
    });
    window.addEventListener("mouseup", function () {
      window.isMouseDown = false;
    });
    window.addEventListener("mousemove", function (e) {
      window.mouseX = e.clientX;
      window.mouseY = e.clientY;
    });
  };
})();
