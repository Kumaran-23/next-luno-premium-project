//require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();
import { lunoPriceMYR } from './lib/luno.js';
import { binancePriceUSD } from './lib/binance.js';
import { exchangeRate } from './lib/exchange-rate.js';
import { lunoPriceUSD, priceDiff, lunoPremium } from './lib/utils.js';


export async function lunoResult() {
    let lunoMYRPrice = await lunoPriceMYR();
    let exRate = await exchangeRate();
    let lunoUSDPrice = await lunoPriceUSD(lunoMYRPrice, exRate);
    let binanceBUSD = await binancePriceUSD();
    let diffPrice = await priceDiff(lunoUSDPrice, binanceBUSD);
    let premiumPercent = await lunoPremium(lunoUSDPrice, binanceBUSD);
    console.log("BTCMYR price on Luno:".padEnd(30) + "MYR " + lunoMYRPrice);
    console.log("USDMYR:".padEnd(30) + exRate);
    console.log("BTCUSD price on Luno:".padEnd(30) + "USD " + lunoUSDPrice);
    console.log("BTCBUSD price on Binance:".padEnd(30) + "USD " + binanceBUSD);
    console.log("Price difference:".padEnd(30) + "USD " + diffPrice);
    console.log("Luno premium:".padEnd(30) + premiumPercent.toFixed(4) + "%")

}

//lunoResult();

