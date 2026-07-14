const form = document.getElementById("loginForm");

const login = document.getElementById("login");

const password = document.getElementById("loginPassword");

const loginError = document.getElementById("loginError");

const passwordError =
document.getElementById("loginPasswordError");

const toggle =
document.getElementById("toggleLoginPassword");

toggle.addEventListener("click", () => {

    if(password.type==="password"){

        password.type="text";

        toggle.innerHTML =
        '<i class="fa-solid fa-eye-slash"></i>';

    }else{

        password.type="password";

        toggle.innerHTML =
        '<i class="fa-solid fa-eye"></i>';

    }

});

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    loginError.textContent="";

    passwordError.textContent="";

    let valid=true;

    if(login.value.trim()===""){

        loginError.textContent =
        "Username or Email is required.";

        valid=false;

    }

    if(password.value===""){

        passwordError.textContent =
        "Password is required.";

        valid=false;

    }

    if(!valid) return;

    alert("Backend login coming in Sprint 5.");

});