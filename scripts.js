//Variables

var Operation = document.getElementById('operation');
var Result = document.getElementById('result');
var buttons = document.getElementById('buttons');
var operationComplete = false;

//Eliminador 0 inicial

var lastValue = function lastValue() {
    return Operation.textContent.substring(Operation.textContent.length - 1);
};

//Borrar uno a uno



//Limpiar pantalla

var resetScreen = function resetScreen() {
    Operation.textContent = '0';
    Result.textContent = '0';
};

//Operador

var writeOperation = function writeOperation(text) {
    if (Operation.textContent == '0' && text != '.') Operation.textContent = '';

    if (operationComplete && isNaN(text)) {
        Operation.textContent = Result.textContent;
        operationComplete = false;
    }

    if (operationComplete && !isNaN(text)) {
        Operation.textContent = '';
        Result.textContent = '0';
        operationComplete = false;
    }

    if (isNaN(lastValue()) && isNaN(text)) {
        Operation.textContent = Operation.textContent.substring(0, Operation.textContent.length - 1);
    } else if (Operation.textContent.length < 24) {
        Operation.textContent += text;
    }
};

//Indicador de Resultado

var writeResult = function writeResult() {

    if (isNaN(lastValue()) && lastValue() !== ')') Operation.textContent = Operation.textContent.substring(0, Operation.textContent.length - 1);

    Result.textContent = eval(Operation.textContent);
    operationComplete = true;

    if (Result.textContent.length > 9) {
        Result.style.fontSize = '32px';
        Result.style.marginTop = '16px';
    }
};

var changeSign = function changeSign() {
    var lastNumber = '';
    var position = 0;

    if (!isNaN(lastValue())) {
        for (var i = Operation.textContent.length - 1; i > 0; i--) {
            if (isNaN(Operation.textContent[i])) {
                position = i + 1;
                break;
            }
        }
    }

    lastNumber = Operation.textContent.substring(position);
    Operation.textContent = Operation.textContent.replace(lastNumber, '(' + lastNumber * -1 + ')');
};

//Botones especiales

buttons.addEventListener('click', function (e) {
    if (e.target.textContent !== '') {
        switch (e.target.textContent) {
            case '=':
                writeResult();break;
            case 'C':
                resetScreen();break;
            case '+/-':
                changeSign();break;
            case ',':
                writeOperation('.');break;
            default:
                writeOperation(e.target.textContent);break;
        }
    }
});