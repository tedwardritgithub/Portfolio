let resultField = document.getElementById('result');

function appendValue(value) {
    resultField.value += value;
}

function clearResult() {
    resultField.value = '';
}

function calculateResult() {
    try {
        resultField.value = eval(resultField.value);
    } catch (error) {
        alert('Invalid calculation');
    }
}