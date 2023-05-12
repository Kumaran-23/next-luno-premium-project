import { lunoResult } from "../index.js";

test("Returns expected display in console if all is working correctly", async () => {
    const MOCK_LUNOPRICE = 100000;
    jest.mock('../lib/luno.js', () => {
        return {
            lunoPriceMYR: jest.fn()
            .mockReturnValue(MOCK_LUNOPRICE),
        };
    })


    const MOCK_RATE = 4.5;
    jest.mock('../lib/exchange-rate.js', () => {
        return {
            exchangeRate: jest.fn()
            .mockReturnValue(MOCK_RATE),
        };
    })

    const MOCK_BINANCEPRICE = 22100;
    // mocking the entire node-binance-api module
    jest.mock('../lib/binance.js', () => {
        return {
            binancePriceUSD: jest.fn()
            .mockReturnValue(MOCK_BINANCEPRICE),
        };
    })

   

    const LUNO_USD = MOCK_LUNOPRICE/MOCK_RATE;
    const PRICE_DIFF = LUNO_USD - MOCK_BINANCEPRICE;
    const PREMIUM = (PRICE_DIFF / LUNO_USD) * 100;

    console.log = jest.fn(()=> undefined)

     await lunoResult();

    expect(console.log).toHaveBeenCalledWith("BTCMYR price on Luno:".padEnd(30) + "MYR " + MOCK_LUNOPRICE);
    expect(console.log).toHaveBeenCalledWith("USDMYR:".padEnd(30) + MOCK_RATE);
    expect(console.log).toHaveBeenCalledWith("BTCUSD price on Luno:".padEnd(30) + "USD " + LUNO_USD);
    expect(console.log).toHaveBeenCalledWith("BTCBUSD price on Binance:".padEnd(30) + "USD " + MOCK_BINANCEPRICE);
    expect(console.log).toHaveBeenCalledWith("Price difference:".padEnd(30) + "USD "+ PRICE_DIFF);
    expect(console.log).toHaveBeenCalledWith("Luno premium:".padEnd(30), PREMIUM.toFixed(4) + "%");
})

