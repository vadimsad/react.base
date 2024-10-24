function add(a: number, b: number): number {
    return a + b;
}

const addResult1 = add(2, 1); // 3
const addResult2 = add(0x21fa, 9); // 8707
const addResult3 = add(0b1001, 0b1001); // 18

console.log(addResult1, addResult2, addResult3);

function subtract(a: number, b: number): number {
    return a - b;
}

const subtractResult1 = subtract(2, 1); // 1
const subtractResult2 = subtract(0x21fa, 9); // 8689
const subtractResult3 = subtract(0b1001, 0b1001); // 0

console.log(subtractResult1, subtractResult2, subtractResult3);

function multiply(a: number, b: number): number {
    return a * b;
}

const multiplyResult1 = multiply(2, 1); // 2
const multiplyResult2 = multiply(0x21fa, 9); // 78282
const multiplyResult3 = multiply(0b1001, 0b1001); // 81

console.log(multiplyResult1, multiplyResult2, multiplyResult3);

function divide(a: number, b: number): number {
    return a / b;
}

const divideResult1 = divide(2, 1); // 2
const divideResult2 = divide(0x21fa, 9); // 966.4444444444445
const divideResult3 = divide(0b1001, 0b1001); // 1

console.log(divideResult1, divideResult2, divideResult3);