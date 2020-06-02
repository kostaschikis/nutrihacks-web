<?php 

// Includes
require 'config.php';

// If the server gets hit by a GET request
if ($_SERVER["REQUEST_METHOD"] == "GET") {
  
  // Initialize a users array
  $users = array();

  // SQL query 
  $sqlQuery = "SELECT * FROM `users`";
  // Initialize prepared statement
  $stmt = mysqli_stmt_init($conn);

  // If prepared statements fails to prepare -> return an error
  if (!mysqli_stmt_prepare($stmt, $sqlQuery)) {
      header("./contact.php?error=sqlerror");
  } else {
    // Execute prepared statement
    mysqli_stmt_execute($stmt);
    // Get results
    $result = mysqli_stmt_get_result($stmt);

    // For every user (row), store some data and push it into 'users' array
    if (mysqli_num_rows($result) > 0) {
      while ($row = mysqli_fetch_assoc($result)) {
        // user = temporary associative array to store the user's data we want for each iteration
        $user['username'] = $row['username'];
        $user['name'] = $row['name'];
        $user['email'] = $row['email'];

        // push 'user' array to 'users' array
        array_push($users, $user);
      }
    }
    // Clse prepared statement
    $stmt->close();

    // JSON encode the 'users' array and set the server respone to be a JSON array
    header('Content-Type: application/json');
    echo json_encode($users);
  }
}