document.addEventListener('DOMContentLoaded', async () => {
    const CONFIG = {
        API_BASE_URL: 'http://localhost:5000', // Replace with a configurable base URL
        PATHS: {
            LOGIN_PAGE: 'index.html',
        },
        ELEMENT_IDS: {
            USER_NAME: 'userName',
            USER_ID: 'userId',
            SERVICE_ID: 'serviceNo',
            RECORD_COUNT: 'recordCount',
            LOGOUT: 'logout',
        },
    };

    const userNameElement = document.getElementById(CONFIG.ELEMENT_IDS.USER_NAME);
    const userIdElement = document.getElementById(CONFIG.ELEMENT_IDS.USER_ID);
    const serviceIdElement = document.getElementById(CONFIG.ELEMENT_IDS.SERVICE_ID);
    const recordCountElement = document.getElementById(CONFIG.ELEMENT_IDS.RECORD_COUNT);

    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        alert('User not logged in. Redirecting to login page...');
        window.location.href = CONFIG.PATHS.LOGIN_PAGE;
        return;
    }

    // Populate sidebar with user details
    if (userNameElement) {
        userNameElement.innerText = ` ${user.fullName}`;
    } else {
        console.warn(`Element with ID "${CONFIG.ELEMENT_IDS.USER_NAME}" not found in the DOM.`);
    }

    if (userIdElement) {
        userIdElement.innerText = `ID: ${user.username}`;
    } else {
        console.warn(`Element with ID "${CONFIG.ELEMENT_IDS.USER_ID}" not found in the DOM.`);
    }

    if (serviceIdElement) {
        serviceIdElement.innerText = `S ID: ${user.serviceNo}`;
    } else {
        console.warn(`Element with ID "${CONFIG.ELEMENT_IDS.SERVICE_ID}" not found in the DOM.`);
    }

    // Fetch and display record count on dashboard
    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}/records`);
        if (!response.ok) throw new Error('Failed to fetch records');

        const { records } = await response.json();
        if (recordCountElement) {
            recordCountElement.innerText = ` ${records.length}`;
        } else {
            console.warn(`Element with ID "${CONFIG.ELEMENT_IDS.RECORD_COUNT}" not found in the DOM.`);
        }
    } catch (error) {
        console.error('Failed to fetch records:', error.message);
        alert('Error fetching records. Please try again later.');
    }

    // Logout functionality
    const logoutElement = document.getElementById(CONFIG.ELEMENT_IDS.LOGOUT);
    if (logoutElement) {
        logoutElement.addEventListener('click', () => {
            localStorage.removeItem('user');
            alert('Logged out successfully!');
            window.location.href = CONFIG.PATHS.LOGIN_PAGE;
        });
    } else {
        console.warn(`Element with ID "${CONFIG.ELEMENT_IDS.LOGOUT}" not found in the DOM.`);
    }
});
