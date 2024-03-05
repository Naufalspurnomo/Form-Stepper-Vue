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
        hubungan: "Ayah (Kandung/Tiri)",
        nama: "",
      },
      ibu: {
        hubungan: "Ibu (Kandung/Tiri)",
        nama: "",
      },
      saudara: [],
      anak: [],
      sd: [],
      smp: [],
      sma: [],
      kuliah: [],
      kursus: [],
      bahasa: [],
      sosial: [],
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
    scrollToTop() {
      const scrollStep = window.scrollY / 20;
      const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
          window.scrollBy(0, -scrollStep);
        } else {
          clearInterval(scrollInterval);
        }
      }, 15);
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
      this.scrollToTop();
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
      return true;
    },

    focusOnInput() {
      if (this.status_rumah_tinggal === "Lainnya") {
        this.$nextTick(() => {
          this.$refs.otherInput.focus();
        });
      }
    },

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
    hapusSaudara() {
      this.saudara.pop();
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
    hapusAnak() {
      this.anak.pop();
    },
    tambahKuliah() {
      this.kuliah.push({
        nama_sekolah: "",
        tempatkota: "",
        jurusan: "",
      });
    },
    hapusKuliah() {
      this.kuliah.pop();
    },
    tambahKursus() {
      this.kursus.push({
        bidang: "",
        penyelenggara: "",
        lokasi: "",
        lama: "",
        tahun: "",
        biaya: "",
      });
    },
    hapusKursus() {
      this.kursus.pop();
    },
    tambahBahasa() {
      this.bahasa.push({
        macambahasa: "Bahasa",
        membaca: "",
        menulis: "",
        mendengar: "",
        berbicara: "",
      });
    },
    hapusBahasa() {
      this.bahasa.pop();
    },
    tambahSosial() {
      this.sosial.push({
        organisasi: "",
        kegiatan: "",
        jabatan: "",
        tahun: "",
        keterangan: "",
      });
    },
    hapusSosial() {
      this.sosial.pop();
    },
  },
  setup() {
    const dropzoneFile = "";

    function onDrop(acceptedFiles) {
      dropzoneFile.value = acceptedFiles[0];
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
