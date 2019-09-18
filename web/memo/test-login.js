(function() {
  console.log("dans test-login.js");
  getToken();
  function getToken() {
    // création de la requête
    const req_token = new XMLHttpRequest();
    function getRestToken(event) {
      // On teste directement le status de notre instance de XMLHttpRequest
      if (this.status === 200) {
        // Tout baigne, voici le contenu de la réponse
          console.log(this.responseText);
          //login(this.responseText);
      } else {
        // On y est pas encore, voici le statut actuel
        console.log("Statut actuel", this.status, this.statusText);
      }
    }
    req_token.onload = getRestToken;
    // Récupération du token
    req_token.open("GET", "/rest/session/token?_format=hal_json", true);
    req_token.send(null);
  }
  function login(token) {
    // création de la requête
    const req_login = new XMLHttpRequest();
    req_login.onload = restLogin;
    // ouverture de la requête
    req_login.open("POST", "/user/register", true);
    // en complément
    req_login.setRequestHeader("format", "json");
    req_login.setRequestHeader("Content-Type", "application/json");
    req_login.setRequestHeader("X-CSRF-TOKEN", token);
    // envoi de la requête
    console.log("Envoi de la requête avec comme login et mdp jose jose");
    req_login.send('form_id=user_login_form&name=' + encodeURIComponent("jose") +
    '&pass=' + encodeURIComponent("jose"));
  }
  function restLogin(event) {
    // On teste directement le status de notre instance de XMLHttpRequest
    if (this.status === 200) {
      // Tout baigne, voici le contenu de la réponse
        console.log("restLogin OK");
        console.log(this.responseText);
    } else {
      // On y est pas encore, voici le statut actuel
      console.log("Statut actuel", this.status, this.statusText);
    }
  }
  /* // ouverture de la requête
  //req.open("GET", "/node/3?_format=hal_json", true);
  req.open("POST", "/user/register?_format=json", true);
  // en complément
  req.setRequestHeader("Content-Type", "application/json");
  // envoi de la requête
  req.send('form_id=user_login_form&name=' + encodeURIComponent("jose") + '&pass=' + encodeURIComponent("jose")); */


})();
