import Binance from 'node-binance-api'

export async function binancePriceUSD() {
    const binance = new Binance()
    const binanceTicker = await binance.prices();
    return +binanceTicker.BTCBUSD
}