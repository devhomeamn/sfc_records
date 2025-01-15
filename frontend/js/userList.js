document.addEventListener('DOMContentLoaded', () => {
    const CONFIG = {
            
            API_BASE_URL: '',
            ENDPOINTS: {
                USERS: '/users',
                LOGIN: '/auth/login',
                SIGNUP: '/auth/signup',
            },
    
       
        ELEMENT_IDS: {
            USER_TABLE_BODY: 'userTableBody',
        },



    };

    const userTableBody = document.getElementById(CONFIG.ELEMENT_IDS.USER_TABLE_BODY);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.USERS}`);
               
            if (!response.ok) throw new Error('Failed to fetch users');

            const users = await response.json();

            // Populate the table with user data
            userTableBody.innerHTML = users
                .map(user => `
                    <tr>
                        <td>${user.fullName || 'N/A'}</td>
                        <td>${user.username || 'N/A'}</td>
                        <td>${user.serviceNo || 'N/A'}</td>
                        <td>${user.mobileNo || 'N/A'}</td>
                    </tr>
                `)
                .join('');
        } catch (error) {
            console.error('Error fetching users:', error.message);
            alert('Error fetching users. Please try again later.');
        }
    };

    // Fetch users on page load
    fetchUsers();
});
