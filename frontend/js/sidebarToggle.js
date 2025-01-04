document.addEventListener('DOMContentLoaded', () => {
    // Select the sidebar and menu toggle button
    const sidebar = document.querySelector('.modern-sidebar');
    const menuToggle = document.querySelector('.menu-toggle');

    // Add event listener for the menu toggle button
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
});
