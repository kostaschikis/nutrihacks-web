$(function() {

  // When users clicks 'Fetch Users' Button
  $('#fetchusers-btn').click(function(e) {
    // Prevent reloading the page
    e.preventDefault();
    
    /**
     * AJAX Request
     * dataType: json - We expect the server to respond with a json file
     * Server returns an array of objects. Each object is a user
     */
    $.ajax({
      type: 'get',
      dataType: 'json',
      url: '../php/GetUsers.php',
      success: function(res) {
        // Store response to a users array
        users = res;
        // For each user append a table row to the table containing his data
        users.forEach(function(user) {
          $('#table-body').append(
            `
            <tr>
            <td>${user.username}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            </tr>
          `);
        });
        // Disable 'Fetch Users' Button
        $('#fetchusers-btn').prop('disabled', true);
      }
    });
    
  });

})