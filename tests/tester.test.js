import { lunoPriceMYR } from "../lib/luno";

test("Returns expected display in console if all is working correctly", async () => {
    const MOCK_LUNOPRICE = 100000;
    global.fetch = jest.fn(() => Promise.resolve({
    status: 200,
    json: () => Promise.resolve({last_trade: MOCK_LUNOPRICE})
    }));
    expect(await lunoPriceMYR()).toBe(MOCK_LUNOPRICE);
});