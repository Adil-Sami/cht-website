<?php
// mailer.php

// Check for POST data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = sanitize_email($_POST['email']);       // Destination email address
    $subject = sanitize_text_field($_POST['subject']); // Email subject
    $message = sanitize_textarea_field($_POST['message']); // Email message

    // Headers (optional)
    $headers = array('Content-Type: text/html; charset=UTF-8');
    
    // Send email
    $sent = wp_mail($to, $subject, $message, $headers);

    // Check if mail is sent successfully
    if ($sent) {
        echo json_encode(["status" => "success", "message" => "Email sent successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to send email"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
}

// Terminate script execution
die();
