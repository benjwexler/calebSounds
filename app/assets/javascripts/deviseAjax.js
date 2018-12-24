$(document).ready(function(){
    $.fn.serializeObject = function() {
      var values = {}
      $("form input, form select, form textarea").each( function(){
          console.log("efnh fikf")
        values[this.name] = $(this).val();
      });
      
      return values;
    }
    function clear_errors() {
      $('#js-error-block ul').html('');
      $('.form-control').attr('style','1px solid #ccc;');
    }
    String.prototype.titleize = function() {
      return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    };
    $("form#ajax_signin").submit(function(e){
      
       e.preventDefault(); 
       let signUpObj = {};
      signUpObj.utf8 = "✓";
      signUpObj.authenticity_token = document.getElementById("csfrToken").content
      signUpObj['user[email]'] = document.getElementById("signInUserEmailInput").value
      signUpObj['user[password]'] = document.getElementById("signInUserPasswordInput").value
      signUpObj.commit = "Log in"
       var user_info = $(this).serializeObject();
       console.log(user_info)
       $.ajax({
         type: "POST",
         url: "http://localhost:3000/users/sign_in",
         data: signUpObj,
         success: function(json){
            // location.href = "/";;
            console.log(json)
            console.log("sucess")
            document.getElementById("csfrToken").content = json.csrfToken
            document.getElementById("login").style.display = "none"
            document.getElementById("signup").style.display = "none"
            document.getElementById("logout").style.display = "block"
            document.getElementById("modal").click()
         },
         error: function(xhr) { 
            /** ACTIVATE THIS IF YOU GOT MORE THAN EMAIL OR PASSWORD FIELDS
            var errors = jQuery.parseJSON(xhr.responseText).errors; 
            for (messages in errors) { 
              error_messages =  messages + ' ' + errors[messages];
            } 
            */

            console.log("error")
            document.getElementById("wrongLogin").innerText = "Sorry, Couldn't log  in"
            $('#js-error-block-login').show();
         }, 
         dataType: "json"
       });
    });

    

    $("#logout").click(function(e){
      let csfrToken = document.getElementById("csfrToken").content
      console.log(csfrToken)
      console.log("dnirfnuifn i")
      $.ajax({
        type: "POST",
        url: "http://localhost:3000/users/sign_out",
        data: {"_method":"delete", "authenticity_token": csfrToken},
        success: function(json){
           console.log("trying to delete")
           console.log(json)
           console.log(json.csrfToken)
           document.getElementById("csfrToken").content = json.csrfToken
           document.getElementById("login").style.display = "block"
            document.getElementById("signup").style.display = "block"
            document.getElementById("logout").style.display = "none"
        },
        error: function(xhr) { 
            console.log("error with delete")
        
        }, 
        dataType: "json"
      });
      
    })

    
    $("form#ajax_signup").submit(function(e){
       e.preventDefault(); 
       var user_info = $(this).serializeObject();
       $.ajax({
         type: "POST",
         url: "http://localhost:3000/users",
         data: user_info,
         success: function(json){
            location.href = "/";;
         },
         error: function(xhr) { 
             
             var errors = jQuery.parseJSON(xhr.responseText).errors; 
             for (messages in errors) { 
               error_messages =  messages.titleize() + ' ' + errors[messages];
              var field = "form#ajax_signup " + "#user_" + messages;
              var error_message = error_messages;
              console.log(error_messages);
              //alert(error_messages);
              $('#js-error-block-signup ul').append("<li>"+error_messages+"</li>");
              $(field).css('border', '1px solid #D9534F');          
             } 
            $('#js-error-block-signup').show();
         }, 
         dataType: "json"
       });
       clear_errors();
    });
  });