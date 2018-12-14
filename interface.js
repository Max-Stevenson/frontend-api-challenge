var viewPeepsBtn = document.getElementById("peeps-view");
viewPeepsBtn.addEventListener("click", getPeeps);


function createNode(element) {
  return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
	return parent.appendChild(el); // Append the second parameter(element) to the first one
}


function getPeeps() {
	fetch('https://chitter-backend-api.herokuapp.com/peeps')
	.then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
  	let peepsList = document.getElementById('returned-peeps')
  	return myJson.map(function(peep){
  		let li = createNode('li');
  		let span = createNode('span');
  		span.innerHTML =`${peep.user.handle}`;
  		append(li, span);
      append(peepsList, li);
  	})
  });
};