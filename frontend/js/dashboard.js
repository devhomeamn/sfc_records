document.addEventListener('DOMContentLoaded', async () => {
    const userNameElement = document.getElementById('userName');
    const userIdElement = document.getElementById('userId');
    const serviceIdElement=document.getElementById('serviceNo')
    const recordCountElement = document.getElementById('recordCount');

    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        alert('User not logged in. Redirecting to login page...');
        window.location.href = 'index.html';
        return;
    }

    // Populate sidebar with user details
    if (userNameElement) {
        userNameElement.innerText = ` ${user.fullName}`;
    } else {
        console.warn('Element with ID "userName" not found in the DOM.');
    }

    if (userIdElement) {
        userIdElement.innerText = `ID: ${user.username}`;
    } else {
        console.warn('Element with ID "userId" not found in the DOM.');
    }
    if (serviceIdElement) {
        serviceIdElement.innerText = `S ID : ${user.serviceNo}`;
    } else {
        console.warn('Element with Sid "serviceNo" not found in the DOM.');
    }

    // Fetch and display record count on dashboard
    try {
        const response = await fetch('http://localhost:5000/records');
        if (!response.ok) throw new Error('Failed to fetch records');

        const { records } = await response.json();
        if (recordCountElement) {
            recordCountElement.innerText = ` ${records.length}`;
        } else {
            console.warn('Element with ID "recordCount" not found in the DOM.');
        }
    } catch (error) {
        console.error('Failed to fetch records:', error.message);
        alert('Error fetching records. Please try again later.');
    }

    // Logout functionality
    const logoutElement = document.getElementById('logout');
    if (logoutElement) {
        logoutElement.addEventListener('click', () => {
            localStorage.removeItem('user');
            alert('Logged out successfully!');
            window.location.href = 'index.html';
        });
    } else {
        console.warn('Element with ID "logout" not found in the DOM.');
    }
});
