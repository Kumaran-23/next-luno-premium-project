export async function lunoPriceMYR(lunoCoin) {
    const response = await fetch("https://api.luno.com/api/1/tickers?pair=" + lunoCoin + "MYR")//gets the price pair for BTC in MYR and USD
    const result = await response.json();
    return +result.tickers[0].last_trade;
}
