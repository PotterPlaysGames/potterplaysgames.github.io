// 1. Setting up the Auth0
async function setupAuth() {
    let auth0;
    try {
        auth0 = await createAuth0Client({
            domain: 'dev-difkemcsbh4bjh0k.us.auth0.com',
            client_id: 'nZbC5fLSuxF7XsbZxKleoDJfhTbXEIiJ',
            redirect_uri: 'https://www.ppgmc.org/index.html',
            audience: 'https://dev-difkemcsbh4bjh0k.us.auth0.com/api/v2/',
            responseType: 'token id_token',
            scope: 'openid profile email',
            cacheLocation: 'localstorage',
        });

        if (window.location.search.includes('code=')) {
            await auth0.handleRedirectCallback();
            window.history.replaceState({}, document.title, "/");
        }

        const navBarNotLoggedIn = `
            <ul>
                <li><a href="../index.html">Home</a></li>
                <li><a href="#">About Me</a></li>
                <li><a href="https://github.com/potterplaysgames">Github</a></li>
                <li><a href="#" id="lbutton" class="button">Login/Sign Up</a></li>
            </ul>`;


        const loginButton = document.getElementById("lbutton");
        const logoutButton = document.getElementById("logout");

        // The function that handles login
        function handleLoginClick(e) {
            console.log("Login Clicked");
            e.preventDefault();
            auth0.loginWithRedirect();
            console.log("Redirect must have failed");
        }

        // The function that handles logout
        async function handleLogoutClick(e) {
            e.preventDefault();
            await auth0.logout({ returnTo: 'https://www.ppgmc.org/index.html' });
        }

        const isAuthenticated = await auth0.isAuthenticated();
        const currentPath = window.location.pathname;

        let userEmail = "";
        if (isAuthenticated) {
            const user = await auth0.getUser();
            console.log(user);
            let userEmail = user.name;

            const navBarLoggedIn = `
            <ul>
                <li><a href="../index.html">Home</a></li>
                <li><a href="#">About Me</a></li>
                <li><a href="../ContactUs/">Contact</a></li>
                <li><a href="https://github.com/potterplaysgames">Github</a></li>
                <li><a href="../downloads/">Downloads</a></li>
                <li class="dropdown">
                    <a href="#">${userEmail}</a> <!-- Display the user's email -->
                    <div class="dropdown-content">
                        <a href="#" class="button" id="logout">Logout</a>
                    </div>
                </li>
            </ul>`;

            document.getElementById("nav").insertAdjacentHTML("afterbegin", navBarLoggedIn);

            const logoutButton = document.getElementById("logout");
            logoutButton.addEventListener('click', handleLogoutClick);
            logoutButton.addEventListener('touchend', handleLogoutClick);
        } else {
            document.getElementById("nav").insertAdjacentHTML("afterbegin", navBarNotLoggedIn);

            console.log("Not Logged in");

            const loginButton = document.getElementById("lbutton");
            loginButton.addEventListener('click', handleLoginClick);
            loginButton.addEventListener('touchend', handleLoginClick);

            // Redirect to restricted access page if on the downloads page and not authenticated
            if (currentPath === "/downloads/" || currentPath === "/downloads/index.html") {
                window.location.href = "../notloggedin/";
            }
        }


        // After setting up the Auth, set up the mobile navigation
        setupMobileNav();

    } catch (error) {
        console.error("Error initializing Auth0 client or handling redirection: ", error);
    }
}

// 2. Function to set up the mobile navigation, containing the logic from the provided mobile navigation script
function setupMobileNav() {
    var $window = $(window),
        $body = $('body'),
        $header = $('#header'),
        $banner = $('#banner');

    // Breakpoints.
    breakpoints({
        wide: ( '1281px', '1680px' ),
        normal: ( '981px', '1280px' ),
        narrow: ( '737px', '980px' ),
        narrower: ( '737px', '840px' ),
        mobile: ( '481px', '736px' ),
        mobilep: ( null, '480px' )
    });

    // Play initial animations on page load.
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Dropdowns.
    $('#nav > ul').dropotron({
        alignment: 'right'
    });

    // NavPanel.
    // Button.
    $(
        '<div id="navButton">' +
        '<a href="#navPanel" class="toggle"></a>' +
        '</div>'
    )
        .appendTo($body);

    // Panel.
    $(
        '<div id="navPanel">' +
        '<nav>' +
        $('#nav').navList() +
        '</nav>' +
        '</div>'
    )
        .appendTo($body)
        .panel({
            delay: 500,
            hideOnClick: true,
            hideOnSwipe: true,
            resetScroll: true,
            resetForms: true,
            side: 'left',
            target: $body,
            visibleClass: 'navPanel-visible'
        });

    // Header.
    if (!browser.mobile && $header.hasClass('alt') && $banner.length > 0) {
        $window.on('load', function() {
            $banner.scrollex({
                bottom: $header.outerHeight(),
                terminate: function() { $header.removeClass('alt'); },
                enter: function() { $header.addClass('alt reveal'); },
                leave: function() { $header.removeClass('alt'); }
            });
        });
    }
}


window.onload = () => {
    setupAuth();
};
