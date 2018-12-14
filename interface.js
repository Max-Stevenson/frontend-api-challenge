var viewPeepsBtn = document.getElementById("peeps-view");

viewPeepsBtn.addEventListener("click", getPeeps);

function getPeeps() {
	fetch('https://chitter-backend-api.herokuapp.com/peeps')
	.then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
  	document.getElementById('peeps-view').innerHTML = myJson.body
  });
};