
async function handleSubmit() {
    const form = document.getElementById('contact-form');
    const formData = new FormData(form);

    // Convert form data to an object
    const data = {
        fullName: formData.get('fullName'),
        email: formData.get('your-email'),
        orgName: formData.get('orgName'),
        phone: formData.get('your-phone'),
        details: formData.get('details'),
        attachFile: formData.get('attach-file'),  // Attach file if necessary
        privacyPolicyAccepted: formData.get('privacyPolicyAccepted') ? true : false,
        receiveEmails: formData.getAll('receiveEmails'),  // For multiple checkbox values
    };

    try {
        const response = await fetch('http://cloudhawktech.local/wp-json/custom-mailer/v1/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        // Display the response message to the user
        document.querySelector('.wpcf7-response-output').textContent = result.message;
    } catch (error) {
        document.querySelector('.wpcf7-response-output').textContent = 'Error sending email.';
    }
}
