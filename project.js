/*
* Project Description:
* Slots betting game. Has 3 reels, 3 lines.
*
* Tasks:                                           | Status:
*   User deposits money                            |  Completed
*   User inputs number of lines to bet on          |  Completed
*   Betting amount is deducted from user account   |  Completed
*   The slot machine is spinned                    |  Completed
*   Win condition                                  |  Completed
*   Give or take based on win condition            |  Completed
*   Restart                                        |  Completed
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
        var numberOfLines = parseFloat(prompt("Enter the number of lines (1 - " + COLS + "): "));

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
            const randomIndex = Math.floor(Math.random() * symbols.length);
            reels[i][j] = symbols[randomIndex];
            symbols.splice(randomIndex, 1);
        }
    }
    
    return reels;
}

function getWinningsAmount(reels, bet)
{
    /* Check for each horizontal row (display row is different from array row)
    * whether the row is complete. If complete then add to winnings pool. */
    let winnings = 0;
    for (let i = 0; i < COLS; i++)
    {
        let isComplete = true;
        for (let j = 1; j < ROWS; j++)
        {
            if (reels[j][i] != reels[0][i])
            {
                isComplete = false;
                break;
            }
        }

        if (isComplete)
        {
            winnings += bet * SYMBOL_VALUES[reels[0][i]]; 
        }
    }

    return winnings;
}

// Program Execution
var balance = getDepositAmount();

while (true)
{
    if (balance <= 0)
    {
        console.log("You have run out of money!");
        break;
    }

    let numberOfLines = getNumberOfLines();
    let betAmount = getBetAmount(balance, numberOfLines);
    const reels = spin();
    let winnings = getWinningsAmount(reels, betAmount);
    
    balance -= betAmount * numberOfLines;
    balance += winnings;

    for (let i = 0; i < COLS; i++)
    {
        let printString = "";
        for (let j = 0; j < ROWS; j++)
        {
            printString += reels[j][i] + " ";
        }
    
        console.log(printString);
    }

    console.log("You won: $" + winnings);
    console.log("Balance: $" + balance + " = $" + winnings + " - $" + betAmount * numberOfLines);
    

    let userChoice = prompt("Do you wish to play again? (Y for Yes): ");
    if (userChoice == 'Y')
        continue;
    else
        break;
}
