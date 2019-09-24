(function() {
  fetch('http://local.d8-json.my/user/login?_format=json', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': 'c0gAStEe8KOq8ym9R_8OMFBY7g8GieK-kA6xeoAi4qM'
    },
    body: JSON.stringify({
    'name':'jose',
    'pass' : "jose",
    }),
  })
  .then(response => response.json())
  .then(data =>{
    console.log('success', data);
    }
  );

})();
