import { lunoPriceMYR } from '../lib/luno.js';

test("Returns the BTC Price if successful", async () => {
    const MOCK_PRICE = 99;
    global.fetch = jest.fn(() => Promise.resolve({
  status: 200,
  json: () => Promise.resolve({last_trade: MOCK_PRICE})
}));
  expect(await lunoPriceMYR()).toBe(MOCK_PRICE);
});

test("Returns error message if status code not 200", async () => {
    const MOCK_STATUS = 99;

global.fetch = jest.fn(() => Promise.resolve({
    status: MOCK_STATUS,
    json: () => {}
}))
    expect(await lunoPriceMYR()).toBe("Failed to get price");
})