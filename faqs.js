document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;

        // Close other accordions
        document.querySelectorAll('.accordion-content').forEach(item => {
            if (item !== content) {
                item.style.display = 'none';
            }
        });

        // Toggle current accordion
        if (content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        }
    });
});