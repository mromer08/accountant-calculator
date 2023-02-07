// ============== display
const display = document.querySelector('.display');

// ============== parenthesis ( )
const parenthesis = document.querySelector('#parenthesis');
let balanceParenthesis = 0;
parenthesis.addEventListener('click', () => {
    const currentDisplay = display.innerHTML;
    if (balanceParenthesis > 0) {
        if (/\d$/){balanceParenthesis--; display.innerHTML = `${currentDisplay})`;}
        else if (/[\+\-\×\÷\(]$/.test(currentDisplay)) {balanceParenthesis++; display.innerHTML = `${currentDisplay}(`;}
    } else {
        if (/\d$/) {balanceParenthesis++; display.innerHTML = `${currentDisplay}×(`;}
    }
});

// ============== ac & delete
const ac = document.querySelector('#ac');
const del = document.querySelector('#delete');
ac.addEventListener('click', () => {
    display.innerHTML = '0';
    balanceParenthesis = 0;
});
    
del.addEventListener('click', () => {
    const currentDisplay = display.innerHTML;
    if (/\($/.test(currentDisplay)) balanceParenthesis--;
    if (/\)$/.test(currentDisplay)) balanceParenthesis++;
    display.innerHTML = currentDisplay.length === 1 ? '0' : currentDisplay.substring(0,currentDisplay.length-1);
});



// ============== sig +/-
const sig = document.querySelector('#sig');
sig.addEventListener('click', () => {
    const currentDisplay = display.innerHTML;
    let newDisplay = currentDisplay;
    if (/\(\-$/.test(currentDisplay)) newDisplay = currentDisplay.replace(/\(\-$/,'');
    else if (/[\+\-\×\÷]$/.test(currentDisplay)) newDisplay = `${currentDisplay}(-`;
    else if (/[\%\)]$/.test(currentDisplay)) newDisplay = `${currentDisplay}×(-`
    else if (/\(\-(\d+(.\d+)?)$/.test(currentDisplay)) {balanceParenthesis--; newDisplay = currentDisplay.replace(/\(\-(\d+(.\d+)?)$/,'$1');}
    else if (/(\d+(.\d+)?)$/.test(currentDisplay)) {balanceParenthesis++; newDisplay = currentDisplay.replace(/(\d+(.\d+)?)$/,'(-$1');}

    display.innerHTML = currentDisplay === '0' ? '0' : newDisplay;
});

// ============== operators
const operations = Array.from(document.querySelectorAll(`div[class="button operation"]`)).filter((element) => !/[\(\%]/g.test(element.textContent));
console.log(operations)
const operationHandler = (element) => {
    const currentDisplay = display.innerHTML;
    const operator = element.innerHTML;
    if (/[\+\-\×\÷]$/.test(currentDisplay)) display.innerHTML = currentDisplay.replace(/[\+\-\×\÷]$/,`${operator}`);
    else if (/[\d\%\)]$/.test(currentDisplay)) display.innerHTML = `${currentDisplay + operator}`
};
operations.forEach((element) => element.addEventListener('click',() => operationHandler(element)));

const percent = document.querySelector('#percent');
percent.addEventListener('click',()=>{
    const currentDisplay = display.innerHTML;
    if(/[\)\d]$/.test(currentDisplay)) display.innerHTML = `${currentDisplay}%`;
});


// ============== numbers
const numbers = Array.from(document.querySelectorAll(`div[class^="button number-"]`)).sort((a,b)=> a.textContent - b.textContent);

const numberHandler = (n) => {
    // if (prevOperation !== null) {
    //   setUnSelectedOperation(prevOperation);
    //   display.innerHTML = '';
    //   activeOperation = null;
    // }
    ac.innerHTML = 'C';
    const currentDisplay = display.innerHTML;
    display.innerHTML = currentDisplay === '0' ? n : `${currentDisplay + n}`;
  };

numbers.forEach((n,i) => n.addEventListener('click', () => numberHandler(i)));

