import Binance from 'node-binance-api'

export async function binancePriceUSD() {
   try {
    const binance = new Binance();
    const binanceTicker = await binance.prices();//get the prices of coins on Binance
    if(isNaN(binanceTicker.BTCBUSD) === false)//if the price of BTC in BUSD is not NaN will return the valus 
        return +binanceTicker.BTCBUSD;
   else
        throw "Fetch error";//if value returned is Nan or empty will throw error to catch
   }
   catch (err) {//catches unexpected erros such as NaN or empty values 
    if(err == "Fetch error")
        return "Binance price not retrivable at this time, please try again"
    throw err;
   }
}

// export async function binancePriceUSD() {
//     const binance = new Binance();
//     const binanceTicker = await binance.prices();//get the prices of coins on Binance
//     console.log(binanceTicker);
//     // console.info(`Price of BTCBUSD: ${binanceTicker.BTCBUSD}`);
//     return +binanceTicker.BTCBUSD;
// }

// binancePriceUSD()