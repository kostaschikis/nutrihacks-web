$(function(){
  // Define where is the root dir based on which page we are
  const root = (window.location.href.indexOf("views") > -1) ? '../' : './';

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
      success: function(res) {
        // console.log('User stored successfully');
        window.location.href = "./index.php?regSuccess=true";
      }
    });

  }); 

})