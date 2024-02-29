export default {
  data() {
    return {
      valid: false,
      firstname: "",
      lastname: "",
      nameRules: [
        (value) => {
          if (value) return true;

          return "Name is required.";
        },
        (value) => {
          if (value?.length <= 10) return true;

          return "Name must be less than 10 characters.";
        },
      ],
      email: "",
      emailRules: [
        (value) => {
          if (value) return true;

          return "E-mail is requred.";
        },
        (value) => {
          if (/.+@.+\..+/.test(value)) return true;
        },
      ],
    };
  },
  mounted() {
    const menuButton = document.querySelector(".menu");
    const dropdownContent = document.querySelector(".dropdown-content");

    menuButton.addEventListener("click", function () {
      dropdownContent.classList.toggle("show");
    });
  },
};
