"use strict";

const combinations = require("./domain/combinations");

/**
 * @name getReinforcementCount
 * @param {String} army
 * @param {Card[]} cards
 * @param {Object<String, Region>} world
 * @return {Number}
 */
const getReinforcementCount =
  (army, cards, world) => {

  };

module.exports = getReinforcementCount;

/**
 * @typedef Card
 * @property {String} region
 * @property {cannon|soldier|cavalier} type
 */

/**
 * @typedef Region
 * @property {String} army
 */
