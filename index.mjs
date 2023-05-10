//require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();
import Binance from 'node-binance-api'
const binance = new Binance().options()// to make api calls to Binance

async function lunoResult() {
    const response = await fetch("https://api.luno.com/api/1/tickers?pair=XBTMYR")//gets the price pair for BTC in MYR and USD
    const result = await response.json();
    let myHeader = new Headers();//header for exchange rate api 
    myHeader.append(process.env.YOUR_NAME, process.env.API_VALUE)
    let requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: myHeader 
    };
    const exResponese = await fetch("https://api.apilayer.com/exchangerates_data/convert?to=myr&from=usd&amount=1", requestOptions)//gets exchage rate of 1 USD to MYR
    const exResults = await exResponese.json();
    let lunoUSD = result.tickers[0].last_trade / exResults.result;
    const ticker = await binance.prices('BTCBUSD')//gets the price of BTC in USD from Binance
    let priceDiff = lunoUSD - ticker.BTCBUSD;//calculate the differences in price of BTC(in USD) from Luno and Binance
    let lunoPremium = priceDiff / lunoUSD;//calculate the premium in percentage you have to pay for luno
    console.log("BTCMYR price on Luno:".padEnd(30) + "MYR " + Math.round(result.tickers[0].last_trade));
    console.log("USDMYR:".padEnd(30) + exResults.result);
    console.log("BTCUSD price on Luno:".padEnd(30) + "USD " + lunoUSD);
    console.log("BTCBUSD price on Binance:".padEnd(30) + "USD " + ticker.BTCBUSD);
    console.log("Price difference:".padEnd(30) + "USD " + priceDiff);
    console.log("Luno premium:".padEnd(30) + lunoPremium.toFixed(4) + "%");   
}

lunoResult();

