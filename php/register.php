<?php

// Includes
require 'config.php';

// Get Form Data from POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST['name'];
  $username = $_POST['username'];
  $email = $_POST['email'];
  $password = $_POST['password'];
  $passwordConfirm = $_POST['passwordConfirm'];
}

// Validate Form Data
if ($password != $passwordConfirm) {
  header("Location: ../index.php?error=passwordnotmatch");
  exit();
} else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  header("Location: ../index.php?error=wrongsemail");
  exit();
} else if (!filter_var($email, FILTER_VALIDATE_EMAIL) && !preg_match("/^[a-zA-Z0-9]*$/", $username)) {
  header("Location: ../index.php?error=wrongemailorpassword");
}

register_user($name, $username, $email, $password, $conn);

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

    header("Location: ../index.php?regSuccess=true");
  }

  $stmt->close();
}