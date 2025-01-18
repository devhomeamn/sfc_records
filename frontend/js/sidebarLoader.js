document.addEventListener('DOMContentLoaded', () => {
    const sidebarContainer = document.getElementById('sidebar-container');

    // Fetch the sidebar HTML
    fetch('../sidebar.html')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load sidebar');
            return response.text();
        })
        .then(html => {
            // Insert the sidebar HTML into the container
            sidebarContainer.innerHTML = html;

            // Add toggle functionality after the sidebar is loaded
            const sidebar = document.querySelector('.modern-sidebar');
            const menuToggle = document.querySelector('.menu-toggle');

            menuToggle.addEventListener('click', () => {
                // Toggle the 'closed' class on the sidebar
                sidebar.classList.toggle('closed');

                // Optionally toggle the icon (e.g., switch to a close icon)
                const icon = menuToggle.querySelector('i');
                if (sidebar.classList.contains('closed')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-chevron-right'); // Switch to 'right' icon
                } else {
                    icon.classList.remove('fa-chevron-right');
                    icon.classList.add('fa-bars'); // Switch back to 'bars' icon
                }
            });

            // Highlight the active menu item
            const currentPage = window.location.pathname.split('/').pop(); // Get current page name
            const menuItems = document.querySelectorAll('.sidebar-menu ul li a');

            menuItems.forEach((item) => {
                if (item.getAttribute('href') === currentPage) {
                    item.classList.add('active');
                }
            });
        })
        .catch(err => console.error('Error loading sidebar:', err));
});
