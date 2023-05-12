import Binance from 'node-binance-api'

export async function binancePriceUSD() {
    const binance = new Binance();
    const binanceTicker = await binance.prices();
    if(isNaN(binanceTicker.BTCBUSD) === false)
        return +binanceTicker.BTCBUSD;
    else
        return "Price not retrivable";
}