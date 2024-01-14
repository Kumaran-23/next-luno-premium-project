 export async function lunoPriceMYR() {
    try {
        const response = await fetch("https://api.luno.com/api/1/ticker?pair=XBTMYR")//gets the price pair for BTC in MYR
        if(response.status === 200)
        {
            const result = await response.json();
            return +result.last_trade;//returns the value of last_trade BTC price in MYR
        }
        else
        {
            throw "Fetch error";
        }
    }
    catch (err) {//catches errors such as status != to 200 or if does not return a value of any kind
        if(err === "Fetch error")
            return "Failed to get Luno price at this time, please try again"
        throw err//crashes the program in cases of error
    } 
}

// export async function lunoPriceMYR() {
//         const response = await fetch("https://api.luno.com/api/1/ticker?pair=XBTMYR")//gets the price pair for BTC in MYR
//         const result = await response.json();
//         console.log(result.last_trade)
//         return +result.last_trade;//returns the value of last_trade BTC price in MYR
// }

// lunoPriceMYR();