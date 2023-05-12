import { exchangeRate } from "../lib/exchange-rate.js";

test("Returns the right conversion rate", async () => {
    const MOCK_RATE = 4.1;
    global.fetch = jest.fn(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve({result: MOCK_RATE})
    }));
    expect(await exchangeRate()).toBe(MOCK_RATE);
})

test("Returns error message if conversion rate not retrivable", async () => {
    const MOCK_STATUS = 500;
    global.fetch = jest.fn(() => Promise.resolve({
        status: MOCK_STATUS,
        json: () => {}
    }));
    expect(await exchangeRate()).toBe("Failed to get conversion rate");
})