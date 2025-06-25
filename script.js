
// You can add JavaScript code here for interactive features



document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Display a message
    document.getElementById('contact-message').textContent = 'Thank you for your message! We will get back to you soon.';
});



