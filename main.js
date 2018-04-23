const calculator = document.querySelector('.calculator'),
    keys = calculator.querySelector('.calculator__keys'),
    display = document.querySelector('.calculator__display');

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target,
            action = key.dataset.action,
            keyContent = key.textContent,
            displayedNum = display.textContent,
            previousKeyType = calculator.dataset.previousKeyType;


        Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('is-depressed'));

        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent
                calculator.dataset.previousKeyType = null;
            } else {
                display.textContent = displayedNum + keyContent
            }
        }
        if (action === 'decimal') {
            display.textContent = displayedNum + '.';
        }
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.firstValue = displayedNum
            calculator.dataset.operator = action
        }

        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            display.textContent = calculate(firstValue, operator, secondValue)
        }
    }
})


const calculate = (n1, operator, n2) => {
    let result = ''

    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2)
    } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2)
    } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2)
    } else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2)
    }

    return result
}
