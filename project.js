/*
* Project Description:
* Slots betting game. Has 3 reels, 3 lines.
*
* Tasks:                                           | Status:
*   User deposits money                            |  Completed
*   User inputs number of lines to bet on          |  Completed
*   Betting amount is deducted from user account   |  Completed
*   The slot machine is spinned                    |  Completed
*   Win condition                                  |  Working...
*   Give or take based on win condition            |  Pending...
*   Restart                                        |  Pending...
*/

const prompt = require("prompt-sync")();
const ROWS = 3;
const COLS = 3;
const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}
const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}

function getDepositAmount()
{
    while (true)
    {
        var depositAmount = parseFloat(prompt("Enter a deposit amount: "));

        if (isNaN(depositAmount) || depositAmount <= 0)
        {
            console.log("Invalid deposit amount. Please try again.");
            continue;
        }

        return depositAmount;
    }
}

function getNumberOfLines()
{
    while (true)
    {
        var numberOfLines = parseFloat(prompt("Enter the number of lines (1-3): "));

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3)
        {
            console.log("Invalid number of lines. Please try again.");
            continue;
        }

        return numberOfLines;
    }
}

function getBetAmount(balance, lines)
{
    while (true)
    {
        var betAmountPerLine = parseFloat(prompt("Enter the bet per line: "));

        if (isNaN(betAmountPerLine) || betAmountPerLine <= 0 || betAmountPerLine * lines > balance)
        {
            console.log("Invalid bet amount. Please try again.");
            continue;
        }

        return betAmountPerLine;
    }
}

function spin()
{
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT))
    {
        for (let i = 0; i < count; i++)
        {
            symbols.push(symbol);
        }
    }

    const reels = new Array(ROWS);
    for (let i = 0; i < ROWS; i++)
    {
        reels[i] = Array(COLS);

        for (let j = 0; j < COLS; j++)
        {
            const randomIndex = Math.floor(Math.random() * reels.length);
            reels[i][j] = symbols[randomIndex];
            symbols.splice(randomIndex, 1);
        }
    }
    
    return reels;
}

function main()
{
    var balance = getDepositAmount();
    var numberOfLines = getNumberOfLines();
    var bet = getBetAmount(balance, numberOfLines);
    const reels = spin();
}

main();