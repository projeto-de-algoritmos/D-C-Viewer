export function visualizeKaratsuba() {
    const num1 = prompt("Insira o primeiro número:");
    const num2 = prompt("Insira o segundo número:");

    const num1Digits = num1.split('').map(Number);
    const num2Digits = num2.split('').map(Number);
    if (num1Digits.length != num2Digits.length) {
        alert("Números tem que ter a mesma quantidade de digitos!");
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
    const a = num1.slice(0, half);
    const b = num1.slice(half);
    const c = num2.slice(0, half);
    const d = num2.slice(half);

    const ac = karatsubaMultiply(a, c);
    const bd = karatsubaMultiply(b, d);
    // console.log('all: ' + a + ' ' + b + ' ' + c + ' ' + d);
    // console.log('adds: ' + add(a, b) + ' ' + add(c, d));
    const a_b = add(a, b);
    const c_d = add(c, d);
    (a_b.length < c_d.length) ? a_b.unshift(0) : (a_b.length > c_d.length) ? c_d.unshift(0) : 'come on, now'
    const ad_bc = karatsubaMultiply(a_b, c_d);

    const step1 = ac.finalResult * Math.pow(10, n);
    const step2 = (ad_bc.finalResult - ac.finalResult - bd.finalResult) * Math.pow(10, half);
    const finalResult = step1 + step2 + bd.finalResult;

    return {
        steps: [
            ...ac.steps,
            ...bd.steps,
            ...ad_bc.steps,
            `Combine os resultados: ${step1} + ${step2} + ${bd.finalResult} = ${finalResult}`
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

    while (carry > 0) {
        result.unshift(carry % 10);
        carry = Math.floor(carry / 10);
    }

    return result;
}
