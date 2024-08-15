import { Board, Orientation, Robot } from "../utils/types";
import { forward } from "./forward";

describe("forward", () => {
  let testRobot: Robot = {
    coord: { x: 1, y: 1 },
    orientation: Orientation.N,
    instructions: [],
  };
  let testBoard: Board = { maxX: 5, maxY: 5, scented: [] };

  it("when facing north, moves forward correctly", () => {
    const [updatedRobot] = forward(
      { ...testRobot, orientation: Orientation.N },
      testBoard
    );
    expect(updatedRobot.coord).toEqual({ x: 1, y: 2 });
  });

  it("when facing east, moves forward correctly", () => {
    const [updatedRobot] = forward(
      { ...testRobot, orientation: Orientation.E },
      testBoard
    );
    expect(updatedRobot.coord).toEqual({ x: 2, y: 1 });
  });

  it("when facing south, moves forward correctly", () => {
    const [updatedRobot] = forward(
      { ...testRobot, orientation: Orientation.S },
      testBoard
    );
    expect(updatedRobot.coord).toEqual({ x: 1, y: 0 });
  });

  it("when facing west, moves forward correctly", () => {
    const [updatedRobot] = forward(
      { ...testRobot, orientation: Orientation.W },
      testBoard
    );
    expect(updatedRobot.coord).toEqual({ x: 0, y: 1 });
  });

  it("when robot goes off board, robot is returned with original coordinates and lost set to true", () => {
    const [updatedRobot] = forward(
      { ...testRobot, coord: { x: 0, y: 0 }, orientation: Orientation.S },
      testBoard
    );
    expect(updatedRobot.lost).toEqual(true);
    expect(updatedRobot.coord).toEqual({ x: 0, y: 0 });
  });

  it("when robot goes off board, board has updated scent", () => {
    const [_, updatedBoard] = forward(
      { ...testRobot, coord: { x: 0, y: 0 }, orientation: Orientation.S },
      testBoard
    );
    expect(updatedBoard.scented.length).toEqual(testBoard.scented.length + 1);
    expect(updatedBoard.scented).toEqual([{ x: 0, y: 0 }]);
  });

  it("robot does not go off board if original coordinates scented", () => {
    testBoard = { ...testBoard, scented: [{ x: 0, y: 0 }] };
    const [updatedRobot, _] = forward(
      { ...testRobot, coord: { x: 0, y: 0 }, orientation: Orientation.S },
      testBoard
    );

    expect(updatedRobot.coord).toEqual({x: 0, y: 0});
    expect(!!updatedRobot.lost).toEqual(false);
  });
});
