const form = document.getElementById("registerForm");

const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

function clearErrors() {
    usernameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
}

function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePassword(value) {

    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);

}

password.addEventListener("input", () => {

    const value = password.value;

    let score = 0;

    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[a-z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    switch (score) {

        case 0:
        case 1:
            strengthFill.style.width = "20%";
            strengthFill.style.background = "#DC2626";
            strengthText.textContent = "Weak";
            break;

        case 2:
        case 3:
            strengthFill.style.width = "60%";
            strengthFill.style.background = "#F59E0B";
            strengthText.textContent = "Medium";
            break;

        case 4:
        case 5:
            strengthFill.style.width = "100%";
            strengthFill.style.background = "#16A34A";
            strengthText.textContent = "Strong";
            break;
    }

});

togglePassword.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";

        togglePassword.innerHTML =
            '<i class="fa-solid fa-eye-slash"></i>';

    } else {

        password.type = "password";

        togglePassword.innerHTML =
            '<i class="fa-solid fa-eye"></i>';

    }

});

toggleConfirmPassword.addEventListener("click", () => {

    if (confirmPassword.type === "password") {

        confirmPassword.type = "text";

        toggleConfirmPassword.innerHTML =
            '<i class="fa-solid fa-eye-slash"></i>';

    } else {

        confirmPassword.type = "password";

        toggleConfirmPassword.innerHTML =
            '<i class="fa-solid fa-eye"></i>';

    }

});

form.addEventListener("submit", (e) => {

    e.preventDefault();

    clearErrors();

    let valid = true;

    if (username.value.trim().length < 3) {

        usernameError.textContent =
            "Username must be at least 3 characters.";

        valid = false;

    }

    if (!validateEmail(email.value.trim())) {

        emailError.textContent =
            "Enter a valid email address.";

        valid = false;

    }

    if (!validatePassword(password.value)) {

        passwordError.textContent =
            "Password must contain uppercase, lowercase, number and be at least 8 characters.";

        valid = false;

    }

    if (password.value !== confirmPassword.value) {

        confirmPasswordError.textContent =
            "Passwords do not match.";

        valid = false;

    }

    if (!valid) return;

    alert("Registration Successful!\n\nBackend will be connected in Sprint 5.");

    form.reset();

    strengthFill.style.width = "0%";

    strengthText.textContent = "Password Strength";

});