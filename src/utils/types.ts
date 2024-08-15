export type MarsSetup = {
    board: Board;
    robots: Robot[];
  };
  
  export type Board = {
    maxX: number;
    maxY: number;
    scented: Coordinate[];
  };
  
  export type Robot = {
    coord: Coordinate;
    orientation: Orientation;
    instructions: Instructions;
    lost?: boolean;
  };
  
  export type Coordinate = {
    x: number;
    y: number;
  };
  
  // NB: orientations must be defined in clockwise order in this enum
  export enum Orientation {
    N = "N",
    E = "E",
    S = "S",
    W = "W",
  }
  
  export type Instructions = Instruction[];
  export enum Instruction {
    R = "R",
    L = "L",
    F = "F",
  }
  