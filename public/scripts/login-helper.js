let notRegisteredBtn = document.getElementById("not-registered");
if (!(notRegisteredBtn == null)) {
    //hide register form
    let registerForm = document.getElementById("user-signup-area");
    registerForm.style.display = 'none';
    notRegisteredBtn.addEventListener("click", () => {registerForm.style.display = 'block'})
}