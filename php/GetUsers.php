<?php 

// Includes
require 'config.php';

$users = array();

// SQL query 
$sqlQuery = "SELECT * FROM `users`";
// Initialize prepared statement
$stmt = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt, $sqlQuery)) {
    header("./contact.php?error=sqlerror");
} else {
  // Execute prepared statement
  mysqli_stmt_execute($stmt);
  $result = mysqli_stmt_get_result($stmt);

  // For every user (row) stored some data and push it to Users array
  if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
      $user['username'] = $row['username'];
      $user['name'] = $row['name'];
      $user['email'] = $row['email'];

      array_push($users, $user);
    }
  }
  $stmt->close();

  // JSON encode the Users array and set the respone to be a JSON array
  header('Content-Type: application/json');
  echo json_encode($users);
}