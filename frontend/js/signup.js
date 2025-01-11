document.addEventListener('DOMContentLoaded', () => {
    const CONFIG = {
        API_BASE_URL: 'http://localhost:5000', // Replace with your API base URL
        PATHS: {
            LOGIN_PAGE: 'index.html',
        },
        ELEMENT_IDS: {
            SIGNUP_FORM: 'signupForm',
            FULL_NAME: 'fullName',
            USERNAME: 'username',
            SERVICE_NO: 'serviceNo',
            MOBILE_NO: 'mobileNo',
            PASSWORD: 'password',
        },
    };

    const signupForm = document.getElementById(CONFIG.ELEMENT_IDS.SIGNUP_FORM);

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Gather data dynamically
        const data = {
            fullName: document.getElementById(CONFIG.ELEMENT_IDS.FULL_NAME).value.trim(),
            username: document.getElementById(CONFIG.ELEMENT_IDS.USERNAME).value.trim(),
            serviceNo: document.getElementById(CONFIG.ELEMENT_IDS.SERVICE_NO).value.trim(),
            mobileNo: document.getElementById(CONFIG.ELEMENT_IDS.MOBILE_NO).value.trim(),
            password: document.getElementById(CONFIG.ELEMENT_IDS.PASSWORD).value.trim(),
        };

        // Basic client-side validation
        if (!data.fullName || !data.username || !data.serviceNo || !data.mobileNo || !data.password) {
            alert('All fields are required. Please fill out the form completely.');
            return;
        }

        try {
            // Send data to the backend API
            const response = await fetch(`${CONFIG.API_BASE_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (response.status === 201) {
                alert(result.message || 'Signup successful. Please login.');
                window.location.href = CONFIG.PATHS.LOGIN_PAGE; // Redirect to login page
            } else {
                alert(result.error || 'Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Signup error:', error.message);
            alert('An error occurred. Please try again later.');
        }
    });
});
