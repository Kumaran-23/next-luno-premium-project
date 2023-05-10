export async function lunoPriceUSD(myrPrice, exchageRate) {
    let usdExchage = myrPrice / exchageRate;
    return +usdExchage;
}

export async function priceDiff(lunoUSD, binanceUSD) {
    let diff = lunoUSD - binanceUSD;
    return +diff;
}

export async function lunoPremium(lunoUSD, binanceUSD) {
    let premium = ((lunoUSD - binanceUSD) / lunoUSD) * 100;
    return +premium; 
}