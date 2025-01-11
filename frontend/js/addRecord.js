document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'http://localhost:5000'; // Replace with your API base URL if needed
    const addRecordForm = document.getElementById('addRecordForm');
    const sectionName = document.getElementById('sectionName');
    const category = document.getElementById('category');
    const crrNo = document.getElementById('crrNo');
    const roomNoContainer = document.getElementById('roomNoContainer');
    const roomNo = document.getElementById('roomNo');
    const concernTS = document.getElementById('concernTS');

    // Initialize category dropdown based on section
    sectionName.addEventListener('change', () => {
        const selectedSection = sectionName.value;
        category.innerHTML = ''; // Clear existing options

        let options = [];
        if (selectedSection === 'Pension') {
            options = ['Arrear', 'Commutation', 'Reinsted'];
        } else if (selectedSection === 'AP BBD') {
            options = ['AP-1', 'AP-2', 'AP-3'];
        } else {
            options = ['Default Option 1', 'Default Option 2']; // Fallback options
        }

        options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt;
            option.textContent = opt;
            category.appendChild(option);
        });
    });

    // Show/hide "Stored In Room No" field
    document.getElementsByName('centralRecordRoom').forEach(radio => {
        radio.addEventListener('change', () => {
            roomNoContainer.style.display = crrNo.checked ? 'block' : 'none';
        });
    });

    // Trigger the dropdown initialization on page load
    sectionName.dispatchEvent(new Event('change'));

    // Form submission
    addRecordForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('User not logged in. Redirecting to login page...');
            window.location.href = 'index.html';
            return;
        }

        // Prepare form data
        const recordData = {
            sectionName: sectionName.value,
            category: category.value,
            concernTS: concernTS.value,
            centralRecordRoom: document.querySelector('input[name="centralRecordRoom"]:checked').value,
            roomNo: crrNo.checked ? roomNo.value : null,
            bdNumber: document.getElementById('bdNumber').value,
            shelveNumber: document.getElementById('shelveNumber').value,
            closingDate: document.getElementById('closingDate').value,
            enteredBy: user.username,
        };

        try {
            const response = await fetch(`${API_BASE_URL}/records/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recordData),
            });

            if (response.status === 201) {
                alert('Record added successfully!');
                addRecordForm.reset();
                roomNoContainer.style.display = 'none'; // Reset "Stored In Room No" field
            } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
            }
        } catch (error) {
            console.error('Failed to add record:', error.message);
            alert('Error adding record. Please try again.');
        }
    });
});
