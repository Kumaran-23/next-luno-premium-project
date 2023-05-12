import { lunoPriceUSD, priceDiff, lunoPremium } from '../lib/utils.js'

test("Returns the correct luno crypto price in USD", async () => {
    expect(await lunoPriceUSD(100, 4)).toEqual(25);
})

test("Return the correct price difference between Luno and Binance in USD", async () => {
    expect(await priceDiff(100,90)).toEqual(10);
})

test("Return the correct price Premium paid for luno crypto", async () => {
    expect(await lunoPremium(100, 90)).toEqual(10)
})