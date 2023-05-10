import dotenv from 'dotenv';
dotenv.config();
import { lunoPriceMYR } from './lib/luno2.js';
import { binancePriceUSD } from './lib/binance2.js';
import { exchangeRate } from './lib/exchange-rate.js';
import { lunoPriceUSD, priceDiff, lunoPremium } from './lib/utils.js';
import { cryptoASK } from './lib/crypo-prompt.js';

async function lunoResult() {
    let userPrompt = await cryptoASK();
    let lunoMYRPrice = await lunoPriceMYR(userPrompt.a);
    let exRate = await exchangeRate();
    let lunoUSDPrice = await lunoPriceUSD(lunoMYRPrice, exRate);
    let binanceBUSD = await binancePriceUSD(userPrompt.b);
    let diffPrice = await priceDiff(lunoUSDPrice, binanceBUSD);
    let premiumPercent = await lunoPremium(lunoUSDPrice, binanceBUSD);
    console.log(userPrompt.a + "MYR price on Luno:".padEnd(30) + "MYR " + lunoMYRPrice);
    console.log("USDMYR:".padEnd(33) + exRate);
    console.log(userPrompt.a + "USD price on Luno:".padEnd(30) + "USD " + lunoUSDPrice);
    console.log(userPrompt.b + "BUSD price on Binance:".padEnd(30) + "USD " + binanceBUSD);
    console.log("Price difference:".padEnd(33) + "USD " + diffPrice);
    console.log("Luno premium:".padEnd(33) + premiumPercent.toFixed(4) + "%\n");
}

async function loop() {
    while(true) {
        await lunoResult();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

loop();