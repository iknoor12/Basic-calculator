const body = document.querySelector('body');

const style = document.createElement('style');
style.textContent = `
    body {
        margin: 0;
        padding: 0;
        justify-items: center;
        background-color: #ec9898ff;
    }

    .calculator {
        border: 1px solid black;
        border-radius: 2em;
        display: grid;
        justify-items: center;
        gap: 1.2em;
        margin-top: 2em;
        padding: 3em 4em 0em 4em;
        background-color: #cd5656a1;
        box-shadow: 8px 8px 20px 4px rgba(135, 133, 133, 0.88);  // Horizontal(3px to right), Vertical(3px downward), Blur, Spread radius
    }

    #display {
        padding: 1rem 1rem;
        width: 95%;
        font-size: 1.5em;
        text-decoration: none;
        border-radius: 0.5rem;
    }

    .buttons {
        display: grid;
        grid-template-columns: repeat(4, 80px);          
        grid-template-rows: repeat(4, 90px);           
        gap: 18px;
        padding: 1em 1em;
        margin-bottom: 2em;
    }

    .buttons button {
        font-size: 2em;
        background-color: #EAEBD0;
        box-shadow: 8px 8px 1px 2px rgba(135, 133, 133, 0.81);
        border: none;
        border-radius: 0.5rem;
    }

    .history {
        background-color: #EAEBD0;
        padding: 2em 1em;
        margin-bottom: 2em;
        text-align: center;
        width: 90%;
        font-size: 1.5em;
    }

    .hisbtn {
        font-size: 1.1em;
        padding: 0.5rem 0.8rem;
        width: 60%;
    }
`;
document.head.appendChild(style);



const mainHeading = document.createElement('h1');
mainHeading.textContent = 'A Basic Calculator';


const mainDiv = document.createElement('div');
mainDiv.classList.add('calculator');
body.append(mainHeading, mainDiv);


const inputSpace = document.createElement('input');
inputSpace.setAttribute('placeholder', 'Type numbers..');
inputSpace.setAttribute('type', 'text');
inputSpace.id = 'display';



const minDiv = document.createElement('div');
minDiv.classList.add('buttons');

mainDiv.append(inputSpace, minDiv);


const btn1 = document.createElement('button');
btn1.textContent='1';
const btn2 = document.createElement('button');
btn2.textContent='2';
const btn3 = document.createElement('button');
btn3.textContent='3';
const btnSubt = document.createElement('button');
btnSubt.textContent='-';
const btn4 = document.createElement('button');
btn4.textContent='4';
const btn5 = document.createElement('button');
btn5.textContent='5';
const btn6 = document.createElement('button');
btn6.textContent='6';
const btnMult = document.createElement('button');
btnMult.textContent='*';
const btn7 = document.createElement('button');
btn7.textContent='7';
const btn8 = document.createElement('button');
btn8.textContent='8';
const btn9 = document.createElement('button');
btn9.textContent='9';
const btnSlash = document.createElement('button');
btnSlash.textContent='/';
const btn0 = document.createElement('button');
btn0.textContent='0';
const btnEqu = document.createElement('button');
btnEqu.textContent='=';
const btnAdd = document.createElement('button');
btnAdd.textContent='+';
const btnDelt = document.createElement('button');
btnDelt.textContent='C';

minDiv.append(btn1,btn2,btn3,btnSubt,btn4,btn5,btn6,btnMult,btn7,btn8,btn9,btnSlash,btnDelt,btn0,btnEqu,btnAdd)




// History Section
let historySpace = document.createElement('div');
historySpace.classList.add('history');
historySpace.style.display = 'none';
mainDiv.append(historySpace);


let historyBtn = document.createElement('button');
historyBtn.classList.add('hisbtn');
historyBtn.textContent = "📜 Show History";
mainDiv.insertBefore(historyBtn, minDiv);


let historyList = JSON.parse(localStorage.getItem('calculationHistory')) || [];

function renderHistory() {
    historySpace.innerHTML = '<h3>History: </h3>';

    historyList.forEach(item => {
        let historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        historyItem.textContent = item;
        historySpace.appendChild(historyItem);
    });

}


historyBtn.addEventListener('click', () => {
    if (historySpace.style.display === 'none') {
        historySpace.style.display = 'block';
        minDiv.style.display = 'none';
        historyBtn.textContent = "🔙 Back to Calculator";
    } else {
        historySpace.style.display = 'none';
        minDiv.style.display = 'grid';
        historyBtn.textContent = "📜 Show History";
    }
});



const display = document.getElementById('display');

const buttons = document.querySelectorAll('.buttons button');

const operators = ['+', '-', '*', '/'];


buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (value === "=") {
            try {
                let expression = display.value;
                if (expression.trim() !== "") {
                    let result = eval(expression);
                    display.value = result;

                    let entry = `${expression} = ${result}`;
                    historyList.push(entry);
                    localStorage.setItem('calculationHistory', JSON.stringify(historyList));
                    renderHistory();
                }
            } catch {
                display.value = "Error";
            }
            return;
        }

        if (value === "C") {
            display.value = "";
            return;
        }

        if (display.value === "Error" || display.value === "undefined") {
            display.value = "";
        }

        // Prevent double operators
        const lastChar = display.value.slice(-1);
        if (operators.includes(lastChar) && operators.includes(value)) {
            return;
        }

        display.value += value;
    });
});

// Load previous history
renderHistory();
