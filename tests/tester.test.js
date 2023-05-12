import { lunoPriceMYR } from "../lib/luno";

test("Returns expected display in console if all is working correctly", async () => {
    const MOCK_LUNOPRICE = 100000;
    jest.mock('../lib/luno.js', () => {
        return function lunoPriceMYR() {
            return new Promise(res => res(MOCK_LUNOPRICE))
        };
    })
    expect(await lunoPriceMYR()).toBe(MOCK_LUNOPRICE);
})