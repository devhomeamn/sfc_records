document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = ''; // Replace with your API base URL if needed
    const addRecordForm = document.getElementById('addRecordForm');
    const sectionName = document.getElementById('sectionName');
    const category = document.getElementById('category');
    const crrNo = document.getElementById('crrNo');
    const roomNoContainer = document.getElementById('roomNoContainer');
    const roomNo = document.getElementById('roomNo');
    const concernTS = document.getElementById('concernTS');
    const modal = document.getElementById('confirmationModal');
    const modalContent = document.getElementById('modalContent');
    const closeModalBtn = document.getElementById('closeModal');
    const editBtn = document.getElementById('editRecord');
    
    const sectionDropdown = document.getElementById('sectionDropdown');
    const categoryDropdown = document.getElementById('categoryDropdown');

    // Fetch sections from the backend
   
    

    // Fetch sections from the backend
    fetch('/dmroute/sections')
        .then(response => response.json())
        .then(data => {
            const sections = data.sections || [];
            sections.forEach(section => {
                const option = document.createElement('option');
                option.value = section.name;
                option.textContent = section.name;
                option.dataset.categories = JSON.stringify(section.categories); // Store categories as data attribute
                sectionDropdown.appendChild(option);
            });
        })
        .catch(err => console.error('Error fetching sections:', err));

    // Attach onchange event handler
    sectionDropdown.addEventListener('change', () => {
        const selectedOption = sectionDropdown.options[sectionDropdown.selectedIndex];
        const categories = JSON.parse(selectedOption.dataset.categories || '[]');

        categoryDropdown.innerHTML = '<option value="">Select a category</option>';
        if (categories.length > 0) {
            categoryDropdown.disabled = false;
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categoryDropdown.appendChild(option);
            });
        } else {
            categoryDropdown.disabled = true;
        }
    });


// Update categories based on selected section
function updateCategories() {
    const sectionDropdown = document.getElementById('sectionDropdown');
    const categoryDropdown = document.getElementById('categoryDropdown');

    const selectedOption = sectionDropdown.options[sectionDropdown.selectedIndex];
    const categories = JSON.parse(selectedOption.dataset.categories || '[]');

    categoryDropdown.innerHTML = '<option value="">Select a category</option>';
    if (categories.length > 0) {
        categoryDropdown.disabled = false;
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryDropdown.appendChild(option);
        });
    } else {
        categoryDropdown.disabled = true;
    }


}

// Function to show the modal
    function showModal() {
        modal.style.display = 'flex'; // Explicitly set to flex for centering
    }

    // Function to hide the modal
    function hideModal() {
        modal.style.display = 'none';
    }

    
    // Event listeners to close the modal
    closeModalBtn.addEventListener('click', hideModal);
    editBtn.addEventListener('click', hideModal);

// dummy data modal active

    // Initialize category dropdown based on section

    // Show/hide "Stored In Room No" field
    document.getElementsByName('centralRecordRoom').forEach(radio => {
        radio.addEventListener('change', () => {
            roomNoContainer.style.display = crrNo.checked ? 'block' : 'none';
        });
    });

    // Trigger the dropdown initialization on page load
   

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
            sectionName: sectionDropdown.value,
            category: categoryDropdown.value,
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
                // Populate the modal with record details
                modalContent.innerHTML = `
                    <p><strong>Section Name:</strong> ${recordData.sectionName}</p>
                    <p><strong>Category:</strong> ${recordData.category}</p>
                    <p><strong>Concern TS:</strong> ${recordData.concernTS}</p>
                    <p><strong>Central Record Room:</strong> ${recordData.centralRecordRoom}</p>
                    <p><strong>Room No:</strong> ${recordData.roomNo || 'N/A'}</p>
                    <p><strong>BD Number:</strong> ${recordData.bdNumber}</p>
                    <p><strong>Shelve Number:</strong> ${recordData.shelveNumber}</p>
                    <p><strong>Closing Date:</strong> ${recordData.closingDate}</p>
                `;

                // Show the modal
                showModal();

                // Clear the form
                addRecordForm.reset();
                roomNoContainer.style.display = 'none';
            } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
            }
        } catch (error) {
            console.error('Failed to add record:', error.message);
            alert('Error adding record. Please try again.');
        }
    });

    // Modal close and edit functionality
    
    


});
