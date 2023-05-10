export async function lunoPriceMYR() {
    const response = await fetch("https://api.luno.com/api/1/tickers?pair=XBTMYR")//gets the price pair for BTC in MYR and USD
    const result = await response.json();
    return +Math.round(result.tickers[0].last_trade);
}
