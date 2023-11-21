export function visualizeMedianOfMedians() {
    const arr = prompt("Insira um array de números separados por espaço:");

    const arrDigits = arr.split(' ').map(Number);
    const result = medianOfMedians(arrDigits);

    const visualizationContainer = document.getElementById('visualization-container');
    visualizationContainer.innerHTML = '';

    const inputArrayDiv = document.createElement('div');
    inputArrayDiv.innerHTML = `<p>Array de entrada: [${arrDigits.join(', ')}]</p>`;
    visualizationContainer.appendChild(inputArrayDiv);

    for (let i = 0; i < result.steps.length; i++) {
        const stepDiv = document.createElement('div');
        stepDiv.innerHTML = `<p>Passo ${i + 1}: ${result.steps[i]}</p>`;
        visualizationContainer.appendChild(stepDiv);
    }

    const resultDiv = document.createElement('div');
    resultDiv.innerHTML = `<p>Mediana: ${result.finalResult}</p>`;
    visualizationContainer.appendChild(resultDiv);
    console.log("is there anyone at home?");
}

function medianOfMedians(arr) {
    const chunkSize = 5;
    const chunks = [];

    for (let i = 0; i < arr.length; i += chunkSize) {
        chunks.push(arr.slice(i, i + chunkSize));
    }

    const medians = chunks.map(chunk => {
        return chunk.sort((a, b) => a - b)[Math.floor(chunk.length / 2)];
    });

    if (medians.length <= 5) {
        return {
            steps: [`Ordene as medianas: [${medians.join(', ')}]`],
            finalResult: medians.sort((a, b) => a - b)[Math.floor(medians.length / 2)]
        };
    } else {
        const recursiveResult = medianOfMedians(medians);
        return {
            steps: [`Ordene as medianas: [${medians.join(', ')}]`,
            ...recursiveResult.steps
            ],
            finalResult: recursiveResult.finalResult
        };
    }
}