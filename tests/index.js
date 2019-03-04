/* eslint-env jest */

"use strict";

const getReinforcement = require("../index.js");

function card (region, type) {
  return {
    region,
    type,
  };
}

describe("invalid request", () => {
  it("throws", () => {
    expect(
      function () {
        getReinforcement();
      }
    ).toThrow("Invalid reinforcement request: must specify the army.");
  });

  it("throws / 2", () => {
    expect(
      function () {
        getReinforcement("Blue");
      }
    ).toThrow("Invalid reinforcement request: must exchange exactly three cards.");
  });

  it("throws / 3", () => {
    expect(
      function () {
        getReinforcement("Blue", [card("japan", "soldier")]);
      }
    ).toThrow("Invalid reinforcement request: must exchange exactly three cards.");
  });

  it("throws / 4", () => {
    expect(
      function () {
        getReinforcement("Blue", [
          card("japan", "soldier"),
          card("siam", "cannon"),
          card("egypt", "soldier"),
          card("ontario", "cavalier"),
        ]);
      }
    ).toThrow("Invalid reinforcement request: must exchange exactly three cards.");
  });

  it("throws / 5", () => {
    expect(
      function () {
        getReinforcement("Blue", [
          card("japan", "soldier"),
          card("siam", "cannon"),
          card("egypt", "soldier"),
        ]);
      }
    ).toThrow("Invalid reinforcement request: must pass the current world map.");
  });
});

describe("possible combinations", () => {
  const smallWorld = {
    china: { army: "Blue" },
    egypt: { army: "Black" },
    island: { army: "Blue" },
    japan: { army: "Red" },
    ontario: { army: "Red" },
    peru: { army: "Violet" },
    siam: { army: "Blue" },
  };

  it("returns 0", () => {
    expect(
      getReinforcement("Blue", [
        card("japan", "soldier"),
        card("peru", "cannon"),
        card("egypt", "soldier"),
      ], smallWorld)
    ).toBe(0);
  });

  it("returns 0 / ignores controlled regions (siam)", () => {
    expect(
      getReinforcement("Blue", [
        card("japan", "soldier"),
        card("siam", "cannon"),
        card("egypt", "soldier"),
      ], smallWorld)
    ).toBe(0);
  });

  it("returns 4 when cards are all cannon", () => {
    expect(
      getReinforcement("Blue", [
        card("japan", "cannon"),
        card("peru", "cannon"),
        card("egypt", "cannon"),
      ], smallWorld)
    ).toBe(4);
  });

  it("returns 4 when cards are all cannon + 2 for each controlled region", () => {
    expect(
      getReinforcement("Blue", [
        card("japan", "cannon"),
        card("peru", "cannon"),
        card("siam", "cannon"),
      ], smallWorld)
    ).toBe(6);
  });

  it("returns 4 when cards are all cannon + 2 for each controlled region / 2", () => {
    expect(
      getReinforcement("Blue", [
        card("island", "cannon"),
        card("peru", "cannon"),
        card("siam", "cannon"),
      ], smallWorld)
    ).toBe(8);
  });

  it("returns 6 when cards are all soldier", () => {
    expect(
      getReinforcement("Blue", [
        card("japan", "soldier"),
        card("peru", "soldier"),
        card("egypt", "soldier"),
      ], smallWorld)
    ).toBe(6);
  });

  it("returns 6 when cards are all soldier + 2 for each controlled region", () => {
    expect(
      getReinforcement("Blue", [
        card("japan", "soldier"),
        card("peru", "soldier"),
        card("siam", "soldier"),
      ], smallWorld)
    ).toBe(8);
  });

  it("returns 6 when cards are all soldier + 2 for each controlled region / 2", () => {
    expect(
      getReinforcement("Blue", [
        card("island", "soldier"),
        card("peru", "soldier"),
        card("siam", "soldier"),
      ], smallWorld)
    ).toBe(10);
  });

  it("returns 8 when cards are all cavalier", () => {
    expect(
      getReinforcement("Blue", [
        card("japan", "cavalier"),
        card("peru", "cavalier"),
        card("egypt", "cavalier"),
      ], smallWorld)
    ).toBe(8);
  });

  it("returns 8 when cards are all cavalier + 2 for each controlled region", () => {
    expect(
      getReinforcement("Blue", [
        card("japan", "cavalier"),
        card("peru", "cavalier"),
        card("siam", "cavalier"),
      ], smallWorld)
    ).toBe(10);
  });

  it("returns 8 when cards are all cavalier + 2 for each controlled region / 2", () => {
    expect(
      getReinforcement("Blue", [
        card("island", "cavalier"),
        card("peru", "cavalier"),
        card("siam", "cavalier"),
      ], smallWorld)
    ).toBe(12);
  });

  it("returns 10 when cards are all different", () => {
    expect(
      getReinforcement("Blue", [
        card("japan", "cannon"),
        card("peru", "soldier"),
        card("egypt", "cavalier"),
      ], smallWorld)
    ).toBe(10);
  });

  it("returns 10 when cards are all different + 2 for each controlled region", () => {
    expect(
      getReinforcement("Blue", [
        card("japan", "cannon"),
        card("peru", "soldier"),
        card("siam", "cavalier"),
      ], smallWorld)
    ).toBe(12);
  });

  it("returns 10 when cards are all different + 2 for each controlled region / 2", () => {
    expect(
      getReinforcement("Blue", [
        card("japan", "cannon"),
        card("island", "soldier"),
        card("siam", "cavalier"),
      ], smallWorld)
    ).toBe(14);
  });

  it("returns 12 when there're two cards equals and a jolly", () => {
    expect(
      getReinforcement("Blue", [
        card("peru", "cavalier"),
        card("egypt", "cavalier"),
        card(null, "jolly"),
      ], smallWorld)
    ).toBe(12);
  });

  it("returns 14 when there're two cards equals and a jolly + 2 for the controlled region", () => {
    expect(
      getReinforcement("Blue", [
        card("egypt", "cavalier"),
        card("siam", "cavalier"),
        card(null, "jolly"),
      ], smallWorld)
    ).toBe(14);
  });

  it("returns 0 when there're two jolly", () => {
    expect(
      getReinforcement("Blue", [
        card("peru", "cavalier"),
        card(null, "jolly"),
        card(null, "jolly"),
      ], smallWorld)
    ).toBe(0);
  });
});
