import assert from "node:assert";
import { layerOf, fullAt, sealedInto } from "../store.js";
import { step, close } from "../storerun.js";
import { render } from "../app.js";

const base = {
  budget: 1, size: 2,
  state: { active: [], frozen: [], sealed: [], asks: [], ledger: [], applied: [] },
  events: [{ id: 1, kind: "put", key: "a" }],
  bad_key_code: "E_BAD_KEY", dup_code: "E_DUP_KEY",
  none_code: "E_NONE", no_key_code: "E_NO_KEY",
  event_error_code: "E_BAD_EVENT"
};

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("layerOf returns a string", () => {
  assert.strictEqual(typeof layerOf(["a"], [], [], "a"), "string");
});

check("fullAt returns a boolean", () => {
  assert.strictEqual(typeof fullAt(["a", "b"], 2), "boolean");
});

check("sealedInto returns a pair", () => {
  assert.ok(Array.isArray(sealedInto([], [["x"]]).sealed));
});

check("step returns a state", () => {
  assert.strictEqual(typeof step(base).state, "object");
});

check("render counts events", () => {
  assert.strictEqual(typeof render(base).count_events, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
