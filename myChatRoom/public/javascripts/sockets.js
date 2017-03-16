$(document).ready(function()
{
    var typing = {};
    var typingTimeout;
    var username = localStorage['username'] ? localStorage['username'] : prompt('What name would you like to display?');
    if (localStorageAvailable()) {
      localStorage['username'] = username;
    }
    var socket = io();
    socket.emit('newUser', username);

    $('#message-container').keypress(function(e) {
      if(!$("#chatRoomTab").hasClass("active")) {
        if (e.keyCode == 13) {
          $('#send-button').click();
        }
        return;
      }

      if (typingTimeout) {
        clearTimeout(typingTimeout)
      }
      if (e.keyCode == 13) {
        $('#send-button').click();
      } else {
        socket.emit('typing', username);

        typingTimeout = setTimeout(function() {
          socket.emit('stopped typing', username);
        }, 3000)
      }
    });


    $('#send-button').click(function(e) {
      var message = {
        user: username,
        text: $('#message-text').val()
      }
      if($("#chatRoomTab").hasClass("active"))
      {
          socket.emit('stopped typing', username);
          addMessage(message);
          socket.emit('chat message', message);
      }
      else
      {
          addBotMessage(message);
          socket.emit('botMessage',message);
      }

      $('#message-text').val('');
    });

    ////////////////////
    // SOCKET STUFF
    ////////////////////

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

    socket.on('botMessage', function(message) {
      addBotMessage(message);
    });

    socket.on('chat message', function(message) {
      addMessage(message);
    });

    socket.on('typing', function(username) {
      typing[username] = username;
      updateTyping();
    });

    socket.on('stopped typing', function(username) {
      delete typing[username];
      updateTyping();
    });

    //////////////////////
    // HELPER FUNCTIONS
    //////////////////////

    function addMessage(message) {
      $('#messages').append($('<li>').html(`<span class='username'>${message.user}</span>${message.text}`));
    }

    function addBotMessage(message) {
      $('#botMessages').append($('<li>').html(`<span class='username'>${message.user}</span>${message.text}`));
    }

    function updateTyping() {
      var numberTyping = Object.keys(typing).length;
      var typingText = "";

      Object.keys(typing).forEach(function(username, index) {
        if (index == numberTyping - 1 && index != 0) {
          typingText += ' and '
        } else if (index != 0) {
          typingText += ', '
        }
        typingText += username;
      });

      if (numberTyping == 1) {
        typingText += ' is typing...';
      } else if (numberTyping > 1) {
        typingText += ' are typing...';
      }

      $('#typing-div').text(typingText);
    }

    function localStorageAvailable() {
        var test = 'test';
        try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch(e) {
            return false;
        }
    }
});    
