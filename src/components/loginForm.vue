<template>
  <body>
    <div class="container">
      <div class="forms-container">
        <div class="signin-signup">
          <form action="#" class="sign-in-form" @submit.prevent>
            <h2 class="title">Sign in</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input
                type="email"
                id="email-signin"
                v-model="email"
                placeholder="Email"
              />
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input
                type="password"
                id="psw_signin"
                v-model="password"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              value="Login"
              class="btn solid"
              id="button_login"
              @click.prevent="login"
            >
              Login
            </button>
            <p class="social-text">Or Sign in with social platforms</p>
            <div class="social-media">
              <a href="#" class="social-icon" @click="googleLogin">
                <i class="fab fa-google"></i>
              </a>
            </div>
          </form>
          <form action="#" class="sign-up-form" @submit.prevent>
            <h2 class="title">Sign up</h2>
            <div class="input-field">
              <i class="fas fa-envelope"></i>
              <input
                type="email"
                id="email-signup"
                v-model="email"
                placeholder="Email"
              />
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input
                type="password"
                id="psw_signup"
                v-model="password"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              class="btn"
              value="Sign up"
              id="button_signup"
              @click.prevent="signup"
            >
              Sign Up
            </button>
            <p class="social-text">Or Sign up with social platforms</p>
            <div class="social-media">
              <a href="#" class="social-icon">
                <i class="fab fa-google"></i>
              </a>
            </div>
          </form>
        </div>
        <div class="forgotpass"></div>
      </div>
      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button class="btn transparent" id="sign-up-btn">Sign up</button>
          </div>
          <div class="content">
            <h3>Forgot your password ?</h3>
            <p>Don't worry, you can reset your password here.</p>
            <button class="btn transparent" id="forgot-password-btn">
              Change
            </button>
            <div id="password-form" class="password-form hidden">
              <h3>Change Password</h3>
              <form>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required />
                <button
                  type="submit"
                  class="btn transparent"
                  id="forgot-password-submit"
                >
                  Change
                </button>
                <button
                  type="button"
                  class="btn transparent"
                  id="forgot-password-back"
                  style="margin-top: 20px"
                >
                  Back
                </button>
              </form>
            </div>
          </div>

          <img src="../assets/log.svg" class="image" alt="" />
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button class="btn transparent" id="sign-in-btn">Sign in</button>
          </div>
          <img src="../assets/register.svg" class="image" alt="" />
        </div>
      </div>
    </div>
  </body>
</template>
<style>
@import url("./login.css");
</style>
<script>
import firebase from "firebase/compat/app";
import "firebase/auth";
import "firebase/compat/firestore";
// import { gsap } from "gsap";

export default {
  el: ".forms-container",
  data() {
    return {
      email: "",
      password: "",
      showForgotPasswordForm: false,
    };
  },
  mounted() {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    sign_up_btn.addEventListener("click", () => toggleMode(true, false));
    sign_in_btn.addEventListener("click", () => toggleMode(false, false));

    function toggleMode(isSignUp) {
      if (isSignUp) {
        container.classList.add("sign-up-mode");
      } else {
        container.classList.remove("sign-up-mode");
      }
    }

    function triggerAnimation() {
      container.classList.add("animate");
      container.addEventListener("animationend", () =>
        container.classList.remove("animate")
      );
    }

    if (performance == 1) {
      triggerAnimation();
    } else {
      window.onload = triggerAnimation;
    }

    const changePasswordBtn = document.getElementById("forgot-password-btn");
    const passwordForm = document.getElementById("password-form");
    const submitBtn = document.getElementById("forgot-password-submit");
    const backBtn = document.getElementById("forgot-password-back");
    const emailInput = document.getElementById("email");

    changePasswordBtn.addEventListener("click", function () {
      passwordForm.classList.toggle("hidden");
      setTimeout(function () {
        passwordForm.classList.toggle("show");
        // animateForm();
      }, 100);
    });

    backBtn.addEventListener("click", function () {
      passwordForm.classList.toggle("show");
      setTimeout(function () {
        passwordForm.classList.toggle("hidden");
      }, 100);
    });

    submitBtn.addEventListener("click", function (event) {
      event.preventDefault();
      const email = emailInput.value;
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          alert("Password reset email sent. Please check your inbox.");
          passwordForm.classList.toggle("show");
          setTimeout(function () {
            passwordForm.classList.toggle("hidden");
          }, 100);
        })
        .catch((error) => {
          alert("An error occurred. Please try again later.");
          console.error(error);
        });
    });
  },

  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            console.log(user);
            alert("Login successful. Welcome back!");
            localStorage.setItem("userLoggedIn", "true");
            this.$router.push("/");
          },
          (err) => {
            if (
              err.code === "auth/user-not-found" ||
              err.code === "auth/wrong-password"
            ) {
              alert("Email or password is incorrect. Please try again.");
            } else if (err.code === "auth/too-many-requests") {
              alert("Too many failed login attempts. Please try again later.");
            } else if (err.code === "auth/invalid-credential") {
              alert(
                "Invalid credentials. Please check your email and password."
              );
            } else {
              console.log(err);
              alert("An error occurred. Please try again later.");
            }
          }
        );
    },

    signup() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            console.log(user);
            alert("Account created successfully. You are now logged in.");
          },
          (err) => {
            // Handle error here
            if (err.code === "auth/email-already-in-use") {
              alert("Email is already in use. Please use a different email.");
            } else {
              // Menampilkan pesan kesalahan umum
              console.log(err);
              alert("An error occurred. Please try again later.");
            }
          }
        );
    },
    googleLogin() {
      var provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          var user = result.user;
          console.log(user);
          alert("Login successful. Welcome back!");
          localStorage.setItem("userLoggedIn", "true");
          this.$router.push("/");
        })
        .catch((error) => {
          console.error(error);
          alert(
            "An error occurred during Google login. Please try again later."
          );
        });
    },
    toggleForgotPasswordForm() {
      this.showForgotPasswordForm = !this.showForgotPasswordForm;
    },
  },
};
</script>
