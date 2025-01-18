const API_BASE_URL = ''; 

// Fetch and populate sections
async function fetchSections() {
    try {
        const response = await fetch(`${API_BASE_URL}/dmroute/sections`);
        const data = await response.json();
        const dropdown = document.getElementById('sectionDropdown');
        const list = document.getElementById('sectionsList');

        dropdown.innerHTML = '';
        list.innerHTML = '';

        data.sections.forEach(section => {
            // Populate dropdown
            const option = document.createElement('option');
            option.value = section.name;
            option.textContent = section.name;
            dropdown.appendChild(option);

            // Populate list
            const listItem = document.createElement('li');
            listItem.textContent = `${section.name}: ${section.categories.join(', ')}`;
            list.appendChild(listItem);
        });
    } catch (err) {
        console.error('Error fetching sections:', err);
    }
}

// Add a new section
async function addSection() {
    const sectionName = document.getElementById('sectionName').value;

    try {
        const response = await fetch(`${API_BASE_URL}/dmroute/section`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: sectionName })
        });

        if (response.ok) {
            alert('Section added successfully');
            fetchSections();
        } else {
            const error = await response.json();
            alert('Error: ' + error.message);
        }
    } catch (err) {
        console.error('Error adding section:', err);
    }
}

// Add a new category
async function addCategory() {
    const sectionName = document.getElementById('sectionDropdown').value;
    const categoryName = document.getElementById('categoryName').value;

    try {
        const response = await fetch(`${API_BASE_URL}/dmroute/category`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sectionName, category: categoryName })
        });

        if (response.ok) {
            alert('Category added successfully');
            fetchSections();
        } else {
            const error = await response.json();
            alert('Error: ' + error.message);
        }
    } catch (err) {
        console.error('Error adding category:', err);
    }
}

// Initial fetch
fetchSections();
