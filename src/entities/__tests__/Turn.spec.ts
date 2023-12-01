import { Game } from "../../validators/game";
import { Turn } from "../Turn";

const mock1: Game = {
  jogador: 1,
  mao: ["3-6", "5-5", "1-2", "0-0", "0-4", "1-6"],
  mesa: [],
  jogadas: [],
};

const mock2: Game = {
  jogador: 1,
  mao: ["3-6", "5-5", "1-2", "0-0", "0-4", "1-6"],
  mesa: ["1-6", "6-6", "6-4", "4-4"],
  jogadas: [
    {
      jogador: 0,
      pedra: "6-6",
    },
    {
      jogador: 1,
      pedra: "1-6",
    },
    {
      jogador: 2,
      pedra: "6-4",
    },
    {
      jogador: 0,
      pedra: "4-4",
    },
  ],
};

const mock3: Game = {
  jogador: 1,
  mao: ["3-6"],
  mesa: ["4-4"],
  jogadas: [
    {
      jogador: 0,
      pedra: "4-4",
    },
  ],
};

describe("Turn tests", () => {
  it("should have an action", () => {
    const turn = Turn.create(mock1);

    expect(turn.nextAction).toBeNull();

    const action = turn.generateNextAction();

    expect(action).toStrictEqual({
      lado: "esquerda",
      pedra: "0-0",
    });
    expect(turn.id).toBe(1);
    expect(turn.nextAction).toStrictEqual({
      lado: "esquerda",
      pedra: "0-0",
    });
    expect(turn.occurrences).toStrictEqual({
      "0": 1003,
      "1": 2,
      "2": 1,
      "3": 1,
      "4": 1,
      "5": 1002,
      "6": 2,
    });
    expect(turn.possibleActions).toStrictEqual([
      { lado: "esquerda", pedra: "3-6" },
      { lado: "esquerda", pedra: "5-5" },
      { lado: "esquerda", pedra: "1-2" },
      { lado: "esquerda", pedra: "0-0" },
      { lado: "esquerda", pedra: "0-4" },
      { lado: "esquerda", pedra: "1-6" },
    ]);
  });

  it("should have another action", () => {
    const turn = Turn.create(mock2);

    expect(turn.nextAction).toBeNull();

    const action = turn.generateNextAction();

    expect(action).toStrictEqual({
      lado: "esquerda",
      pedra: "1-6",
    });
    expect(turn.id).toBe(5);
    expect(turn.nextAction).toStrictEqual({
      lado: "esquerda",
      pedra: "1-6",
    });
    expect(turn.occurrences).toStrictEqual({
      "0": 1,
      "1": 3,
      "2": 1,
      "3": 0,
      "4": 4,
      "5": 0,
      "6": 5,
    });
    expect(turn.possibleActions).toStrictEqual([
      { lado: "esquerda", pedra: "1-2" },
      { lado: "direita", pedra: "0-4" },
      { lado: "esquerda", pedra: "1-6" },
    ]);
  });

  it("should have a null action", () => {
    const turn = Turn.create(mock3);

    expect(turn.nextAction).toBeNull();

    const action = turn.generateNextAction();

    expect(action).toBeNull();
    expect(turn.id).toBe(2);
    expect(turn.nextAction).toBeNull();
    expect(turn.occurrences).toStrictEqual({
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
    });
    expect(turn.possibleActions).toStrictEqual([]);
  });
});
