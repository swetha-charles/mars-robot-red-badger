import {
  Instructions,
  Instruction,
  MarsSetup,
  Orientation,
  Robot,
} from "./types";

export function parseInput(inputString: string): MarsSetup {
  const inputArray = inputString.split("\n");

  if (
    inputArray === undefined ||
    !Array.isArray(inputArray) ||
    inputArray.length < 3
  ) {
    throw new Error("Input data is incorrect!");
  }
  const [boardx, boardy] = inputArray.shift()!.split(" ");

  const board = {
    maxX: validateCoordinate(boardx),
    maxY: validateCoordinate(boardy),
    scented: [],
  };
  const robots: Robot[] = [];

  while (inputArray.length >= 2) {
    const [x, y, orientation] = validateRobotInfo(
      inputArray.shift()!.split(" ") 
    );
    const instructions = validateInstructions(inputArray.shift()!);

    const robot: Robot = {
      coord: { x, y },
      orientation,
      instructions,
    };

    robots.push(robot);
  }
  return { board, robots };
}

function validateCoordinate(inputCoord: string): number {
  const numberCoord = Number(inputCoord);

  if (numberCoord > 50) {
    throw new Error(
      "Maximum value allowed on the board is 50! Please choose a smaller number."
    );
  }

  return numberCoord;
}

function validateRobotInfo(robotInfo: string[]): [number, number, Orientation] {
  if (robotInfo.length !== 3) {
    throw new Error(
      "Robot input data is incorrect! Please provide starting coordinates and orientation"
    );
  }

  const [inputx, inputy, orientation] = robotInfo;

  return [
    validateCoordinate(inputx),
    validateCoordinate(inputy),
    validateOrientation(orientation),
  ];
}

function validateOrientation(inputOrientation: string): Orientation {
  if (inputOrientation in Orientation) {
    return inputOrientation as unknown as Orientation;
  } else {
    throw new Error("Invalid orientation. Only N, S, E, W are allowed.");
  }
}

function validateInstructions(instructions: string): Instructions {
  const instructionArray = instructions.split("");
  instructionArray.forEach((inst) => {
    if (!(inst in Instruction))
      throw new Error("Robot instructions must only include R, L or F.");
  });

  return instructionArray as unknown as Instructions;
}
