/*
 * ============================================================================
 * ИНСТРУКЦИЯ ДЛЯ УЧЕНИКА
 * ============================================================================
 *
 * Что делает этот файл
 * ---------------------
 * Игровые деньги, уровни улучшений (монета / время / пистолет) и функции покупки.
 * Здесь же можно считать множитель награды за попадание и сколько монет подбрасывать.
 *
 * Что нужно реализовать
 * ---------------------
 * Ограничь уровни: монета до 5, время до 3, пистолет до 10. Реализуй трату money
 * при покупке. Свяжи getRoundSeconds() с улучшением времени (+10 сек за уровень).
 * Свяжи getMoneyPerHit() и getCoinTossCount() с соответствующими апгрейдами.
 *
 * Что написать в Cursor (Ctrl+K)
 * -----------------------------
 * «В upgrades.js добавь цены апгрейдов из GAME_CONFIG, функции buyCoinUpgrade,
 * buyTimeUpgrade, buyPistolUpgrade с проверкой money и лимитов уровней.»
 *
 * ============================================================================
 */

(function () {
  "use strict";

  var cfg = window.GAME_CONFIG;

  window.money = 0;

  window.coinUpgradeLevel = 0;
  window.timeUpgradeLevel = 0;
  window.pistolUpgradeLevel = 0;

  window.getMoneyPerHit = function () {
    return cfg.baseMoneyPerHit * (1 + window.pistolUpgradeLevel);
  };

  window.getCoinTossCount = function () {
    return cfg.baseCoinsTossed + window.coinUpgradeLevel;
  };

  window.getRoundSeconds = function () {
    return cfg.baseRoundSeconds + window.timeUpgradeLevel * cfg.secondsPerTimeUpgrade;
  };

  window.tryBuyCoinUpgrade = function () {
    if (window.coinUpgradeLevel >= cfg.maxCoinUpgradeLevel) return false;
    var price = 50 * (window.coinUpgradeLevel + 1);
    if (window.money < price) return false;
    window.money -= price;
    window.coinUpgradeLevel += 1;
    return true;
  };

  window.tryBuyTimeUpgrade = function () {
    if (window.timeUpgradeLevel >= cfg.maxTimeUpgradeLevel) return false;
    var price = 40 * (window.timeUpgradeLevel + 1);
    if (window.money < price) return false;
    window.money -= price;
    window.timeUpgradeLevel += 1;
    return true;
  };

  window.tryBuyPistolUpgrade = function () {
    if (window.pistolUpgradeLevel >= cfg.maxPistolUpgradeLevel) return false;
    var price = 30 * (window.pistolUpgradeLevel + 1);
    if (window.money < price) return false;
    window.money -= price;
    window.pistolUpgradeLevel += 1;
    return true;
  };

  window.addMoney = function (amount) {
    window.money += amount;
  };
})();
