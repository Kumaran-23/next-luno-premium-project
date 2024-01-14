export async function lunoPriceUSD(myrPrice, exchageRate) {
    try {
        let usdExchage = myrPrice / exchageRate;
        if (isNaN(usdExchage) === false)
            return +usdExchage;
    else 
        throw "NaN value"
    }
    catch (err) {
        if(err === "NaN value")
            return "Failed to calculate Luno USD price, please try again"
        throw err;
    }
}

export async function priceDiff(lunoUSD, binanceUSD) {
    try {
        let diff = lunoUSD - binanceUSD;
        if (isNaN(diff) === false)
            return +diff;
        else
            throw "NaN value";
    }
    catch (err) {
        if (err === "NaN value")
            return "Failed to calculate price difference, please try again"
        throw err;
    }
}

export async function lunoPremium(lunoUSD, binanceUSD) {
    try {
        let premium = ((lunoUSD - binanceUSD) / lunoUSD) * 100;
        if (isNaN(premium) === false)
            return +premium;
        else
            throw "NaN value";
    }
    catch (err) {
        if (err === "NaN value")
            return "Failed to calculate price difference, please try again";
        else
            throw "NaN value";
    } 
}
