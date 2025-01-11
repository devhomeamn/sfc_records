document.addEventListener('DOMContentLoaded', () => {
    const CONFIG = {
        API_BASE_URL: 'http://localhost:5000', // Replace with your API base URL
        PATHS: {
            DASHBOARD: 'dashboard.html',
        },
        ELEMENT_IDS: {
            LOGIN_FORM: 'loginForm',
            USERNAME: 'username',
            PASSWORD: 'password',
        },
    };

    const loginForm = document.getElementById(CONFIG.ELEMENT_IDS.LOGIN_FORM);

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            username: document.getElementById(CONFIG.ELEMENT_IDS.USERNAME).value.trim(),
            password: document.getElementById(CONFIG.ELEMENT_IDS.PASSWORD).value.trim(),
        };

        if (!data.username || !data.password) {
            alert('Please fill in both username and password.');
            return;
        }

        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(result.user));
                window.location.href = CONFIG.PATHS.DASHBOARD;
            } else {
                alert(result.error || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error.message);
            alert('An error occurred. Please try again.');
        }
    });
});
