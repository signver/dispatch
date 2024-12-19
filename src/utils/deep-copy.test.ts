import { deepCopy } from "./deep-copy";

describe("deepCopy", () => {
  describe("primitives", () => {
    it("should return the same boolean", () => {
      expect(deepCopy(true)).toBe(true);
      expect(deepCopy(false)).toBe(false);
    });
    it("should return the same number", () => {
      expect(deepCopy(0)).toBe(0);
      expect(deepCopy(1)).toBe(1);
      expect(deepCopy(-1)).toBe(-1);
    });
    it("should return the same string", () => {
      expect(deepCopy("the quick brown fox")).toBe("the quick brown fox");
    });
  });
  describe("object & array", () => {
    it("should copy an object", () => {
      expect(deepCopy({ a: 1, b: "2" })).toEqual({ a: 1, b: "2" });
    });
    it("should copy nested object", () => {
      const original = { a: 1, b: "2", c: { d: true } };
      const copy = deepCopy(original);
      expect(copy).toEqual(original);
      copy.c.d = false;
      expect(copy).not.toEqual(original);
    });
    it("should copy an array", () => {
      expect(deepCopy([1, 2, 3, "4"])).toEqual([1, 2, 3, "4"]);
    });
    it("should copy a nested array", () => {
      const original = [1, 2, 3, "4", [5, 6, true]];
      const copy = deepCopy(original);
      expect(copy).toEqual(original);
      (copy[4] as any[])[0] = 7;
      expect(copy).not.toEqual(original);
    });
    it("should copy mixed objects", () => {
      expect({ a: 1, b: [2, { c: 3 }], d: { e: 4 } }).toEqual({
        a: 1,
        b: [2, { c: 3 }],
        d: { e: 4 },
      });
    });
  });
});
