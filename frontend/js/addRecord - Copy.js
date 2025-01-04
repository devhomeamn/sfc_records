document.addEventListener('DOMContentLoaded', () => {
    const addRecordForm = document.getElementById('addRecordForm');

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
            sectionName: document.getElementById('sectionName').value,
            category: document.getElementById('category').value,
            bdNumber: document.getElementById('bdNumber').value,
            shelveNumber: document.getElementById('shelveNumber').value,
            closingDate: document.getElementById('closingDate').value,
            enteredBy: user.username,
        };

        try {
            const response = await fetch('http://localhost:5000/records/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recordData),
            });

            if (response.status === 201) {
                alert('Record added successfully!');
                addRecordForm.reset();
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
