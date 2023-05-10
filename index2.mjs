import dotenv from 'dotenv';
dotenv.config();
import promptSync from 'prompt-sync';
const prompt = promptSync();
import Binance from 'node-binance-api'
const binance = new Binance().options()// to make api calls to Binance

function lunoResult() {
    setInterval(async () => {
    let lunoAB = ""
    let binanceAB = ""
    let userInput = prompt("Enter Crypto: ");
    if(userInput === "BTC")
    {
        lunoAB = "XBT";
        binanceAB = userInput;
    }
    else if(userInput === "XBT")
    {
        binanceAB = "BTC";
        lunoAB = userInput;
    }
    else
    {
        lunoAB = userInput;
        binanceAB = userInput;
    }
    //let binanceAB = prompt("Enter Binance cryto abbreviation: ");
    const response = await fetch("https://api.luno.com/api/1/tickers?pair=" + lunoAB + "MYR")//gets the price pair for BTC in MYR and USD
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
    const resultUSDC = result.tickers[0].last_trade / exResults.result;
    const ticker = await binance.prices()//gets the price of BTC in USD from Binance
    let priceDiff = resultUSDC - ticker[`${binanceAB}BUSD`];//calculate the differences in price of BTC(in USD) from Luno and Binance
    let lunoPremium = priceDiff / result.tickers[0].last_trade;//calculate the premium in percentage you have to pay for luno
    console.log(lunoAB + "MYR price on Luno:".padEnd(30) + "MYR " + result.tickers[0].last_trade);
    console.log("USDMYR:".padEnd(33) + exResults.result);
    console.log(lunoAB + "USD price on Luno:".padEnd(30) + "USD " + resultUSDC);
    console.log(binanceAB + "BUSD price on Binance:".padEnd(30) + "USD " + ticker[`${binanceAB}BUSD`]);
    console.log("Price difference:".padEnd(33) + "USD " + priceDiff);
    console.log("Luno premium:".padEnd(33) + lunoPremium.toFixed(4) + "%\n");
    }, 7000)   
}

lunoResult();
