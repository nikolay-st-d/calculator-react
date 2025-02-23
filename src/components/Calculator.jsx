import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';

const buttonValues = [
    'C',
    '1',
    '*',
    '/',
    '2',
    '3',
    '4',
    '+',
    '5',
    '6',
    '7',
    '-',
    '8',
    '9',
    '0',
    '.',
    '=',
];

const displayChersLenght = 12;

const Calculator = () => {
    const [displayNumbers, setDisplayNumbers] = useState('0');
    const [expression, setExpression] = useState('');

    const buttonClickHandler = (value) => {
        if (value === 'C') {
            setDisplayNumbers('0');
            setExpression('');
        } else if (value === '=') {
            try {
                const result = eval(expression);
                setDisplayNumbers(
                    result.toString().substring(0, displayChersLenght)
                );
                setExpression(result.toString().substring(0, displayChersLenght));
            } catch (error) {
                setDisplayNumbers('Error');
                setExpression('');
            }
        } else {
            const newExpression = expression + value;
            if (newExpression.length > displayChersLenght + 2) {
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
