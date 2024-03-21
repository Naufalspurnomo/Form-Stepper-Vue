import { computed } from "vue";
import { Vue3MultiStepper } from "vue3-multi-stepper";
import "@fortawesome/fontawesome-free/css/all.css";
import { useDropzone } from "vue3-dropzone";
import firebase from "firebase/compat/app";
import "firebase/auth";
import "firebase/compat/firestore";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

const toast = useToast();

// import { db } from "../main.js";
// import client from "../server";

export default {
  components: {
    Vue3MultiStepper,
    VueDatePicker,
  },
  name: "App",
  data() {
    return {
      step: 1,
      rows: 1,
      loading: false,
      isLoggedIn: false,
      userEmail: null,
      dropdownOpen: false,
      formData: {},
      nextClicked: false,
      snackbar: false,
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
      doneText: "selesai",
      pekerjaan: "",
      nama_lengkap: "",
      alamat: "",
      telepon: "",
      jenis_kelamin: "",
      tinggi_badan: "",
      berat_badan: "",
      agama: "",
      kebangsaan: null,
      countries: [],
      tempat_lahir: "",
      lahir: "",
      status_perkawinan: "",
      golongan_darah: "",
      nomor_ktp: "",
      nomor_sim: "",
      kendaraan: "",
      activePosisi: 0,
      hobiKegiatanLuang: {
        frekuensiBaca: "",
      },
      uraianTugasTanggungJawab: "",
      foto_data_diri: "",
      gambaranStrukturPosisi: "",
      keluarga: [],
      riwayatPendidikan: [],
      kursusTraining: [],
      pengetahuanBahasa: [],
      kegiatanSosial: [],
      riwayatPekerjaan: [],
      referensiKontakKenalan: [],
      active: false,
      uploadedImageUrl: null,
      uploadedImageUrlPosisi: null,
      status_rumah_tinggal: "",
      textRumahLainnya: "",
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
      .then((res) => res.json())
      .then((data) => {
        this.countries = data;
      })
      .catch((err) => {
        console.error(err);
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

    if (this.riwayatPendidikan.length === 0) {
      this.tambahPendidikan();
    }
    if (this.keluarga.length === 0) {
      this.keluarga.push({
        hubungan_keluarga: "Ayah",
        nama: "",
        jenis_kelamin: "",
        tanggal_lahir: "",
        pendidikan_terakhir: "",
        perusahaan_terakhir: "",
        jabatan_terakhir: "",
        keterangan: "",
      });
      this.keluarga.push({
        hubungan_keluarga: "Ibu",
        nama: "",
        jenis_kelamin: "",
        tanggal_lahir: "",
        pendidikan_terakhir: "",
        perusahaan_terakhir: "",
        jabatan_terakhir: "",
        keterangan: "",
      });
    }

    if (this.kursusTraining.length === 0) {
      this.tambahKursus();
    }

    if (this.pengetahuanBahasa.length === 0) {
      this.tambahBahasa();
    }

    if (this.kegiatanSosial.length == 0) {
      this.tambahSosial();
    }

    if (this.riwayatPekerjaan.length == 0) {
      this.tambahRiwayat();
    }

    if (this.referensiKontakKenalan.length == 0) {
      this.tambahReferensi();
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
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
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error while logging out:", error);
          alert("An error occurred while logging out. Please try again later.");
        });
    },

    async handleFormSubmission() {
      const toast = useToast();
      this.loading = true;
      const pertanyaanList = [...this.pertanyaanList];
      const jawaban = this.jawaban.map(({ ya, tidak, penjelasan }) => ({
        ya,
        tidak,
        penjelasan,
      }));

      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        try {
          const userEmail = currentUser.email;

          const formData = {
            pekerjaan: this.pekerjaan || null,
            nama_lengkap: this.nama_lengkap || null,
            alamat: this.alamat || null,
            telepon: this.telepon || null,
            jenis_kelamin: this.jenis_kelamin || null,
            tinggi_badan: this.tinggi_badan || null,
            berat_badan: this.berat_badan || null,
            agama: this.agama || null,
            kebangsaan: this.kebangsaan || null,
            tempat_lahir: this.tempat_lahir || null,
            lahir: this.lahir || null,
            status_perkawinan: this.status_perkawinan || null,
            golongan_darah: this.golongan_darah || null,
            nomor_ktp: this.nomor_ktp || null,
            nomor_sim: this.nomor_sim || null,
            status_rumah_tinggal: this.status_rumah_tinggal || null,
            textRumahLainnya: this.textRumahLainnya || null,
            kendaraan: this.kendaraan || null,
            foto_data_diri: this.uploadedFile
              ? {
                  nama: this.uploadedFile.name,
                  tipe: this.uploadedFile.type,
                }
              : null,
            riwayatPendidikan: this.riwayatPendidikan.filter((item) =>
              Object.values(item).some((value) => value !== "")
            ),
            keluarga: this.keluarga.filter((item) =>
              Object.values(item).some((value) => value !== "")
            ),
            kursusTraining: this.kursusTraining.filter((item) =>
              Object.values(item).some((value) => value !== "")
            ),
            pengetahuanBahasa: this.pengetahuanBahasa.filter((item) =>
              Object.values(item).some((value) => value !== "")
            ),
            kegiatanSosial: this.kegiatanSosial.filter((item) =>
              Object.values(item).some((value) => value !== "")
            ),
            hobiKegiatanLuang: this.hobiKegiatanLuang || null,
            riwayatPekerjaan: this.riwayatPekerjaan.filter((item) =>
              Object.values(item).some((value) => value !== "")
            ),
            referensiKontakKenalan: this.referensiKontakKenalan.filter((item) =>
              Object.values(item).some((value) => value !== "")
            ),
            uraianTugasTanggungJawab: this.uraianTugasTanggungJawab || null,
            pertanyaanList: [],
            gambaranStrukturPosisi: this.uploadedFilePosisi
              ? {
                  nama: this.uploadedFilePosisi.name,
                  tipe: this.uploadedFilePosisi.type,
                }
              : null,
          };

          // Menambahkan userEmail ke formData
          const formDataWithUserEmail = {
            ...formData,
            userEmail: userEmail,
          };

          // Menambahkan jawaban pertanyaan ke formData
          for (let i = 0; i < pertanyaanList.length; i++) {
            formDataWithUserEmail.pertanyaanList.push({
              pertanyaan: pertanyaanList[i],
              jawaban: jawaban[i],
            });
          }

          console.log(">>>>>>>> Data formulir before:", formDataWithUserEmail);

          const cleanFormData = Object.fromEntries(
            Object.entries(formDataWithUserEmail).filter(
              ([, value]) => value != null
            )
          );

          console.log(
            ">>>>>>>> Data formulir yang akan dikirim:",
            JSON.stringify(cleanFormData)
          );

          // Mengirimkan data formulir ke Firestore
          // const docRef = await db.collection("formData").add(cleanFormData);
          // console.log("ID ke Firebase: ", docRef.id);

          const response = await fetch("http://localhost:3000/submitFormData", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            console.log("Form data submitted successfully");
            toast.success("Formulir berhasil disubmit!", {
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
              icon: {
                iconClass: "undefined",
                iconChildren: "",
                iconTag: "i",
              },
              rtl: false,
            });
            setTimeout(() => {
              // window.location.reload();
            }, 5000);
          } else {
            console.error("Failed to submit form data");
          }
        } catch (error) {
          console.error("Error Form: ", error);
        }
      } else {
        console.error("User belum login.");
      }
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
    fotoDataDiri(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.uploadedImageUrl = reader.result;
        this.uploadedFile = {
          name: file.name,
          type: file.type,
        };
      };

      reader.readAsDataURL(file);
    },

    gambaranPosisi(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.uploadedImageUrlPosisi = reader.result;
        // const dataBiner = reader.result.split(",")[1];
        this.uploadedFilePosisi = {
          name: file.name,
          type: file.type,
          // data: dataBiner,
        };
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
          this.$refs.statusRumahLainnya.focus();
        });
      }
    },
    step1Check() {
      if (
        ![...this.pekerjaan] ||
        !this.nama_lengkap ||
        !this.alamat ||
        !this.telepon ||
        !this.jenis_kelamin ||
        !this.agama ||
        !this.kebangsaan ||
        !this.tempat_lahir ||
        !this.lahir ||
        !this.status_perkawinan ||
        !this.nomor_ktp ||
        !this.nomor_sim
      ) {
        this.nextClicked = true;
        toast.error("Silakan isi kelengkapan Anda.", {
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
          icon: {
            iconClass: "undefined",
            iconChildren: "",
            iconTag: "i",
          },
          rtl: false,
        });
        return true;
      } else {
        return true;
      }
    },
    step2Check() {
      const ayah = this.keluarga.find(
        (entry) => entry.hubungan_keluarga === "Ayah"
      );
      const ibu = this.keluarga.find(
        (entry) => entry.hubungan_keluarga === "Ibu"
      );

      if (
        this.riwayatPendidikan.filter((entry) =>
          Object.values(entry).some((value) => value !== "")
        ).length === 0 ||
        this.keluarga.filter((entry) =>
          Object.values(entry).some((value) => value !== "")
        ).length === 0 ||
        this.pengetahuanBahasa.filter((entry) =>
          Object.values(entry).some((value) => value !== "")
        ).length === 0 ||
        !ayah ||
        !ibu
      ) {
        this.nextClicked = true;
        toast.error(
          "Silahkan isi kelengkapan Anda. Pastikan data Ayah dan Ibu terisi.",
          {
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
            icon: {
              iconClass: "undefined",
              iconChildren: "",
              iconTag: "i",
            },
            rtl: false,
          }
        );
        return true;
      }
      return true;
    },
    step3Check() {
      if (
        this.riwayatPekerjaan.filter((entry) =>
          Object.values(entry).some((value) => value !== "")
        ).length === 0 ||
        this.referensiKontakKenalan.filter((entry) =>
          Object.values(entry).some((value) => value !== "")
        ).length === 0
      ) {
        this.nextClicked = true;
        toast.error("Silahkan isi kelengkapan Anda.", {
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
          icon: {
            iconClass: "undefined",
            iconChildren: "",
            iconTag: "i",
          },
          rtl: false,
        });
        return true;
      }
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
        hubungan_keluarga: "",
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
      const konfirmasi = confirm("Apakah yakin ingin dihapus?");
      if (konfirmasi) {
        this.keluarga.pop();
      }
    },

    tambahPendidikan() {
      this.riwayatPendidikan.push({
        tingkat_pendidikan: "",
        nama_sekolah: "",
        tempat_sekolah: "",
        jurusan_sekolah: "",
        tahun_masuk: "",
        tahun_keluar: "",
        status_kelulusan: "",
      });
    },
    hapusPendidikan() {
      const konfirmasi = confirm("Apakah yakin ingin dihapus?");
      if (konfirmasi) {
        this.riwayatPendidikan.pop();
      }
    },
    tambahKursus() {
      this.kursusTraining.push({
        jenis_kursus: "",
        penyelenggara: "",
        lokasi: "",
        lama_kursus: "",
        tahun_mulai_kursus: "",
        biaya_kursus: "",
      });
    },
    hapusKursus() {
      const konfirmasi = confirm("Apakah yakin ingin dihapus?");
      if (konfirmasi) {
        this.kursusTraining.pop();
      }
    },
    tambahBahasa() {
      this.pengetahuanBahasa.push({
        jenis_bahasa: "",
        tingkat_membaca: "",
        tingkat_menulis: "",
        tingkat_mendengar: "",
        tingkat_berbicara: "",
      });
    },
    hapusBahasa() {
      const konfirmasi = confirm("Apakah yakin ingin dihapus?");
      if (konfirmasi) {
        this.pengetahuanBahasa.pop();
      }
    },
    tambahSosial() {
      this.kegiatanSosial.push({
        kegiatan_organisasi: "",
        macam_kegiatan: "",
        jabatan: "",
        tahun_saat_berkegiatan: "",
        keterangan: "",
      });
    },
    hapusSosial() {
      const konfirmasi = confirm("Apakah yakin ingin dihapus?");
      if (konfirmasi) {
        this.kegiatanSosial.pop();
      }
    },
    tambahRiwayat() {
      this.riwayatPekerjaan.push({
        pekerjaan_dimulai: "",
        pekerjaan_selesai: "",
        nama_perusahaan: "",
        alamat_perusahaan: "",
        telepon_perusahaan: "",
        jabatan_awal: "",
        jabatan_akhir: "",
        jenis_usaha: "",
        jumlah_karyawan: "",
        nama_atasan: "",
        nama_direktur: "",
        alasan_berhenti: "",
      });
    },
    hapusRiwayat() {
      const konfirmasi = confirm("Apakah yakin ingin dihapus?");
      if (konfirmasi) {
        this.riwayatPekerjaan.pop();
      }
    },
    tambahReferensi() {
      this.referensiKontakKenalan.push({
        nama_kenalan: "",
        alamat_telp: "",
        pekerjaan: "",
        hubungan: "",
      });
    },
    hapusReferensi() {
      const konfirmasi = confirm("Apakah yakin ingin dihapus?");
      if (konfirmasi) {
        this.referensiKontakKenalan.pop();
      }
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

    // const toast = useToast();

    // const showToast = () => {
    //   toast.success("Hello, world!", {
    //     timeout: 2000,
    //   });
    // };

    return {
      getRootProps,
      getInputProps,
      ...rest,
      dropzoneFile,
      // showToast,
    };
  },

  watch: {
    status_rumah_tinggal(newValue) {
      if (newValue === "Lainnya") {
        this.textRumahLainnya = "";
        this.$nextTick(() => {
          this.$refs.statusRumahLainnya.focus();
        });
      }
    },
  },
};
