$(function() {

  $('#fetchusers-btn').click(function(e) {
    e.preventDefault();

    $.ajax({
      type: 'get',
      dataType: 'json',
      url: '../php/GetUsers.php',
      success: function(res) {
        // Store response to a users array
        users = res;
        // For each user append a table row containing his data
        users.forEach(user => {
          $('#table-body').append(
          `
            <tr>
              <td>${user.username}</td>
              <td>${user.name}</td>
              <td>${user.email}</td>
            </tr>
          `);
        });
      }
    });
    
  });

})