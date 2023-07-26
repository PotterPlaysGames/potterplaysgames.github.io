//assigns the ID's "login-form," "login-form-submit" and "login-error-msg" to the respective variables
const loginForm = document.getElementById("login-form");
const UserValue = document.getElementById("username")
const PassValue = document.getElementById("password")
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

const auth0 = new auth0.WebAuth({
    domain: 'dev-difkemcsbh4bjh0k.us.auth0.com',
    clientID: 'nZbC5fLSuxF7XsbZxKleoDJfhTbXEIiJ',
    redirectUri: 'https://ppgmc.org/index.html',
    audience: 'https://dev-difkemcsbh4bjh0k.us.auth0.com/api/v2/',
    responseType: 'token id_token',
    scope: 'openid profile email',
});

//Listens for the login button
loginButton.addEventListener('click', (e) => {
    e.preventDefault();

    auth0.login({
        realm: 'Username-Password-Authentication',
        username: UserValue.value,
        password: PassValue.value,
    }, (err) => {
        if (err) {
            loginErrorMsg.textContent = 'Please enter your username and password.';
        } else {
            alert('Login Success!');
            location.href = './index.html';
            localStorage.setItem('Login', true);
        }
    });
});


