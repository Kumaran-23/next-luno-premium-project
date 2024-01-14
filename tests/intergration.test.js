beforeEach(() => {
  jest.resetModules(); //reset module mocks before each test
});

test("Returns expected display in console if all is working correctly", async () => {
    const lunoResult = require("../index.js").lunoResult;
    const MOCK_LUNOPRICE = 100000;
    jest.mock('../lib/luno.js', () => {//replaces the real implementation of luno.js with a custom mock implementation. 
    // This allows the test to control the behavior of the lunoPriceMYR function, which resides in the luno.js module.
        const MOCK_LUNOPRICE = 100000;
        return {
            lunoPriceMYR(){
                return new Promise(res => res(MOCK_LUNOPRICE))//returns a Promise that resolves to MOCK_LUNOPRICE when called. 
                // The purpose of this mock is to simulate the successful behavior of fetching the BTC price without actually making any network requests.
            }
        };
    })


    const MOCK_RATE = 4.5;
    jest.mock('../lib/exchange-rate.js', () => {
        return {
            exchangeRate(){
                return new Promise(res => res(MOCK_RATE))
            }
            
        };
    })

    const MOCK_BINANCEPRICE = 22100;
    jest.mock('../lib/binance.js', () => {
        return {
            binancePriceUSD() {
                return new Promise(res => res(MOCK_BINANCEPRICE))
            }
        }
    })

   

    const LUNO_USD = MOCK_LUNOPRICE/MOCK_RATE;
    const PRICE_DIFF = LUNO_USD - MOCK_BINANCEPRICE;
    const PREMIUM = (PRICE_DIFF / LUNO_USD) * 100;

    console.log = jest.fn(()=> undefined)//replaces the real console.log implementation with a mock function that does nothing (returns undefined).
    // The purpose of this mock is to track if and how the console.log method is called during the test, without actually logging anything to the console.

     await lunoResult();

    expect(console.log).toHaveBeenCalledWith("BTCMYR price on Luno:".padEnd(30) + "MYR " + MOCK_LUNOPRICE);//This is the test assertion. It uses expect from Jest 
    // to verify that the console.log method was called with the expected message as an argument.
    expect(console.log).toHaveBeenCalledWith("USDMYR:".padEnd(30) + MOCK_RATE);
    expect(console.log).toHaveBeenCalledWith("BTCUSD price on Luno:".padEnd(30) + "USD " + LUNO_USD);
    expect(console.log).toHaveBeenCalledWith("BTCBUSD price on Binance:".padEnd(30) + "USD " + MOCK_BINANCEPRICE);
    expect(console.log).toHaveBeenCalledWith("Price difference:".padEnd(30) + "USD "+ PRICE_DIFF);
    expect(console.log).toHaveBeenCalledWith("Luno premium:".padEnd(30) + PREMIUM.toFixed(4) + "%");
})

//The test assertion checks whether console.log was called with this specific message. If the lunoResult function logs the expected message to the console when executed,
// the test will pass. This way, the test ensures that the function is correctly interacting with the console.log method as intended.