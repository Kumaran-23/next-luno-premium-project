 export async function lunoPriceMYR() {
    const response = await fetch("https://api.luno.com/api/1/ticker?pair=XBTMYR")//gets the price pair for BTC in MYR and USD
    if(response.status === 200)
    {
        const result = await response.json();
        return +result.last_trade;
    }
    else
    {
        return "Failed to get price";
    }
}