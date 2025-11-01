        // Use 'use strict' for modern, clean JavaScript
        'use strict';

        // Wait until the DOM is fully loaded before trying to access elements
        document.addEventListener('DOMContentLoaded', () => {
            const button = document.getElementById('my-button');
            const heading = document.getElementById('main-heading');

            // Example JS interaction:
            button.addEventListener('click', () => {
                console.log('Button clicked!');
                heading.textContent = 'Interaction Successful!';
                heading.style.color = '#27ae60'; // Change color with JS
            });

            // Add your specific JavaScript logic below this line


        });