import { computed } from "vue";
import { Vue3MultiStepper } from "vue3-multi-stepper";
import "@fortawesome/fontawesome-free/css/all.css";
import { useDropzone } from "vue3-dropzone";

export default {
  components: {
    Vue3MultiStepper,
  },
  name: "App",
  data() {
    return {
      step: 1,
      loading: false,

      tabs: computed(() => {
        return [
          {
            title: "Perkenalan",
            iconSuccess: null,
            isValid: true,
          },
          {
            title: "Company Additional Info",
            iconSuccess: null,
            isValid: true,
          },
          {
            title: "Employees",
            iconSuccess: null,
            isValid: true,
          },

          {
            title: "Your Details",
            iconSuccess: null,
            isValid: true,
          },
          {
            title: "Verification",
            iconSuccess: null,
            isValid: true,
          },
          {
            title: "Complete",
            iconSuccess: null,
            isValid: true,
          },
        ];
      }),
      ayah: {
        hubungan: "Ayah",
        nama: "",
      },
      ibu: {
        hubungan: "Ibu",
        nama: "",
      },
      saudara: [],
      anak: [],
      name: "UseDropzoneDemo",
      active: false,
      uploadedImageUrl: null,
      status_rumah_tinggal: "",
      otherText: "",
    };
  },

  methods: {
    async handleFormSubmission() {
      this.loading = true;

      // After 2 seconds, reload the page and start the flow again
      setTimeout(() => {
        location.reload();
      }, 2000);
    },
    toggleActive() {
      this.active = !this.active;
    },

    handleFileSelect(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.uploadedImageUrl = reader.result;
      };

      reader.readAsDataURL(file);
    },
    validateStep(step) {
      // Perform validation based on the current step
      // Return true if the step is valid, otherwise return false
      if (step === 1) {
        return this.step1Check();
      } else if (step === 2) {
        return this.step2Check();
      } else if (step === 3) {
        return this.step3Check();
      } else if (step === 4) {
        return this.step4Check();
      } else if (step === 5) {
        return this.step5Check();
      }

      return true; // Default to true if no validation is implemented
    },
    focusOnInput() {
      if (this.status_rumah_tinggal === "Lainnya") {
        this.$nextTick(() => {
          this.$refs.otherInput.focus();
        });
      }
    },

    /* <<<CHECKER FUNCTIONS>>>
     * These functions are responsible for performing a check or validation and returning a boolean value.
     * If the returned value is `true`, it indicates that the check has passed successfully, allowing the code to proceed to the next step in the JavaScript execution flow.
     *
     * This function is commonly used in multi-step processes or conditional branching scenarios. It helps determine whether the conditions required for the next step to be executed have been met.
     *
     * The implementation details of the check performed in each function may vary depending on the specific requirements of the software being developed. It could involve verifying certain data, validating user input, or checking the state of the application.
     *
     * Upon receiving a `true` result from the function, the calling code can safely proceed to execute the subsequent steps or perform further actions. If `false` is returned, it indicates that the check failed, and appropriate actions can be taken to handle the failed condition.
     *
     * It is important to note that this function plays a crucial role in determining whether the code can progress to the next step based on the successful completion of a specific check or condition.
     *
     * @returns {boolean} - `true` if the check succeeds, allowing the code to proceed to the next step; `false` if the check fails, indicating the need for alternative actions.
     */

    step1Check() {
      return true;
    },
    step2Check() {
      return true;
    },
    step3Check() {
      return true;
    },
    step4Check() {
      return true;
    },
    step5Check() {
      return true;
    },
    step6Check() {
      return true;
    },
    tambahSaudara() {
      this.saudara.push({
        hubungan: "Saudara",
        nama: "",
        jenis_kelamin: "",
        tanggal_lahir: "",
        pendidikan_terakhir: "",
        perusahaan_terakhir: "",
        jabatan_terakhir: "",
        keterangan: "",
      });
    },
    hapusSaudara(index) {
      this.saudara.splice(index, 1);
    },
    tambahAnak() {
      this.anak.push({
        hubungan: "Anak",
        nama: "",
        jenis_kelamin: "",
        tanggal_lahir: "",
        pendidikan_terakhir: "",
        perusahaan_terakhir: "",
        jabatan_terakhir: "",
        keterangan: "",
      });
    },
    hapusAnak(index) {
      this.anak.splice(index, 1);
    },
  },
  setup() {
    const dropzoneFile = ""; // Atur penyimpanan untuk data file

    function onDrop(acceptedFiles) {
      dropzoneFile.value = acceptedFiles[0]; // Perbarui state dengan file yang diterima
    }

    const { getRootProps, getInputProps, ...rest } = useDropzone({ onDrop });

    return {
      getRootProps,
      getInputProps,
      ...rest,
      dropzoneFile,
    };
  },
  watch: {
    status_rumah_tinggal(newValue) {
      // If the selected value is "Lainnya", clear otherText and focus on the input
      if (newValue === "Lainnya") {
        this.otherText = "";
        this.$nextTick(() => {
          this.$refs.otherInput.focus();
        });
      }
    },
  },
};
