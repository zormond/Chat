    $(document).ready(function()
    {
      $("#chatRoomTab").click(function()
      {
          if($("#chatRoomTab").hasClass("active")) {return;}
          else{
              $("#chatRoomTab").addClass("active");
              $("#chatBotTab").removeClass("active");
              $("#chatRoomDiv").show();
              $("#botDiv").hide();
          }
      });

      $("#chatBotTab").click(function()
      {
          if($("#chatBotTab").hasClass("active")) {return;}
          else{
              $("#chatBotTab").addClass("active");
              $("#chatRoomTab").removeClass("active");
              $("#botDiv").show();
              $("#chatRoomDiv").hide();
          }
      });
    });