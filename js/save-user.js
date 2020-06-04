$(function(){
  // Define where is the root dir based on which page we are
  const root = (window.location.href.indexOf("views") > -1) ? '../' : './';

  // When user submits the sign up form
  $('#signup-btn').click(function(e) {
    e.preventDefault();
    
    // Get form data and store it in a user object
    let user = {
      name: $('#inputName').val(),
      username: $('#inputUsername').val(),
      email: $('#inputEmail').val(),
      password: $('#inputPws').val()
    };
    
    /**
     * AJAX Request
     * POST Request at register.php
     * data: user - Passes the user object we previously created as the request's data
     * Saves the user in the DB
     */
    $.ajax({
      type: 'post',
      url: `${root}php/Register.php`,
      data: user,
      success: function() {
        console.log('User stored successfully');
        // Hide the contact modal
        $('#modalRegisterForm').modal('hide');
        // Insert text inside the <h4> of the success modal
        $('#successModalMessage').text("You registered successfully, welcome aboard 💪");
        // Show the success modal
        $('#successModal').modal('show'); 
      },
      error: function() {
        // Hide the modal
        $('#modalRegisterForm').modal('hide');
        // Show an alert
        alert('Something went wrong, please try again');
      }
    });

  }); 

})