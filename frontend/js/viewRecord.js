document.addEventListener('DOMContentLoaded', () => {
    const CONFIG = {
        API_BASE_URL: '', // Replace with your API base URL
        ELEMENT_IDS: {
            RECORD_TABLE_BODY: 'recordTableBody',
            SEARCH_BUTTON: 'searchButton',
            SEARCH_BD_NUMBER: 'searchBDNumber',
        },
    };

    const recordTableBody = document.getElementById(CONFIG.ELEMENT_IDS.RECORD_TABLE_BODY);
    const searchButton = document.getElementById(CONFIG.ELEMENT_IDS.SEARCH_BUTTON);
    const searchBDNumber = document.getElementById(CONFIG.ELEMENT_IDS.SEARCH_BD_NUMBER);
    const editModal = document.getElementById('editModal');
    const editForm = document.getElementById('editForm');
    const cancelEdit = document.getElementById('cancelEdit');
    const editRecordId = document.getElementById('editRecordId');
    const editSectionName = document.getElementById('editSectionName');
    const editCategory = document.getElementById('editCategory');
    const editBDNumber = document.getElementById('editBDNumber');
    const editShelveNumber = document.getElementById('editShelveNumber');

    // Fetch Records
    const fetchRecords = async (query = '') => {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/records${query}`);
            if (!response.ok) throw new Error('Failed to fetch records');
            const { records } = await response.json();

            if (records.length === 0) {
                alert('No records found.');
                recordTableBody.innerHTML = '';
                return;
            }

            recordTableBody.innerHTML = records.map(record => `
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
                    <td>
            <!-- Styled Edit Button -->
            <button class="editBtn" data-id="${record._id}">
                <i class="fas fa-edit"></i> <!-- Edit icon -->
            </button>
            <!-- Styled Delete Button -->
            <button class="deleteBtn" data-id="${record._id}">
                <i class="fas fa-trash"></i> <!-- Delete icon -->
            </button>
        </td>
                </tr>
            `).join('');
        } catch (error) {
            console.error('Error fetching records:', error.message);
            alert('Error fetching records. Please try again later.');
        }
    };

    // Search Records
    searchButton.addEventListener('click', () => {
        const bdNumber = searchBDNumber.value.trim();
        const query = bdNumber ? `?bdNumber=${encodeURIComponent(bdNumber)}` : '';
        fetchRecords(query);
    });

    // Handle Record Actions
    recordTableBody.addEventListener('click', async (event) => {
        const recordId = event.target.dataset.id;

        // Edit Button Logic
        if (event.target.classList.contains('editBtn')) {
            console.log('Editing record with ID:', recordId);
            if (!recordId) {
                alert('Error: Unable to find record ID for editing.');
                return;
            }

            try {
                const record = await fetch(`${CONFIG.API_BASE_URL}/records/${recordId}`).then(res => res.json());
                if (!record) {
                    alert('Error: Record not found.');
                    return;
                }

                // Populate modal fields
                editRecordId.value = record._id;
                editSectionName.value = record.sectionName;
                editCategory.value = record.category;
                editBDNumber.value = record.bdNumber;
                editShelveNumber.value = record.shelveNumber;

                // Show modal
                editModal.classList.add('show');
            } catch (error) {
                console.error('Error fetching record:', error);
                alert('Error fetching record. Please try again.');
            }
        }

        // Delete Button Logic
        if (event.target.classList.contains('deleteBtn')) {
            console.log('Deleting record with ID:', recordId);
            if (!recordId) {
                alert('Error: Unable to find record ID for deletion.');
                return;
            }

            if (confirm('Are you sure you want to delete this record?')) {
                try {
                    const response = await fetch(`${CONFIG.API_BASE_URL}/records/${recordId}`, { method: 'DELETE' });
                    if (!response.ok) throw new Error(`Failed to delete record: ${response.statusText}`);
                    alert('Record deleted successfully.');
                    fetchRecords(); // Refresh records
                } catch (error) {
                    console.error('Error deleting record:', error);
                    alert('Error deleting record. Please try again later.');
                }
            }
        }
    });

    // Handle Edit Form Submission
    editForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const updatedRecord = {
            sectionName: editSectionName.value,
            category: editCategory.value,
            bdNumber: editBDNumber.value,
            shelveNumber: editShelveNumber.value,
        };

        console.log('Updating record with ID:', editRecordId.value);
        console.log('Updated data:', updatedRecord);

        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/records/${editRecordId.value}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedRecord),
            });
            if (!response.ok) throw new Error('Failed to update record.');

            alert('Record updated successfully.');
            editModal.classList.remove('show');
            fetchRecords();
        } catch (error) {
            console.error('Error updating record:', error);
            alert('Error updating record. Please try again later.');
        }
    });

    // Close Modal on Cancel
    cancelEdit.addEventListener('click', () => {
        editModal.classList.remove('show');
    });

    // Initial Fetch of Records
    fetchRecords();
});
