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

            <div id="captcha"></div>
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
          <img src="" class="image" alt="" />
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
          <img src="" class="image" alt="" />
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
      captchaVerified: false,
      showForgotPasswordForm: false,
      geetest: "",
    };
  },
  mounted() {
    let initGeetest4;
    const script = document.createElement("script");
    script.src = "https://static.geetest.com/v4/gt4.js";
    script.onload = () => {
      initGeetest4 = window.initGeetest4;
      this.initGeetest4(initGeetest4);
    };
    document.head.appendChild(script);

    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });
  },

  methods: {
    initGeetest4(initGeetest4) {
      if (!initGeetest4) {
        console.error("initGeetest4 function is not available");
        return;
      }

      let web = this;
      initGeetest4(
        {
          product: "bind",
          captchaId: "d541f8dd4140b40e68d14dc68a69727c",
        },
        function (captchaObj) {
          web.geetest = captchaObj;
          captchaObj
            .onReady(function () {})
            .onSuccess(function () {})
            .onError(function () {});

          const button = document.getElementById("button_login");
          button.addEventListener("click", function () {
            captchaObj.showCaptcha();
          });
        }
      );
    },
    login() {
      let vm = this;
      this.geetest.showBox((captchaResult) => {
        if (captchaResult.success) {
          firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(
              (user) => {
                console.log(user);
                this.geetest.showBox();
                alert("Login successful. Welcome back!");
                localStorage.setItem("userLoggedIn", "true");
                vm.$router.push("/");
                // window.location.reload();
              },
              (err) => {
                if (
                  err.code === "auth/user-not-found" ||
                  err.code === "auth/wrong-password"
                ) {
                  alert("Email or password is incorrect. Please try again.");
                } else if (err.code === "auth/too-many-requests") {
                  alert(
                    "Too many failed login attempts. Please try again later."
                  );
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
        } else {
          alert("Please complete the CAPTCHA correctly.");
        }
      });
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
    renderRecaptcha() {
      const script = document.createElement("script");
      script.src =
        "https://www.google.com/recaptcha/api.js?render=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute("6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI", {
              action: "login",
            })
            .then(() => {
              this.captchaVerified = true;
            });
        });
      };
      document.head.appendChild(script);
    },
  },
};
</script>
