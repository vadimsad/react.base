function add(a, b) {
    return a + b;
}
var addResult1 = add(2, 1); // 3
var addResult2 = add(0x21fa, 9); // 8707
var addResult3 = add(9, 9); // 18
console.log(addResult1, addResult2, addResult3);
function subtract(a, b) {
    return a - b;
}
var subtractResult1 = subtract(2, 1); // 1
var subtractResult2 = subtract(0x21fa, 9); // 8689
var subtractResult3 = subtract(9, 9); // 0
console.log(subtractResult1, subtractResult2, subtractResult3);
function multiply(a, b) {
    return a * b;
}
var multiplyResult1 = multiply(2, 1); // 2
var multiplyResult2 = multiply(0x21fa, 9); // 78282
var multiplyResult3 = multiply(9, 9); // 81
console.log(multiplyResult1, multiplyResult2, multiplyResult3);
function divide(a, b) {
    return a / b;
}
var divideResult1 = divide(2, 1); // 2
var divideResult2 = divide(0x21fa, 9); // 966.4444444444445
var divideResult3 = divide(9, 9); // 1
console.log(divideResult1, divideResult2, divideResult3);
