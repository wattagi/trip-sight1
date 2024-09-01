document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simple form validation
    if (name === '' || email === '' || message === '') {
        alert('Please fill out all fields.');
        return;
    }

    // Display the form data (You can modify this part to send data to a server)
    alert(`Thank you, ${name}! We have received your message.`);

    // Clear the form
    document.getElementById('contactForm').reset();
});
