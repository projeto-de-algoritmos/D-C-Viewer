import { visualizeKaratsuba } from "./karatsuba.js";
import { visualizeMedianOfMedians } from "./medians.js";

const visualizeButton = document.getElementById('visualize-button');
visualizeButton.addEventListener('click', visualizeAlgorithm);

function visualizeAlgorithm() {
    console.log("hello, is there anybody in there?");

    const selectedAlgorithm = document.getElementById('algorithm').value;
    const visualizationContainer = document.getElementById('visualization-container');

    // Clear the visualization container
    visualizationContainer.innerHTML = '';

    switch (selectedAlgorithm) {
        case 'karatsuba':
            visualizeKaratsuba();
            break;
        case 'medians':
            visualizeMedianOfMedians();
            break;
        //
    }
}
