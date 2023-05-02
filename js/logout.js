let lOut = document.getElementById("logoutButton");

lOut.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    alert("Logout Successful!")
    location.href = "../login.html"
})
