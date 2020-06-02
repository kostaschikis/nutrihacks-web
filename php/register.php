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
  }

  // Store user in DB
  register_user($name, $username, $email, $password, $conn);
}

/**
 * function register_user
 */
function register_user($name, $username, $email, $password, $conn) {
    
  $sqlQuery = "INSERT INTO `users` (username, password, name, email) VALUES(?, ?, ?, ?)";
  $stmt = mysqli_stmt_init($conn);

  if (!mysqli_stmt_prepare($stmt, $sqlQuery)) {
      header("./register.php?error=sqlerror");
  } else {
    // Hash The Password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    mysqli_stmt_bind_param($stmt, "ssss", $username, $hashedPassword, $name, $email);
    mysqli_stmt_execute($stmt);
    $stmt->close();
  }
}