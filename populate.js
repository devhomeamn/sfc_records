
const shelveNumberDropdown = document.getElementById('shelveNumberDropdown');
const shelveNumberInput = document.getElementById('shelveNumberInput');



// the function 
async function loadShelveNumbers1() {
    try {
        const response = await fetch(`${API_BASE_URL}/records/shelves`);
        const data = await response.json();
        if (data.success) {
            // Clear existing options except the default ones
            shelveNumberDropdown1.innerHTML = `
                <option value="" disabled selected>Select Shelve Number</option>
                <option value="Add New">Add New</option>
            `;

            // Populate the dropdown with shelve numbers
            data.shelves.forEach(shelve => {
                const option = document.createElement('option');
                option.value = shelve;
                option.textContent = shelve;
                shelveNumberDropdown1.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error loading shelve numbers:', error.message);
    }
}


//the html portion
/*<div class="form-group">
                    <label for="shelveNumber">Shelve NumberRR</label>
                    <select id="shelveNumberDropdown1" required>
                        <option value="" disabled selected>Select Shelve Number</option>
                        <option value="Add New">Add New</option>
                    </select>
                    <input type="text" id="shelveNumberInput1" placeholder="Enter New Shelve Number" style="display: none;">
                </div> 
*/

//route portion to get data: 

router.get('/shelves', async (req, res) => {
    try {
        const shelves = await Record.distinct('shelveNumber');
        res.status(200).json({ success: true, shelves });
    } catch (error) {
        console.error('Error fetching shelve numbers:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch shelve numbers', details: error.message });
    }
});


//if add new are chosen 


shelveNumberDropdown1.addEventListener('change', () => {
    if (shelveNumberDropdown1.value === 'Add New') {
        shelveNumberInput1.style.display = 'block';
        shelveNumberInput1.required = true;
    } else {
        shelveNumberInput1.style.display = 'none';
        shelveNumberInput1.required = false;
    }
});