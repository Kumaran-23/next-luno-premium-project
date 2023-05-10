import promptSync from 'prompt-sync';

export async function cryptoASK () {
    const prompt = promptSync();
    let lunoAB = ""
    let binanceAB = ""
    let userInput = prompt("Enter Crypto: ").toUpperCase();
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
    return {
        a: lunoAB,
        b: binanceAB
    }
}