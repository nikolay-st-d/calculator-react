import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';

const buttonValues = [
    'C',
    '%',
    '**',
    '*',
    '1',
    '2',
    '3',
    '/',
    '4',
    '5',
    '6',
    '+',
    '7',
    '8',
    '9',
    '-',
    '00',
    '0',
    '.',
    '=',
];

const displayCharsLenght = 12;

const Calculator = () => {
    const [displayNumbers, setDisplayNumbers] = useState('0');
    const [expression, setExpression] = useState('');

    function calculateExpression(exp) {
        const operators = ['+', '-', '*', '/', '%', '**'];
        let result = 0;

        operators.forEach((operator) => {
            if (exp.includes(operator)) {
                let [left, right] = exp.split(operator);
                switch (operator) {
                    case '*':
                        result = Number(left) * Number(right);
                        break;
                    case '/':
                        result = Number(left) / Number(right);
                        break;
                    case '+':
                        result = Number(left) + Number(right);
                        break;
                    case '-':
                        result = Number(left) - Number(right);
                        break;
                    case '%':
                        result = (Number(left) * Number(right)) / 100;
                        break;
                    case '**':
                        result = Number(left) ** Number(right);
                        break;
                }
            }
        });
        if (!isNaN(result)) {
            return result;
        }
        return 'Error';
    }

    const buttonClickHandler = (value) => {
        if (value === 'C') {
            setDisplayNumbers('0');
            setExpression('');
        } else if (value === '=') {
            try {
                const result = calculateExpression(expression);
                setDisplayNumbers(
                    result.toString().substring(0, displayCharsLenght)
                );
                setExpression(
                    result.toString().substring(0, displayCharsLenght)
                );
            } catch (error) {
                setDisplayNumbers('Error');
                setExpression('');
            }
        } else {
            const newExpression = expression + value;
            if (newExpression.length > displayCharsLenght + 2) {
                setExpression(expression);
                setDisplayNumbers(expression);
            } else {
                setExpression(newExpression);
                setDisplayNumbers(newExpression);
            }
        }
    };

    return (
        <>
            <div className='frame'>
                <Display numbers={displayNumbers} />
                <div className='branding'>
                    <div className='brand'>Niko</div>
                    <div className='brand-add'>Powered by React</div>
                </div>

                <div className='buttons'>
                    {buttonValues.map((v) => (
                        <Button
                            key={v}
                            value={v}
                            onClick={() => buttonClickHandler(v)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Calculator;
