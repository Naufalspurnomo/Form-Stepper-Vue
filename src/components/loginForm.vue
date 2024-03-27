<template>
  <body>
    <div class="container">
      <div class="forms-container">
        <div class="signin-signup">
          <form action="#" class="sign-in-form" @submit.prevent>
            <h2 class="title">Sign in</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input type="email" v-model="email" placeholder="Email" />
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
              @click.prevent="loginWithCaptcha"
            >
              Login
            </button>
            <p class="social-text">━━ Or Sign in with social platforms ━━</p>
            <div class="social-media">
              <a href="#" class="social-icon" @click="loginGoogleWithCaptcha">
                <i class="fab fa-google"></i>
              </a>
            </div>
          </form>

          <form action="#" class="sign-up-form" @submit.prevent>
            <h2 class="title">Sign up</h2>
            <div class="input-field">
              <i class="fas fa-envelope"></i>
              <input type="email" v-model="email" placeholder="Email" />
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
              v-bind:value="signupButtonText"
              id="button_signup"
              @click.prevent="signupButton"
            >
              {{ signupButtonText }}
            </button>

            <p class="social-text" v-if="showSocialMedia">
              ━━ Or Sign up with social platforms ━━
            </p>
            <div class="social-media" v-if="showSocialMedia">
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
            <button class="btn transparent" id="sign-up-btn">
              <i class="fas fa-user-plus"></i> Sign up
            </button>
          </div>
          <img src="../assets/loginlogo.svg" class="image" alt="" />
        </div>
        <div class="panel right-panel">
          <div class="content">
            <button class="btn transparent" id="sign-in-btn">
              <i class="fa fa-user"></i> Login
            </button>
          </div>
          <img src="../assets/signuplogo.svg" class="image" alt="" />
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
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

const toast = useToast();

// import { gsap } from "gsap";

export default {
  el: ".forms-container",
  data() {
    return {
      email: "",
      password: "",
      captchaVerified: false,
      showForgotPasswordForm: false,
      signupButtonText: "Sign Up",
      signupButton: this.signup,
      showSocialMedia: true,
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
            .onSuccess(function () {
              web.login();
            })
            .onError(function () {});
        }
      );
    },

    loginWithCaptcha() {
      if (!this.geetest) {
        console.error("ERROR");
        return;
      }
      this.geetest.showBox();

      this.geetest.onSuccess(() => {});
    },

    loginGoogleWithCaptcha() {
      if (!this.geetest) {
        console.error("ERROR");
        return;
      }
      this.geetest.showBox();
      this.geetest.onSuccess(() => {
        this.googleLogin();
      });
    },

    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          console.log(userCredential);
          const user = userCredential.user;
          if (user && user.emailVerified) {
            toast.success("Login sukses, selamat datang kembali!", {
              position: "top-right",
              timeout: 5000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: true,
              hideProgressBar: true,
              closeButton: "button",
              icon: "fa fa-id-badge",
              rtl: false,
            });
            localStorage.setItem("userLoggedIn", "true");
            this.$router.push("/");
          } else {
            toast.error("Verifikasi Email terlebih dahulu!", {
              position: "top-right",
              timeout: 5000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: true,
              hideProgressBar: false,
              closeButton: "button",
              icon: "fa fa-exclamation-circle",
              rtl: false,
            });
          }
        })
        .catch((err) => {
          if (
            err.code === "auth/user-not-found" ||
            err.code === "auth/wrong-password" ||
            err.code === "auth/invalid-credential" ||
            err.code === "auth/missing-password"
          ) {
            toast.error("Error, Password / Email salah!", {
              position: "top-right",
              timeout: 5000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: true,
              hideProgressBar: false,
              closeButton: "button",
              icon: "fa fa-exclamation-circle",
              rtl: false,
            });
          } else if (err.code === "auth/too-many-requests") {
            toast.error("Error, terlalu banyak aksi, coba lagi nanti!", {
              position: "top-right",
              timeout: 5000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: true,
              hideProgressBar: false,
              closeButton: "button",
              icon: "fa fa-exclamation-circle",
              rtl: false,
            });
          } else {
            console.log(err);
          }
        });
    },

    signup() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          (userCredential) => {
            userCredential.user.sendEmailVerification();

            firebase.auth().onAuthStateChanged((user) => {
              if (user && user.emailVerified) {
                window.location.reload();
              }
            });

            this.signupButtonText = "Cek Email Anda";
            this.signupButton = this.checkEmail;

            this.showSocialMedia = false;

            toast.success(
              "Email berhasil dibuat, silakan verifikasi akun Anda!",
              {
                position: "top-right",
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: true,
                hideProgressBar: true,
                closeButton: "button",
                icon: "fa fa-id-badge",
                rtl: false,
              }
            );
          },
          (error) => {
            if (error.code === "auth/email-already-in-use") {
              toast.error("Error, Email sudah digunakan!", {
                position: "top-right",
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: true,
                hideProgressBar: false,
                closeButton: "button",
                icon: "fa fa-exclamation-circle",
                rtl: false,
              });
            } else {
              console.error(error);
            }
          }
        );
    },
    checkEmail() {
      const user = firebase.auth().currentUser;
      if (user && user.emailVerified) {
        window.location.reload();
      } else {
        window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
      }
    },
    googleLogin() {
      var provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          var user = result.user;
          console.log(user);
          alert("Login sukses, selamat datang kembali!");
          localStorage.setItem("userLoggedIn", "true");
          this.$router.push("/");
        })
        .catch((error) => {
          console.error(error);
          alert(
            "Terjadi kesalahan saat login Google. Silakan coba lagi nanti."
          );
        });
    },
    toggleForgotPasswordForm() {
      this.showForgotPasswordForm = !this.showForgotPasswordForm;
    },
    // renderRecaptcha() {
    //   const script = document.createElement("script");
    //   script.src =
    //     "https://www.google.com/recaptcha/api.js?render=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
    //   script.async = true;
    //   script.defer = true;
    //   script.onload = () => {
    //     window.grecaptcha.ready(() => {
    //       window.grecaptcha
    //         .execute("6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI", {
    //           action: "login",
    //         })
    //         .then(() => {
    //           this.captchaVerified = true;
    //         });
    //     });
    //   };
    //   document.head.appendChild(script);
    // },
  },
};
</script>
