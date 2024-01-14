import { lunoPriceMYR } from '../lib/luno.js';


// The purpose of this test is to ensure that the function correctly 
// handles the API response and returns the BTC price when the API call is successful.
test("Returns the BTC Price if successful", async () => {
  const MOCK_PRICE = 99;//will be used as the mock return value for the price of BTC.
//   Jest mock function (jest.fn()) to simulate making API requests without actually making any real network calls.
  global.fetch = jest.fn(() => Promise.resolve({//The mock function is set up to return a resolved Promise that emulates a successful API response. 
// The returned object includes a status property set to 200, indicating a successful HTTP response.
    status: 200,
    json: () => Promise.resolve({last_trade: MOCK_PRICE})//a json method that returns another resolved Promise containing 
    // the mock BTC price object with the key last_trade set to the MOCK_PRICE.
    }));
    expect(await lunoPriceMYR()).toBe(MOCK_PRICE);//The lunoPriceMYR function is called, and the test expects that the return value will be 
    // equal to the MOCK_PRICE (which is 99 in this case).
});

test("Returns error message if status code not 200", async () => {
    const MOCK_STATUS = 99;

global.fetch = jest.fn(() => Promise.resolve({//The mock function is set up to return a resolved Promise that emulates an API response with 
// the status code specified by MOCK_STATUS. Additionally, it defines an empty function for the json method, which means the response body 
// is empty for this test case (indicating no JSON data was returned).
    status: MOCK_STATUS,
    json: () => {}
}))
    expect(await lunoPriceMYR()).toBe("Failed to get Luno price at this time, please try again");//The lunoPriceMYR function is called, and 
    // the test expects that it will return the error message when the API response status code is not 200
})