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

// Stores message in DB
function store_message($name, $email, $subject, $message, $conn) {
   
  // Query String
  $sqlQuery = "INSERT INTO `messages` (name, email, subject, message) VALUES(?, ?, ?, ?)";
  // Initialize prepared statement
  $stmt = mysqli_stmt_init($conn);

  // Prepare an SQL statement for execution
  if (!mysqli_stmt_prepare($stmt, $sqlQuery)) {
    // If something went wrong print the error 
    echo $stmt->error;
  } else {
    // Binds variables to a prepared statement as parameters
    mysqli_stmt_bind_param($stmt, "ssss", $name, $email, $subject, $message);
    // Executes prepared statement
    mysqli_stmt_execute($stmt);
    // Closes a prepared statement
    $stmt->close();
  }
}