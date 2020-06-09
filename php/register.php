<?php

// Includes
require 'config.php';

// If the server gets hit by a POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Get Form Data from POST request
  $name = $_POST['name'];
  $username = $_POST['username'];
  $email = $_POST['email'];
  $password = $_POST['password'];

  
  // Validate Email & Username
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: ../index.html?error=wrongsemail");
    exit();
  } else if (!filter_var($email, FILTER_VALIDATE_EMAIL) && !preg_match("/^[a-zA-Z0-9]*$/", $username)) {
    header("Location: ../index.html?error=wrongemailorpassword");
    exit();
  }

  // Store user in DB
  register_user($name, $username, $email, $password, $conn);
}

// Stores user in DB
function register_user($name, $username, $email, $password, $conn) {
    
  // Query String
  $sqlQuery = "INSERT INTO `users` (username, password, name, email) VALUES(?, ?, ?, ?)";
  // Initialize prepared statement
  $stmt = mysqli_stmt_init($conn);

  // Prepare an SQL statement for execution
  if (!mysqli_stmt_prepare($stmt, $sqlQuery)) {
    // If something went wrong print the error 
    echo $stmt->error;
  } else {
    // Hash The Password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Binds variables to a prepared statement as parameters
    mysqli_stmt_bind_param($stmt, "ssss", $username, $hashedPassword, $name, $email);
    // Executes prepared statement
    mysqli_stmt_execute($stmt);
    // Closes a prepared statement
    $stmt->close();
  }
}