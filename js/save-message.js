$(function(){
  // Define where is the root dir based on which page we are
  const root = (window.location.href.indexOf("views") > -1) ? '../' : './';

  $('#contact-btn').click(function(e) {
    e.preventDefault();
    
    // Get form data and store it in a user object
    let message = {
      name: $('#con-name').val(),
      email: $('#con-email').val(),
      subject: $('#con-sub').val(),
      text: $('#con-text').val()
    };
    // Make AJAX POST request to save the user in DB
    $.ajax({
      type: 'post',
      url: `${root}php/contact.php`,
      data: message,
      success: function() {
        console.log('Message stored successfully');
        $('#contactmodal').modal('hide');
        $('#successModalMessage').text("Your message has been sent successfully ✔");
        $('#successModal').modal('show'); 
        // $('#reg-btn').hide();
      },
      error: function() {
        $('#contactmodal').modal('hide');
        alert('Something went wrong, please try again');
      }
    });

  }); 

})