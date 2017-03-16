    $(document).ready(function()
    {
      $("#chatRoomTab").click(function()
      {
          if($("#chatRoomTab").hasClass("active")) {return;}
          else{
              $("#chatRoomTab").addClass("active");
              $("#chatBotTab").removeClass("active");
              $("#chatRoomDiv").css("display","block");
              $("#botDiv").css("display","none");
          }
      });

      $("#chatBotTab").click(function()
      {
          if($("#chatBotTab").hasClass("active")) {return;}
          else{
              $("#chatBotTab").addClass("active");
              $("#chatRoomTab").removeClass("active");
              $("#botDiv").css("display","block");
              $("#chatRoomDiv").css("display","none");
          }
      });
    });