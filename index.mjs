//require('dotenv').config();
import Binance from 'node-binance-api'
const binance = new Binance().options()// to make api calls to Binance

async function lunoResult() {
    const response = await fetch("https://api.luno.com/api/1/tickers?pair=XBTMYR&pair=XBTUSDC")//gets the price pair for BTC in MYR and USD
    const result = await response.json();
    let myHeader = new Headers();//header for exchange rate api 
    myHeader.append("apikey", "ZootzVHO1KTf9brWNxWNtrYjohLYt7LO")
    let requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: myHeader 
    };
    const exResponese = await fetch("https://api.apilayer.com/exchangerates_data/convert?to=myr&from=usd&amount=1", requestOptions)//gets exchage rate of 1 USD to MYR
    const exResults = await exResponese.json(); 
    console.log("%c BTCMYR price on Luno:    MYR " + Math.trunc(result.tickers[1].last_trade), 'text-align: right');
    console.log("%c USDMYR:                      " + exResults.result, 'text-align: right');
    console.log("BTCUSD price on Luno:    USD " + result.tickers[0].last_trade);
    const ticker = await binance.prices('BTCBUSD')//gets the price of BTC in USD from Binance
    console.log("BTCBUSD price on Binance:    USD " + ticker.BTCBUSD);
    let priceDiff = result.tickers[0].last_trade - ticker.BTCBUSD;//calculate the differences in price of BTC(in USD) from Luno and Binance
    console.log("Price difference:                " + priceDiff);
    let lunoPremium = ticker.BTCBUSD / result.tickers[0].last_trade;
    console.log("Luno premium:                   " + lunoPremium.toFixed(4) + "%");

   
}

//async function binanceResult() {
//    const ticker = await binance.prices('BTCBUSD', (error, ticker) => {
//  console.info("BTCBUSD price on Binance:    USD ", ticker.BTCBUSD);
//});
    //console.log(ticker);
//}

lunoResult();
//binanceResult();
