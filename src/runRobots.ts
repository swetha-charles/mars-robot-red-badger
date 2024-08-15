import { forward } from "./actions/forward";
import { rotateLeft, rotateRight } from "./actions/rotate";
import { parseInput } from "./utils/parseInput";
import { Board, Instruction, Robot } from "./utils/types";

export function runRobots(inputData: string) {
  let { board: updatedBoard, robots } = parseInput(inputData);

  const result: string[] = [];

  for (const robot of robots) {
    const [{ coord, orientation, lost }, board] = runRobot(robot, updatedBoard);
    updatedBoard = board;

    result.push(`${coord.x} ${coord.y} ${orientation}`);
    if (lost) result.push(`LOST`);
  }

  return result.join("\n");
}

function runRobot(robot: Robot, board: Board): [Robot, Board] {
  let updatedRobot: Robot = robot;
  let updatedBoard: Board = board;

  for (const instruction of robot.instructions) {
    switch (instruction) {
      case Instruction.R:
        updatedRobot = rotateRight(updatedRobot);
        break;
      case Instruction.L:
        updatedRobot = rotateLeft(updatedRobot);
        break;
      case Instruction.F:
        [updatedRobot, updatedBoard] = forward(updatedRobot, updatedBoard);
        break;
      default:
        throw new Error(`Unknown instruction ${instruction}, please add action that matches this new instruction.`);
    }

    if (!!updatedRobot.lost) break;
  }

  return [updatedRobot, updatedBoard];
}
