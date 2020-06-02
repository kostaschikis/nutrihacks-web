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
    
    // Make AJAX POST request to save the user in DB
    $.ajax({
      type: 'post',
      url: `${root}php/register.php`,
      data: user,
      success: function() {
        console.log('User stored successfully');
        $('#modalRegisterForm').modal('hide');
        $('#successModalMessage').text("You registered successfully, welcome aboard 💪");
        $('#successModal').modal('show'); 
        // $('#reg-btn').hide();
      },
      error: function() {
        $('#modalRegisterForm').modal('hide');
        alert('Something went wrong, please try again');
      }
    });

  }); 

})