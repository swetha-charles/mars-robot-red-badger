import { parseInput } from "./parseInput";

describe("parseInput", () => {
  it("should parse input and return board size and robots", () => {
    const testData = "5 3\n1 1 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL";

    const { board, robots } = parseInput(testData);
    expect(board).toEqual({ maxX: 5, maxY: 3, scented: [] });

    expect(robots.length).toEqual(2);
    const firstRobot = robots[0];
    expect(firstRobot).toEqual({
      coord: { x: 1, y: 1 },
      orientation: "E",
      instructions: ["R", "F", "R", "F", "R", "F", "R", "F"],
    });

    const secondRobot = robots[1];
    expect(secondRobot).toEqual({
      coord: { x: 3, y: 2 },
      orientation: "N",
      instructions: [
        "F",
        "R",
        "R",
        "F",
        "L",
        "L",
        "F",
        "F",
        "R",
        "R",
        "F",
        "L",
        "L",
      ],
    });
  });

  describe("error states", () => {
    it("should throw error when board size is greater than 50", () => {
      const testData = "53 53\n1 1 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL"; // board size is 53 x 53

      expect(() => parseInput(testData)).toThrow(
        "Maximum value allowed on the board is 50! Please choose a smaller number"
      );
    });

    it("should throw error when robot starting coordinate is greater than 50", () => {
      const testData = "53 53\n100 1 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL"; // incorrect starting position for first robot

      expect(() => parseInput(testData)).toThrow(
        "Maximum value allowed on the board is 50! Please choose a smaller number"
      );
    });

    it("should throw error when robot orientation is incorrect", () => {
      const testData = "5 3\n1 1 J\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL"; // incorrect starting orientation

      expect(() => parseInput(testData)).toThrow(
        "Invalid orientation. Only N, S, E, W are allowed."
      );
    });

    it("should throw error when robot instructions are incorrect", () => {
      const testData = "5 3\n1 1 E\nRFRFRFRF\n3 2 N\nHOPHOP"; // incorrect instructions for second robot

      expect(() => parseInput(testData)).toThrow(
        "Robot instructions must only include R, L or F"
      );
    });

    it("should throw error when no arguments given", () => {
      const testData = "nonsense";

      expect(() => parseInput(testData)).toThrow("Input data is incorrect!");
    });

    it("should throw error when no robots defined", () => {
      const testData = "5 3\n";

      expect(() => parseInput(testData)).toThrow("Input data is incorrect!");
    });
  });
});
