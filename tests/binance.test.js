beforeEach(() => {
  jest.resetModules(); // reset module mocks before each test to not affect other tests in this file
});

test("Returns price if Binance request succeeds", async () => {
    const MOCK_PRICE = 999;
    const binancePriceUSD = require('../lib/binance.js').binancePriceUSD // your function name could be different

    // mocking the entire node-binance-api module
    jest.mock('node-binance-api', () => {
        const BTCBUSD = {BTCBUSD: MOCK_PRICE};
        return class Binance {
        // we use only the prices method for this particular test, so we'll mock just this method
        prices() {
            return new Promise(res => res(BTCBUSD))
      }
    }
  })
  expect(await binancePriceUSD()).toBe(MOCK_PRICE);
})

test("Returns error message if price not recieved", async () => {
    const binancePriceUSD = require('../lib/binance.js').binancePriceUSD // your function name could be different
    jest.mock('node-binance-api', () => {
        return class Binance {
            prices() {
                return new Promise(res => res("Price not retrivable"))
            }
        }
    })
    expect(await binancePriceUSD()).toBe("Price not retrivable");
})