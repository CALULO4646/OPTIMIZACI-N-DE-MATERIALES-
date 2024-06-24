// script.js
let resultsChartBar;
let resultsChartLine;

function calculate() {
    const area = parseFloat(document.getElementById('area').value);
    const thickness = parseFloat(document.getElementById('thickness').value);
    const density = parseFloat(document.getElementById('density').value);
    const costPerUnit = parseFloat(document.getElementById('costPerUnit').value);

    if (isNaN(area) || isNaN(thickness) || isNaN(density) || isNaN(costPerUnit)) {
        alert('Por favor, ingrese valores válidos en todos los campos.');
        return;
    }

    const volume = area * thickness;
    const weight = volume * density;
    const cost = volume * costPerUnit;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <p>Volumen: ${volume.toFixed(2)} m³</p>
        <p>Peso: ${weight.toFixed(2)} kg</p>
        <p>Costo: $${cost.toFixed(2)}</p>
    `;

    updateCharts(volume, weight, cost);
}

function resetForm() {
    document.getElementById('calcForm').reset();
    document.getElementById('results').innerHTML = '';
    updateCharts(0, 0, 0);
}

function updateCharts(volume, weight, cost) {
    const ctxBar = document.getElementById('resultsChartBar').getContext('2d');
    const ctxLine = document.getElementById('resultsChartLine').getContext('2d');
    
    if (resultsChartBar) {
        resultsChartBar.destroy();
    }
    if (resultsChartLine) {
        resultsChartLine.destroy();
    }

    resultsChartBar = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['Volumen', 'Peso', 'Costo'],
            datasets: [{
                label: 'Valores',
                data: [volume, weight, cost],
                backgroundColor: ['#3498db', '#e74c3c', '#2ecc71'], /* Colores del gráfico */
                borderColor: ['#2980b9', '#c0392b', '#27ae60'], /* Colores del borde del gráfico */
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Valores'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Variables'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.parsed.y.toFixed(2);
                            return label;
                        }
                    }
                }
            }
        }
    });

    resultsChartLine = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: ['Volumen', 'Peso', 'Costo'],
            datasets: [{
                label: 'Valores',
                data: [volume, weight, cost],
                borderColor: '#3498db', /* Color de la línea */
                fill: false,
                pointBackgroundColor: ['#3498db', '#e74c3c', '#2ecc71'], /* Nuevos colores */
                pointBorderColor: '#000',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Valores'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Variables'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.parsed.y.toFixed(2);
                            return label;
                        }
                    }
                }
            }
        }
    });
}

// Load Chart.js library dynamically
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
script.onload = () => updateCharts(0, 0, 0); // Initialize with empty data
document.head.appendChild(script);
