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
				<li><a href="./login.html" class="button">Login</a></li>
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

//Checks if the user is logged in
function checkLogin() {
    // Checks if Login is set to true in the localStorage
    if (localStorage.getItem("Login") === "true") {
        // If true, it sets the nav bar as logged in
        document.getElementById("nav").insertAdjacentHTML("afterbegin", navBarLoggedIn);
        // Adds event listener to the logout button
        document.getElementById("logout").addEventListener("click", logout);
    } else if (localStorage.getItem("Login") === "false") {
        // If false, it sets the nav bar as not logged in
        document.getElementById("nav").insertAdjacentHTML("afterbegin", navBarNotLoggedIn);
    }
}

//this function sets Login to false if Login is null
function setLoginFalse() {
    if (localStorage.getItem("Login") == null) {
        localStorage.setItem("Login", false)
    }
}


// Logs the user out by setting Login to false and redirecting to login page
function logout() {
    localStorage.setItem("Login", false);
    window.location.href = "./login.html";
}

//calls functions
setLoginFalse();
checkLogin();






