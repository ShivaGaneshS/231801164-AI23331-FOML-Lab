document.getElementById('churnForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Collect form data
    const age = document.getElementById('age').value;
    const monthlySpend = document.getElementById('monthlySpend').value;
    const tenure = document.getElementById('tenure').value;

    // Send data to backend
    try {
        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                age: parseInt(age),
                monthlySpend: parseFloat(monthlySpend),
                tenure: parseInt(tenure)
            })
        });

        const result = await response.json();
        displayResult(result.prediction);
    } catch (error) {
        console.error('Error:', error);
        displayResult('Error: Unable to fetch prediction');
    }
});

// Display result
function displayResult(prediction) {
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `Prediction: ${prediction}`;
}
