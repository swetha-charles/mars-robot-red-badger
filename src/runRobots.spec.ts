import { runRobots } from "./runRobots";

describe("runRobots", () => {
  const testData =
    "5 3\n1 1 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL\n0 3 W\nLLFFFLFLFL";

  it("should return expected result for input", () => {
    expect(runRobots(testData)).toEqual("1 1 E\n3 3 N\nLOST\n2 3 S");
  });
});
