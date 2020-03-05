import buggy, { getRandom } from "./index";

jest.useFakeTimers();

describe("Buggy Middleware", () => {
  it("Will delay", () => {
    const buggyInstance = buggy({
      delayMaxMS: 1000,
      chanceOfError: 0
    });
    const request = {};
    const response = {};
    const next = jest.fn();

    buggyInstance(request, response, next);
    expect(next).not.toBeCalled();

    // Fast-forward until all timers have been executed
    jest.runAllTimers();

    // Now our callback should have been called!
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("Will error", () => {
    const buggyInstance = buggy({
      delayMaxMS: 0,
      chanceOfError: 1
    });
    const next = jest.fn();
    const json = jest.fn();
    const status = jest.fn(() => ({
      json
    }));
    const request = {};
    const response = { status, json };

    buggyInstance(request, response, next);
    expect(next).not.toBeCalled();
    expect(json).toBeCalledWith({
      error: true,
      reason: "Error by pure chance. (100%)",
      status: false
    });
  });

  it("Will not error in production env", () => {
    process.env.NODE_ENV = "production";
    const buggyInstance = buggy({
      delayMaxMS: 10000,
      chanceOfError: 1
    });
    const next = jest.fn();

    buggyInstance({}, {}, next);

    // Fast-forward until all timers have been executed
    jest.runAllTimers();
    expect(next).toBeCalled();
  });
});

describe("Random Numbers", () => {
  it("Constrains max", () => {
    const random = getRandom(0, 200);
    // Now our callback should have been called!
    expect(random).toBeLessThanOrEqual(200);
  });

  it("Constrains max", () => {
    const random = getRandom(100, 200);
    // Now our callback should have been called!
    expect(random).toBeGreaterThanOrEqual(100);
  });

  it("Constrains range", () => {
    const random = getRandom(100, 101);
    // Now our callback should have been called!
    expect(random).toBe(100);
  });
});
