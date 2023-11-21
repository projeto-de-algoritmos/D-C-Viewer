export function visualizeKaratsuba() {
    const num1 = prompt("Insira o primeiro número (entre 4 e 8 dígitos):");
    const num2 = prompt("Insira o segundo número:");

    const num1Digits = num1.split('').map(Number);
    const num2Digits = num2.split('').map(Number);
    if (num1Digits.length != num2Digits.length) {
        alert("Números tem que ter a mesma quantidade de digitos!");
        return 0;
    }
    if (num1Digits.length < 4 || num1Digits.length > 8) {
        alert("Use números que tenham entre 4 e 8 dígitos!");
        return 0;
    }

    const result = karatsubaMultiply(num1Digits, num2Digits);

    const visualizationContainer = document.getElementById('visualization-container');

    const inputValuesDiv = document.createElement('div');
    inputValuesDiv.innerHTML = `<p>Multiplicando ${num1} com ${num2}</p>`;
    visualizationContainer.appendChild(inputValuesDiv);

    for (let i = 0; i < result.steps.length; i++) {
        const stepDiv = document.createElement('div');
        stepDiv.innerHTML = `<p>Passo ${i + 1}: ${result.steps[i]}</p>`;
        visualizationContainer.appendChild(stepDiv);
    }

    const resultDiv = document.createElement('div');
    resultDiv.innerHTML = `<p>Resultado final: ${result.finalResult}</p>`;
    visualizationContainer.appendChild(resultDiv);
}

function karatsubaMultiply(num1, num2) {
    const n = Math.max(num1.length, num2.length);

    if (n === 1) {
        const product = ((num1[0]) ? num1[0] : 0) * ((num2[0]) ? num2[0] : 0);
        return {
            steps: [`Multiplique ${num1[0]} com ${num2[0]}`],
            finalResult: product
        };
    }

    const half = Math.floor(n / 2);
    const x1 = num1.slice(0, half);
    const x0 = num1.slice(half);
    const y1 = num2.slice(0, half);
    const y2 = num2.slice(half);
    // (x1.length < x0.length) ? x1.unshift(0) : (x1.length > x0.length) ? x0.unshift(0) : console.log('come on, now X1X0');
    // (y1.length < y2.length) ? y1.unshift(0) : (y1.length > y2.length) ? y2.unshift(0) : console.log('come on, now Y1Y0');
    // console.log('all before: ' + x1 + ' ' + x0 + ' ' + y1 + ' ' + y2);

    const x1y1 = karatsubaMultiply(x1, y1);
    const x0y0 = karatsubaMultiply(x0, y2);
    // console.log('all: ' + x1 + ' ' + x0 + ' ' + y1 + ' ' + y2);
    // console.log('adds: ' + add(x1, x0) + ' ' + add(y1, y2));
    const x1_x0 = add(x1, x0);
    const y1_y0 = add(y1, y2);
    (x1_x0.length < y1_y0.length) ? x1_x0.unshift(0) : (x1_x0.length > y1_y0.length) ? y1_y0.unshift(0) : console.log('come on, now');
    const z1 = karatsubaMultiply(x1_x0, y1_y0);

    // console.log('ac(z2) = ' + x1y1.finalResult)
    // console.log('ad_bc(z1) = ' + z1.finalResult)
    // console.log('bd(z0) = ' + x0y0.finalResult)
    const step1 = x1y1.finalResult * Math.pow(10, n);
    const step2 = (z1.finalResult - x1y1.finalResult - x0y0.finalResult) * Math.pow(10, half);
    const finalResult = step1 + step2 + x0y0.finalResult;

    return {
        steps: [
            ...x1y1.steps,
            ...x0y0.steps,
            ...z1.steps,
            `Combine os resultados: ${step1} + ${step2} + ${x0y0.finalResult} = ${finalResult}`
        ],
        finalResult: finalResult
    };
}

function add(arr1, arr2) {
    const result = [];
    let carry = 0;

    (arr1.length < arr2.length) ? arr1.unshift(0) : (arr2.length < arr1.length) ? arr2.unshift(0) : console.log('just nod if you can hear me');
    
    for (let i = arr1.length - 1; i >= 0; i--) {
        const sum = arr1[i] + arr2[i] + carry;
        result.unshift(sum % 10);
        carry = Math.floor(sum / 10);
    }

    if (carry > 0) {
        result.unshift(1);
    }

    return result;
}