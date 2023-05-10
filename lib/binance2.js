import Binance from 'node-binance-api'

export async function binancePriceUSD(binanceCoin) {
    const binance = new Binance()
    const ticker = await binance.prices();
    return +ticker[`${binanceCoin}BUSD`]
}