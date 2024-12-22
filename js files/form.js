const signUpForm = document.getElementById("signUpForm");
        const signInForm = document.getElementById("signInForm");
        const signInButton = document.getElementById("signInButton");
        const signUpButton = document.getElementById("signUpButton");

        // Show sign-in form and hide sign-up form
        signInButton.addEventListener("click", (e) => {
            e.preventDefault();
            signUpForm.classList.remove("active");
            signInForm.classList.add("active");
        });

        // Show sign-up form and hide sign-in form
        signUpButton.addEventListener("click", (e) => {
            e.preventDefault();
            signInForm.classList.remove("active");
            signUpForm.classList.add("active");
        });