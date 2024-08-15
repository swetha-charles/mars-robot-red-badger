import { rotateRight, rotateLeft } from "./rotate";
import { Orientation, Robot } from "../utils/types";

describe("rotate", () => {
  const robot: Robot = {
    coord: { x: 0, y: 0 },
    orientation: Orientation.N,
    instructions: [],
  };

  describe("should rotate right", () => {
    it("from North", () => {
      const result = rotateRight({ ...robot, orientation: Orientation.N });
      expect(result.orientation).toBe(Orientation.E);
    });

    it("from South", () => {
      const result = rotateRight({ ...robot, orientation: Orientation.S });
      expect(result.orientation).toBe(Orientation.W);
    });

    it("from East", () => {
      const result = rotateRight({ ...robot, orientation: Orientation.E });
      expect(result.orientation).toBe(Orientation.S);
    });

    it("from West", () => {
      const result = rotateRight({ ...robot, orientation: Orientation.W });
      expect(result.orientation).toBe(Orientation.N);
    });
  });

  describe("should rotate left", () => {
    it("from North", () => {
      const result = rotateLeft({ ...robot, orientation: Orientation.N });
      expect(result.orientation).toBe(Orientation.W);
    });

    it("from South", () => {
      const result = rotateLeft({ ...robot, orientation: Orientation.S });
      expect(result.orientation).toBe(Orientation.E);
    });

    it("from East", () => {
      const result = rotateLeft({ ...robot, orientation: Orientation.E });
      expect(result.orientation).toBe(Orientation.N);
    });

    it("from West", () => {
      const result = rotateLeft({ ...robot, orientation: Orientation.W });
      expect(result.orientation).toBe(Orientation.S);
    });
  });
});
