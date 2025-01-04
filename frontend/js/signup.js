const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        fullName: document.getElementById('fullName').value,
        username: document.getElementById('username').value,
        serviceNo: document.getElementById('serviceNo').value,
        mobileNo: document.getElementById('mobileNo').value,
        password: document.getElementById('password').value,
    };

    try {
        const response = await fetch('http://localhost:5000/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (response.status === 201) {
            alert('Signup successful. Please login.');
            window.location.href = 'index.html';
        } else {
            alert(result.error || 'Signup failed');
        }
    } catch (error) {
        alert('An error occurred: ' + error.message);
    }
});
