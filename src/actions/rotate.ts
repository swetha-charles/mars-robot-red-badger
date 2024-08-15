import { Orientation, Robot } from "../utils/types";

const allOrientations = Object.values(Orientation);

export function rotateRight(robot: Robot) {
  const currentIndex = allOrientations.indexOf(Orientation[robot.orientation]);

  const newOrientationIndex = (currentIndex + 1) % allOrientations.length; // loop around the orientation array, clockwise
  const newOrientation = allOrientations[newOrientationIndex] as Orientation;

  return { ...robot, orientation: newOrientation };
}

export function rotateLeft(robot: Robot) {
  const currentIndex = allOrientations.indexOf(Orientation[robot.orientation]);

  let newOrientationIndex = currentIndex - 1; // loop around orientation array, anti clockwise
  if (newOrientationIndex < 0) {
    newOrientationIndex = newOrientationIndex + allOrientations.length;
  }
  const newOrientation = allOrientations[newOrientationIndex] as Orientation;
  return { ...robot, orientation: newOrientation };
}
