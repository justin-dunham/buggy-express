import { getRandom } from "./src/index";

const tests = new Array(100);
tests.fill(0);

console.log(tests.map(() => getRandom(400, 500)));
