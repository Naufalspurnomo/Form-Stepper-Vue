import { computed } from "vue";
import { Vue3MultiStepper } from "vue3-multi-stepper";
import "@fortawesome/fontawesome-free/css/all.css";
import { useDropzone } from "vue3-dropzone";
import firebase from "firebase/compat/app";
import "firebase/auth";
import "firebase/compat/firestore";

export default {
  components: {
    Vue3MultiStepper,
  },
  name: "App",
  data() {
    return {
      step: 1,
      rows: 1,
      loading: false,
      isLoggedIn: false,
      userEmail: null,
      showDropdown: false,
      formData: {},

      tabs: computed(() => {
        return [
          {
            title: "Perkenalan",
            iconSuccess: null,
            isValid: true,
          },
          {
            title: "Informasi Detail",
            iconSuccess: null,
            isValid: true,
          },
          {
            title: "Informasi Pekerjaan",
            iconSuccess: null,
            isValid: true,
          },

          {
            title: "Pertanyaan",
            iconSuccess: null,
            isValid: true,
          },
          {
            title: "Validasi",
            iconSuccess: null,
            isValid: true,
          },
        ];
      }),

      pekerjaan: "",
      nama_lengkap: "",
      alamat: "",
      telepon: "",
      jenis_kelamin: "",
      tinggi_badan: "",
      berat_badan: "",
      agama: "",
      kebangsaan: "",
      countries: [],
      tempat_lahir: "",
      lahir: "",
      status_perkawinan: "",
      golongan_darah: "",
      nomor_ktp: "",
      nomor_sim: "",
      kendaraan: "",
      hobi: "",
      uraian: "",
      gambaran: "",
      keluarga: [],
      pendidikan: [],
      kursus: [],
      bahasa: [],
      sosial: [],
      riwayat: [],
      referensi: [],
      name: "UseDropzoneDemo",
      active: false,
      uploadedImageUrl: null,
      status_rumah_tinggal: "",
      otherText: "",
      pertanyaanList: [
        "Apakah anda pernah melamar di group/perusahaan ini sebelumnya ? bila mana dan sebagai apa ?",
        "Selain disini, di perusahaan mana lagi anda melamar waktu ini ? sebagai apa ?",
        "Apakah anda terikat kontrak dengan perusahaan tempat kerja anda pada saat ini ?",
        "Apakah anda mempunyai pekerjaan sampingan/part time ? di mana dan sebagai apa ?",
        "Apakah anda berkeberatan bila kami minta referensi pada perusahaan tempat anda pernah bekerja ?",
        "Apakah anda mempunyai teman / sanak saudara yang bekerja di group / perusahaan ini ? Jelaskan ?",
        "Apakah anda pernah menderita sakit keras/kronis/kecelakaan berat/operasi ? bilamana, di mana dan untuk tujuan apa ?",
        "Apakah anda pernah menjalani pemeriksaan psikologis/psikotest ? bilamana , dimana dan untuk tujuan apa ?",
        "Apakah anda pernah berurusan dengan polisi karena tindak kejahatan ?",
        "Bila diterima, bersediakah anda ditugaskan/ditempatkan di luar kota ?",
        "PBerapakah gaji terakhir anda? Dan berapa gaji & fasilitas lain yang anda harapkan apabila diterima bekerja di Perusahaan ini?",
        "Macam pekerjaan/jabatan apakah yang sesuai dengan cita-cita anda ?",
        "Macam pekerjaan bagaimana yang anda tidak sukai ?",
        "Bila diterima kapankah anda dapat mulai bekerja ?",
      ],
      jawaban: new Array(14)
        .fill()
        .map(() => ({ ya: false, tidak: false, penjelasan: "" })),
    };
  },
  mounted() {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        this.countries = data.map((negara) => ({
          alpha2Code: negara.alpha2Code,
          name: negara.name.common,
        }));
      })
      .catch((error) => {
        console.error("Error fetching negara data:", error);
      });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //  BELOM LOGIN
        this.isLoggedIn = true;
        this.userEmail = user.email;
      } else {
        //  UDAH LOGIN
        this.isLoggedIn = false;
        this.userEmail = null;
      }
    });

    if (this.pendidikan.length === 0) {
      this.tambahPendidikan();
    }
    if (this.keluarga.length === 0) {
      this.tambahKeluarga();
    }

    if (this.kursus.length === 0) {
      this.tambahKursus();
    }
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.isLoggedIn = false;
          this.userEmail = null;
          localStorage.removeItem("userLoggedIn");
          this.$router.push("/login");
        })
        .catch((error) => {
          console.error("Error while logging out:", error);
          alert("An error occurred while logging out. Please try again later.");
        });
    },
    async handleFormSubmission() {
      const pendidikan = [];

      pendidikan.push({
        ...this.pendidikan,
      });

      const keluarga = [];

      keluarga.push({
        ...this.keluarga,
      });

      const kursus = [];

      kursus.push({
        ...this.kursus,
      });

      const formData = {
        pekerjaan: this.pekerjaan,
        nama_lengkap: this.nama_lengkap,
        alamat: this.alamat,
        telepon: this.telepon,
        jenis_kelamin: this.jenis_kelamin,
        tinggi_badan: this.tinggi_badan,
        berat_badan: this.berat_badan,
        agama: this.agama,
        kebangsaan: this.kebangsaan,
        tempat_lahir: this.tempat_lahir,
        lahir: this.lahir,
        status_perkawinan: this.status_perkawinan,
        golongan_darah: this.golongan_darah,
        nomor_ktp: this.nomor_ktp,
        nomor_sim: this.nomor_sim,
        status_rumah_tinggal: this.status_rumah_tinggal,
        otherText: this.otherText,
        kendaraan: this.kendaraan,
        pendidikan: pendidikan,
        keluarga: keluarga,
        kursus: kursus,
        bahasa: [...this.bahasa],
        sosial: [...this.sosial],
        hobi: this.hobi,
        riwayat: [...this.riwayat],
        referensi: [...this.referensi],
        uraian: this.uraian,
        gambaran: this.gambaran,
      };

      console.log(">>>>>>>> Data formulir before:", formData);
      const jsonData = JSON.stringify(formData);

      console.log(">>>>>>>> Data formulir yang akan dikirim:", jsonData);
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
    tambahKeluarga() {
      this.keluarga.push({
        hubungan: "",
        nama: "",
        jenis_kelamin: "",
        tanggal_lahir: "",
        pendidikan_terakhir: "",
        perusahaan_terakhir: "",
        jabatan_terakhir: "",
        keterangan: "",
      });
    },
    hapusKeluarga() {
      this.saudara.pop();
    },

    tambahPendidikan() {
      this.pendidikan.push({
        tingkat: "",
        namasekolah: "",
        tempatkota: "",
        jurusan: "",
        tahunDari: "",
        tahunSampai: "",
        statuskelulusan: "",
      });
    },
    hapusPendidikan() {
      this.pendidikan.pop();
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
    tambahRiwayat() {
      this.riwayat.push({
        dari: "",
        sampai: "",
        namaPerusahaan: "",
        alamatPerusahaan: "",
        teleponPerusahaan: "",
        jabatanAwal: "",
        jabatanAkhir: "",
        jenisUsaha: "",
        jumlahKaryawan: "",
        namaAtasanLangsung: "",
        namaDirektur: "",
        alasanBerhenti: "",
      });
    },
    hapusRiwayat() {
      this.riwayat.pop();
    },
    tambahReferensi() {
      this.referensi.push({
        nama: "",
        alamatTelp: "",
        pekerjaan: "",
        hubungan: "",
      });
    },
    hapusReferensi() {
      this.referensi.pop();
    },
    toggleCheck(index, option) {
      if (option === "ya") {
        this.jawaban[index].tidak = false;
      } else if (option === "tidak") {
        this.jawaban[index].ya = false;
      }
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
