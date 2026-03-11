// SVTraders - Client App

const API_BASE = 'http://localhost:5000/api';

// Check API health
async function checkHealth() {
    try {
        const res = await fetch(`${API_BASE}/health`);
        const data = await res.json();
        console.log('API Status:', data.message);
    } catch (err) {
        console.log('API not reachable');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    checkHealth();
});
