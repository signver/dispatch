import { Dispatcher } from "./dispatch";

type Context = { prop1: number; prop2: string };

type EventMap = {
  init: string;
  change: number;
};

const DEFAULT_CONTEXT: Context = {
  prop1: 1,
  prop2: "2",
};

function make() {
  return new Dispatcher<EventMap, Context>({
    context() {
      return DEFAULT_CONTEXT;
    },
  });
}

describe("Dispatcher", () => {
  it("", () => {
    const d = make();
    const expectedData = "mock:string_payload"
    const mockHandler = jest.fn();
    d.on("init", mockHandler)
    d.dispatch("init", expectedData);
    expect(mockHandler).toHaveBeenCalledWith(expectedData, DEFAULT_CONTEXT);
  });
});
