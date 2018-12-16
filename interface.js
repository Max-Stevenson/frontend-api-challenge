var viewPeepsBtn = document.getElementById("peeps-view");
var createNewUsr = document.getElementById("new-user");
viewPeepsBtn.addEventListener("click", getPeeps);
createNewUsr.addEventListener("submit", createNewUser);


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
  		let div = createNode('div');
  		let para = createNode('p')
  		para.innerHTML =`${peep.user.handle}\n<br>${peep.body}`;
  		append(div, para);
  		append(li, div);
      append(peepsList, li);
  	})
  });
};

function createNewUser(e) {
	e.preventDefault();
	var url = 'https://chitter-backend-api.herokuapp.com/users';
	var data = {
		"user": {"handle":document.getElementById('new-handle').value,
		"password":document.getElementById('new-password').value}
	};

	console.log(data.user)

	fetch(url, {
	  method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(data),
	})
	.then(res => res.json())
	.then(response => console.log('Success:', JSON.stringify(response)))
	.catch(error => console.error('Error:', error));
};