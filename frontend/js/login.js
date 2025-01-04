const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };

    try {
        const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (response.status === 200) {
            localStorage.setItem('user', JSON.stringify(result.user));
            window.location.href = 'dashboard.html';
        } else {
            alert(result.error || 'Login failed');
        }
    } catch (error) {
        alert('An error occurred: ' + error.message);
    }
});
