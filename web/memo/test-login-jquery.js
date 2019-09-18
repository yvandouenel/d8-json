jQuery(function($) {
  console.log("jquery ok");
  var getCsrfToken = function(callback) {
    $.get("http://local.d8-json.my/rest/session/token/").done(function(data) {
      var csrfToken = data;
      callback(csrfToken);
    });
  };

  $("form#login").on("submit", function(e) {
    e.preventDefault();

    var inputUsername = $("#edit-name").val();
    var inputPassword = $("#edit-pass").val();

    if (inputUsername != "" && inputPassword != "") {
      getCsrfToken(function(csrfToken) {
        $.ajax({
          url: "http://local.d8-json.my/user/login?_format=json",
          type: "POST",
          dataType: "json",
          data: JSON.stringify({ name: inputUsername, pass: inputPassword }),
          headers: {
            "X-CSRF-Token": csrfToken
          }
        })
          .done(function(response) {
            if (response.current_user) {
              console.log("The user is logged!");
              console.log(response.current_user);
            }
          })
          .fail(function(jqXHR, textStatus) {
            console.log("Pb d'identification");
          });
      });
    }
  });
});
