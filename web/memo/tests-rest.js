(function() {
  console.log("Hello");
  // création de la requête
  const req = new XMLHttpRequest();

  function enCours(event) {
    // On teste directement le status de notre instance de XMLHttpRequest
    if (this.status === 200) {
      // Tout baigne, voici le contenu de la réponse
      /* this.responseText = JSON.stringify(JSON.parse(this.responseText),null,2);
      console.log(this.responseText); */
      console.log(JSON.stringify({ x: 5, y: 6 }));
    } else {
      // On y est pas encore, voici le statut actuel
      console.log("Statut actuel", this.status, this.statusText);
    }
  }

  req.onload = enCours;

  // ouverture de la requête
  //req.open("GET", "/node/3?_format=hal_json", true);
  req.open("GET", "/memo/list_cartes?_format=json", true);
  // en complément
  req.setRequestHeader("Content-Type", "application/hal+json");
  // envoi de la requête
  req.send(null);
})();
