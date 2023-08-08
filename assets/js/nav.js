window.onload = async () => {
let auth0;
    try {
    const auth0 = await createAuth0Client({
        domain: 'dev-difkemcsbh4bjh0k.us.auth0.com',
        client_id: 'nZbC5fLSuxF7XsbZxKleoDJfhTbXEIiJ',
        redirect_uri: 'https://ppgmc.org/index.html',
        audience: 'https://dev-difkemcsbh4bjh0k.us.auth0.com/api/v2/',
        responseType: 'token id_token',
        scope: 'openid profile email',
        cacheLocation: 'localstorage', // This stores auth info in localStorage so it persists across page refreshes
    });

    // Check if the user is coming back from Auth0 after authentication
        if (window.location.search.includes('code=')) {
            console.log("Detected 'code=' in URL. Handling Auth0 redirect callback...");

            await auth0.handleRedirectCallback();

            console.log("'handleRedirectCallback' executed. Checking authentication status...");

            const isAuthenticated = await auth0.isAuthenticated();

            console.log("Is authenticated after redirect:", isAuthenticated);
        }


        // Your navbars remain unchanged
        const navBarNotLoggedIn = `
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="./contact.html">Contact</a></li>
                <li><a href="#" id="lbutton" class="button">Login</a></li>
                <li><a href="#" class="button">Sign Up</a></li>
            </ul>`

        const navBarLoggedIn = `
            <ul>
                <li><a href="./index.html">Home</a></li>
                <li><a href="./contact.html">Contact</a></li>
                <li><a href="./downloads.html">Downloads</a></li>
                <li><a href="#" class="button" id="logout">Logout!</a></li>
            </ul>`

        // ... Your previous code before the check

        const isAuthenticated = await auth0.isAuthenticated();

        console.log("Is authenticated:", isAuthenticated);

        if (isAuthenticated) {
            document.getElementById("nav").insertAdjacentHTML("afterbegin", navBarLoggedIn);
            document.getElementById("logout").addEventListener("click", async () => {
                await auth0.logout({ returnTo: 'https://ppgmc.org/index.html' });
            });
        } else {
            document.getElementById("nav").insertAdjacentHTML("afterbegin", navBarNotLoggedIn);
            document.getElementById("lbutton").addEventListener('click', (e) => {
                e.preventDefault();
                auth0.loginWithRedirect();
            });
        }

    } catch (error) {
        console.error("Error initializing Auth0 client or handling redirection: ", error);
    }
};