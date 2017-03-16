$(document).ready(function()
{
        $(function () {
      var socket = io();
      var username = localStorage['username'] ? localStorage['username'] : prompt('What name would you like to display?');
      localStorage['username'] = username;

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

            e.preventDefault();
        }
        else
        {
            addMessage(message);
            $('#message-text').val('');
            socket.emit('botMessage',message);
        }
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
