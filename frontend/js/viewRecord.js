document.addEventListener('DOMContentLoaded', () => {
    const CONFIG = {
        API_BASE_URL: 'http://localhost:5000', // Replace with your API base URL
        ELEMENT_IDS: {
            RECORD_TABLE_BODY: 'recordTableBody',
            SEARCH_BUTTON: 'searchButton',
            SEARCH_BD_NUMBER: 'searchBDNumber',
        },
    };

    const recordTableBody = document.getElementById(CONFIG.ELEMENT_IDS.RECORD_TABLE_BODY);
    const searchButton = document.getElementById(CONFIG.ELEMENT_IDS.SEARCH_BUTTON);
    const searchBDNumber = document.getElementById(CONFIG.ELEMENT_IDS.SEARCH_BD_NUMBER);

    const fetchRecords = async (query = '') => {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/records${query}`);
            if (!response.ok) throw new Error('Failed to fetch records');

            const { records } = await response.json();

            // Clear the table if no records found
            if (records.length === 0) {
                alert('No records found.');
                recordTableBody.innerHTML = '';
                return;
            }

            // Populate the table with fetched records
            recordTableBody.innerHTML = records
                .map(
                    (record) => `
                <tr>
                    <td>${record.serialNumber}</td>
                    <td>${record.sectionName}</td>
                    <td>${record.category}</td>
                    <td>${record.bdNumber}</td>
                    <td>${record.shelveNumber}</td>
                    <td>${record.closingDate}</td>
                    <td>${record.enteredBy}</td>
                    <td>${record.concernTS || 'N/A'}</td>
                    <td>${record.centralRecordRoom}</td>
                    <td>${record.roomNo || 'N/A'}</td>
                </tr>
            `
                )
                .join('');
        } catch (error) {
            console.error('Error fetching records:', error.message);
            alert('Error fetching records. Please try again later.');
        }
    };

    // Search functionality
    searchButton.addEventListener('click', () => {
        const bdNumber = searchBDNumber.value.trim();
        const query = bdNumber ? `?bdNumber=${encodeURIComponent(bdNumber)}` : '';
        fetchRecords(query);
    });

    // Fetch all records on page load
    fetchRecords();
});
