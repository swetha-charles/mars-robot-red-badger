import { Board, Coordinate, Orientation, Robot } from "../utils/types";

export function forward(robot: Robot, board: Board): [Robot, Board] {
  const { x, y } = robot.coord;
  const orientation = robot.orientation;

  let newCoordinate: Coordinate;
  let newScentStore = [...board.scented];
  switch (orientation) {
    case Orientation.N:
      newCoordinate = { x, y: y + 1 };
      break;
    case Orientation.E:
      newCoordinate = { x: x + 1, y };
      break;
    case Orientation.S:
      newCoordinate = { x, y: y - 1 };
      break;
    case Orientation.W:
      newCoordinate = { x: x - 1, y };
      break;
    default:
      throw new Error(`Unknown orientation: ${orientation}`);
  }
  if (isOnBoard(newCoordinate, board)) {
    return [{ ...robot, coord: newCoordinate }, board];
  } else if (isScented(robot.coord, board)) {
    // No change - the robot will not move off board as its current position is scented.
    return [robot, board];
  } else {
    // Robot is lost!

    // Update the scent store to store the original coordinate as now scented
    newScentStore.push(robot.coord);

    // Keep original coordinate of robot as last known position and set lost to true
    return [
      { ...robot, lost: true },
      { ...board, scented: newScentStore },
    ];
  }
}

export function isOnBoard({ x, y }: Coordinate, { maxX, maxY }: Board) {
  return x >= 0 && x <= maxX && y >= 0 && y <= maxY;
}

export function isScented(coord: Coordinate, board: Board) {
  return (
    board.scented &&
    board.scented.some((scent) => coord.x === scent.x && coord.y === scent.y)
  );
}
