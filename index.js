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
    if (!army) {
      throw new Error("Invalid reinforcement request: must specify the army.");
    }

    if (!cards || cards.length !== 3) {
      throw new Error("Invalid reinforcement request: must exchange exactly three cards.");
    }

    if (!world) {
      throw new Error("Invalid reinforcement request: must pass the current world map.");
    }

    let result = 0;

    if (cards.every(isCannon)) {
      result = combinations.get("cannon");
    }

    if (cards.every(isSoldier)) {
      result = combinations.get("soldier");
    }

    if (cards.every(isCavalier)) {
      result = combinations.get("cavalier");
    }

    if (cards.find(isCannon) && cards.find(isSoldier) && cards.find(isCavalier)) {
      result = combinations.get("three-different");
    }

    if (cards.filter(isNotJolly).length === 1) {
      return 0;
    }

    if (cards.find(isJolly) && (cards.filter(isNotJolly).every(isCannon) || cards.filter(isNotJolly).every(isSoldier) || cards.filter(isNotJolly).every(isCavalier))) {
      result = combinations.get("two-equal-one-jolly");
    }

    if (result !== 0) {
      for (let index = 0; index < cards.length; index++) {
        if (world[cards[index].region] && world[cards[index].region].army === army) {
          result += 2;
        }
      }
    }

    return result;
  };

module.exports = getReinforcementCount;

const isCannon =
  (card) => {
    return card.type === "cannon";
  };

const isSoldier =
  (card) => {
    return card.type === "soldier";
  };

const isCavalier =
  (card) => {
    return card.type === "cavalier";
  };

const isJolly =
  (card) => {
    return card.type === "jolly";
  };

const isNotJolly =
  (card) => {
    return card.type !== "jolly";
  };

/**
 * @typedef Card
 * @property {String} region
 * @property {cannon|soldier|cavalier} type
 */

/**
 * @typedef Region
 * @property {String} army
 */
