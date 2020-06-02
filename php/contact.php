<?php

// Includes
require 'config.php';

// If the server gets hit by a POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Get Form Data from POST request
  $name = $_POST['name'];
  $email = $_POST['email'];
  $subject = $_POST['subject'];
  $message = $_POST['text'];

  // Store message in DB
  store_message($name, $email, $subject, $message, $conn);
}

/**
 * function store_message
 */
function store_message($name, $email, $subject, $message, $conn) {
    
  $sqlQuery = "INSERT INTO `messages` (name, email, subject, message) VALUES(?, ?, ?, ?)";
  $stmt = mysqli_stmt_init($conn);

  if (!mysqli_stmt_prepare($stmt, $sqlQuery)) {
      header("./contact.php?error=sqlerror");
  } else {
    mysqli_stmt_bind_param($stmt, "ssss", $name, $email, $subject, $message);
    mysqli_stmt_execute($stmt);
    $stmt->close();
  }
}