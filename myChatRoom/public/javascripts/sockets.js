$(document).ready(function()
{
    $(function () {
      var socket = io();
      var username = localStorage['username'] ? localStorage['username'] : prompt('What name would you like to display?');
      localStorage['username'] = username;
      socket.emit('newUser', localStorage['username']);
      $('form').submit(function(e) {
      	var message = {
      		user: username,
      		text: $('#message-text').val()
      	}
        if($("#chatRoomTab").hasClass("active"))
        {
            socket.emit('chat message', message);
            addMessage(message);
            $('#message-text').val('');
        }
        else
        {
            addMessage(message);
            $('#message-text').val('');
            socket.emit('botMessage',message);
        }
        e.preventDefault();
      });

      socket.on('newUser', function(usersConnected){
        $('#users').empty();
        usersConnected.forEach(function(element) {
            $('#users').append($('<li>').html(`<span class='username'>${element.name}</span>`));
        });

      });

      socket.on('deleteUser',function(usersConnected){
        $('#users').empty();
        usersConnected.forEach(function(element)
        {
            $('#users').append($('<li>').html(`<span class='username'>${element.name}</span>`));
        });
      });

      socket.on('botMessage', function(message)
      {
        addMessage(message);
      });

      socket.on('chat message', function(message) {
	      addMessage(message);
	  });

	    function addMessage(message) {
            if($("#chatRoomTab").hasClass("active"))
            {
                $('#messages').append($('<li>').html(`<span class='username'>${message.user}</span>${message.text}`));
            }
            else
            {
                $('#botMessages').append($('<li>').html(`<span class='username'>${message.user}</span>${message.text}`));
            }

	    }
    });
});    
