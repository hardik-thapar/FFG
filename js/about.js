document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedback-form');

    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = feedbackForm.elements.name.value;
        const email = feedbackForm.elements.email.value;
        const message = feedbackForm.elements.message.value;

        // Here you would typically send this data to a server
        console.log('Feedback submitted:', { name, email, message });

        // Clear the form
        feedbackForm.reset();

        // Show a confirmation message
        alert('Thank you for your feedback!');
    });

    // Add Google Maps embed code here
    const mapContainer = document.getElementById('map');
    mapContainer.innerHTML = `
        <iframe
            width="100%"
            height="100%"
            frameborder="0"
            style="border:0"
            src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Cafe+Harvest"
            allowfullscreen
        ></iframe>
    `;
});
