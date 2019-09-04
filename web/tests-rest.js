(function() {
  console.log("Hello");
  // création de la requête
  const req = new XMLHttpRequest();

  function enCours(event) {
    // On teste directement le status de notre instance de XMLHttpRequest
    if (this.status === 200) {
      // Tout baigne, voici le contenu de la réponse
      console.log("Contenu", this.responseText);
    } else {
      // On y est pas encore, voici le statut actuel
      console.log("Statut actuel", this.status, this.statusText);
    }
  }

  req.onload = enCours;

  // ouverture de la requête
  req.open("GET", "/node/1?_format=hal_json", true);
  // en complément
  req.setRequestHeader("Content-Type", "application/hal+json");
  // envoi de la requête
  req.send(null);
})();
