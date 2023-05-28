let notRegisteredBtn = document.getElementById("not-registered");
if (!(notRegisteredBtn == null)) {
    //hide register form
    let registerForm = document.getElementById("user-signup-area");
    registerForm.style.display = 'none';

    notRegisteredBtn.addEventListener("click", statusSwap)

    function statusSwap() {
        if(registerForm.style.display == 'none') {
            notRegisteredBtn.innerText = "Έχω τελικά"
            registerForm.style.display = 'block'   
        } else {
            notRegisteredBtn.innerText = "Δεν έχω προφίλ"
            registerForm.style.display = 'none' 
        }
    }
}