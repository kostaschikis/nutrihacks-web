$(function(){
  // Define where is the root dir based on which page we are
  const root = (window.location.href.indexOf("views") > -1) ? '../' : './';

  // When user submits the contact form
  $('#contactForm').submit(function(e) {
    e.preventDefault();
    
    // Get form data and store it in a message object
    let message = {
      name: $('#con-name').val(),
      email: $('#con-email').val(),
      subject: $('#con-sub').val(),
      text: $('#con-text').val()
    };

    /**
     * AJAX Request
     * POST Request at contact.php
     * data: message - Passes the message object we previously created as the request's data
     * Saves the message in the DB
     */
    $.ajax({
      type: 'post',
      url: `${root}php/Contact.php`,
      data: message,
      success: function() {
        console.log('Message stored successfully');
        // Hide the contact modal
        $('#contactmodal').modal('hide');
        // Insert text inside the <h4> of the success modal
        $('#successModalMessage').text("Your message has been sent successfully ✔");
        // Show the success modal
        $('#successModal').modal('show'); 
      },
      error: function() {
        // Hide the modal
        $('#contactmodal').modal('hide');
        // Show an alert
        alert('Something went wrong, please try again');
      }
    });

  }); 

})