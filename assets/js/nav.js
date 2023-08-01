let auth0 = null;

window.onload = async () => {
    auth0 = await window.createAuth0Client({
        domain: 'dev-difkemcsbh4bjh0k.us.auth0.com',
        client_id: 'nZbC5fLSuxF7XsbZxKleoDJfhTbXEIiJ'
    });

    //Navigation bar for when the user is not logged in
    const navBarNotLoggedIn= `
	    <ul>
			<li><a href="index.html">Home</a></li>
			<li>
				<a href="#" class="icon solid fa-angle-down"></a>
				    <ul>
						<li><a href="./contact.html">Contact</a></li>
					</ul>
			</li>
				<li><a href="#" id="lbutton" class="button">Login</a></li>
				<li><a href="#" class="button">Sign Up</a></li>
		</ul>`

    //Navigation bar for when the user is logged in
    const navBarLoggedIn= `
	    <ul>
			<li><a href="./index.html">Home</a></li>
			<li>
				<a href="#" class="icon solid fa-angle-down"></a>
				    <ul>
						<li><a href="./contact.html">Contact</a></li>
					    <li><a href="./downloads.html">Downloads</a></li>
					</ul>
			</li>
				<li><a href="#" class="button" id="logout">Logout!</a></li>
		</ul>`

    function isAuthenticated() {
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    function logout() {
        auth0.logout({
            returnTo: 'https://ppgmc.org/index.html',
            clientID: 'nZbC5fLSuxF7XsbZxKleoDJfhTbXEIiJ'
        });
    }

    //Checks if the user is logged in
    function checkLogin() {
        if (isAuthenticated()) {
            document.getElementById("nav").insertAdjacentHTML("afterbegin", navBarLoggedIn);
            document.getElementById("logout").addEventListener("click", logout);
        } else {
            document.getElementById("nav").insertAdjacentHTML("afterbegin", navBarNotLoggedIn);
            let loginButton = document.getElementById("lbutton"); // Moved this line here
            loginButton.addEventListener('click', (e) => {
                e.preventDefault();
                auth0.loginWithRedirect();  //Changed this line
            });
        }
    }

    checkLogin();
};






