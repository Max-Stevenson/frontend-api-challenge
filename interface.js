var viewPeepsBtn = document.getElementById("peeps-view");
var createNewUsr = document.getElementById("new-user");
viewPeepsBtn.addEventListener("click", getPeeps);
createNewUsr.addEventListener("submit", createNewUser);


function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
	return parent.appendChild(el); 
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
	.then(json => {
		let output = document.getElementById('handle');
		return output.innerHTML = `${json.handle}`;
	});
};