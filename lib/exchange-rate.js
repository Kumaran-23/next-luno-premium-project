export async function exchangeRate() {
    let myHeader = new Headers();//header for exchange rate api 
    myHeader.append(process.env.YOUR_NAME, process.env.API_VALUE)
    let requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: myHeader 
    };
    const exResponese = await fetch("https://api.apilayer.com/exchangerates_data/convert?to=myr&from=usd&amount=1", requestOptions)//gets exchage rate of 1 USD to MYR
    if(exResponese.status === 200)
    {
        const exResults = await exResponese.json();
        return +exResults.result;
    }
    else
        return "Failed to get conversion rate";
}