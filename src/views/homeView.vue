<template>
  <div>
    <div class="header">
      <div class="main-header">
        <div class="logo">
          <img src="../assets/pt_sanqua_cover.jpg" alt="Logo" />
          <img src="../assets/pt_sanqu_cover2.jpg" alt="Logo" />
        </div>
        <div class="header-akun">
          <div class="dropdown">
            <button
              class="dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              @click="toggleDropdown"
            >
             <i class="fas fa-user-circle"></i>
             <span class="nama-akun">
                {{ isLoggedIn ? userEmail : 'Masuk Akun' }} 
             </span> 
            </button>
        
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton" v-show="dropdownOpen">
              <li v-if="isLoggedIn">
                <a class="dropdown-item" @click.prevent="logout">Keluar Akun</a>
              </li>
              <li v-else>
                <router-link class="dropdown-item" :to="{ name: 'Login' }">Masuk Akun</router-link>
              </li>
            </ul>
          </div>
        </div>
        
        
      
      
      </div>
      <!-- <div class="sides" id="logoSide">
            <img src="./assets/pt_sanqua_cover.jpg" alt="Logo Website" />
          </div> -->
      <!-- <div class="sides" id="menuSide">
            <a href="#" class="menu"> </a>
            <div class="dropdown-content">
              <a href="#">Menu 1</a>
              <a href="#">Menu 2</a>
              <a href="#">Menu 3</a>
            </div>
          </div> -->
      <div class="info">
        <h1><a href="#category">PT. SanQua</a></h1>
        <h2>PEREKRUTAN KARYAWAN</h2>
      </div>
    </div>
  </div>

  <Vue3MultiStepper
    v-model:step="step"
    :tabs="tabs"
    primaryColor1="#79031D"
    primaryColor2="#F2E6E8"
    backText="Kembali"
    nextText="Lanjut"
    doneText="Selesai"
    :loading="loading"
    :finalize="handleFormSubmission"
    :validateStep="validateStep"
    class="vue3-multi-stepper"
  >
    <template #1
      ><!-- Step 1 Content -->
      <div class="container-form">
        <h2>Data Diri</h2>
        <div class="form-group">
          <label for="pekerjaan">Pekerjaan Yang Dilamar</label>
          <input
            type="text"
            id="pekerjaan"
            v-model="pekerjaan"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="nama_lengkap">Nama Lengkap</label>
          <input
            type="text"
            id="nama_lengkap"
            v-model="nama_lengkap"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="alamat">Alamat Berdasarkan KTP</label>
          <textarea
            id="alamat"
            v-model="alamat"
            class="form-control"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="telepon">Telepon</label>
          <input
            type="text"
            id="telepon"
            v-model="telepon"
            class="form-control"
            oninput="this.value = this.value.replace(/[^0-9]/g, '')"
          />
        </div>

        <div class="form-group">
          <label for="jenis_kelamin">Jenis Kelamin</label>
          <select
            id="jenis_kelamin"
            v-model="jenis_kelamin"
            class="form-control"
          >
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>

        <div class="form-group">
          <label for="tinggi_badan">Tinggi Badan (cm)</label>
          <input
            type="number"
            id="tinggi_badan"
            v-model="tinggi_badan"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="berat_badan">Berat Badan (kg)</label>
          <input
            type="number"
            id="berat_badan"
            v-model="berat_badan"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="agama">Agama</label>
          <input type="text" id="agama" v-model="agama" class="form-control" />
        </div>

        <div class="form-group">
          <label for="countries">Choose your Country:</label>
          <select id="countries" name="countries" v-model="kebangsaan">
            <option value="" disabled>Select your country</option>
            <option v-for="(country, index) in countries" :key="index" :value="country.name.common">{{ country.name.common }}</option>  
          </select>  
        </div>
      

        <div class="form-group">
          <label for="tempat-lahir">Tempat Lahir</label>
          <input
            type="text"
            id="tempat-lahir"
            v-model="tempat_lahir"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="lahir">Tanggal Lahir</label>
          <input type="date" id="lahir" v-model="lahir" class="form-control" />
        </div>

        <div class="form-group">
          <label for="status_perkawinan">Status Perkawinan</label>
          <select
            id="status_perkawinan"
            v-model="status_perkawinan"
            class="form-control"
          >
            <option value="Belum Menikah">Belum Menikah</option>
            <option value="Menikah">Menikah</option>
            <option value="Janda/Duda">Janda/Duda</option>
          </select>
        </div>

        <div class="form-group">
          <label for="golongan_darah">Golongan Darah</label>
          <select
            id="golongan_darah"
            v-model="golongan_darah"
            class="form-control"
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
            <option value="O">O</option>
          </select>
        </div>

        <div class="form-group">
          <label for="nomor_ktp">Nomor KTP</label>
          <input
            type="text"
            id="nomor_ktp"
            v-model="nomor_ktp"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="nomor_sim">Nomor SIM</label>
          <input
            type="text"
            id="nomor_sim"
            v-model="nomor_sim"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="status_rumah_tinggal">Status Rumah Tinggal</label>
          <select
            id="status_rumah_tinggal"
            v-model="status_rumah_tinggal"
            class="form-control"
            @change="focusOnInput"
          >
            <option value="Milik Sendiri">Milik Sendiri</option>
            <option value="Sewa/Kontrak">Sewa/Kontrak</option>
            <option value="Indekost">Indekost</option>
            <option value="Milik Orang Tua">Milik Orang Tua</option>
            <option value="Lainnya">Lainnya</option>
          </select>
          <!-- Input field for custom text -->
          <input
            ref="statusRumahLainnya"
            v-if="status_rumah_tinggal === 'Lainnya'"
            type="text"
            v-model="textRumahLainnya"
            class="form-control mt-2"
            placeholder="Tuliskan status rumah tinggal lainnya"
          />
        </div>

        <div class="form-group">
          <label for="kendaraan">Kendaraan</label>
          <input
            type="text"
            id="kendaraan"
            v-model="kendaraan"
            class="form-control"
          />
          <p class="help-block">
            Note: Beritahukan dengan rinci. Seperti jenis, merk, tahun, dan
            status kepemilikan.
          </p>
        </div>

        <div class="uploadfoto">
          <div
            @dragenter.prevent="toggleActive"
            @dragleave.prevent="toggleActive"
            @dragover.prevent
            @drop.prevent="handleDrop"
            :class="{ 'active-dropzone': active }"
            class="dropzone"
          >
            <label for="dropzone">Upload Foto Diri</label>
            <input
              type="file"
              id="dropzoneFile"
              class="dropzoneFile"
              ref="fileInput"
              @change="fotoDataDiri"
            />
          </div>
          <img
            id="uploadedImage"
            v-if="uploadedImageUrl"
            :src="uploadedImageUrl"
          />
        </div>
      </div>
    </template>

    <template #2>
      <div class="container-form">
        <!-- Step 2 Content -->
        <!-- RIWAYAT PENDIDIKAN -->
        <div id="app">
          <h2>Riwayat Pendidikan Formal</h2>

          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th rowspan="2">Tingkat</th>
                  <th rowspan="2">Nama Sekolah</th>
                  <th rowspan="2">Tempat/Kota</th>
                  <th rowspan="2">Jurusan</th>
                  <th colspan="2">Tahun</th>
                  <th rowspan="2">Status Kelulusan</th>
                </tr>
                <tr>
                  <th>Dari</th>
                  <th>Sampai</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(riwayatPendidikan, index) in riwayatPendidikan" :key="index">
                  <td>
                    <select v-model="riwayatPendidikan.tingkat_pendidikan">
                      <option value="SD/Sederajat">SD/Sederajat</option>
                      <option value="SMP/Sederajat">SMP/Sederajat</option>
                      <option value="SMA/Sederajat">SMA/Sederajat</option>
                      <option value="D1">D1</option>
                      <option value="D2">D2</option>
                      <option value="D3">D3</option>
                      <option value="S1">S1</option>
                      <option value="S2">S2</option>
                      <option value="S3">S3</option>
                    </select>
                  </td>
                  <td>
                    <input type="text" v-model="riwayatPendidikan.nama_sekolah" />
                  </td>
                  <td>
                    <input type="text" v-model="riwayatPendidikan.tempat_sekolah" />
                  </td>
                  <td>
                    <input
                      type="text"
                      v-model="riwayatPendidikan.jurusan_sekolah"
                      placeholder=""
                    />
                  </td>
                  <td>
                    <VueDatePicker 
                    style="width:80px" 
                    v-model="riwayatPendidikan.tahunMasuk" 
                    year-picker 
                    :min-date="new Date('2000-01-01')"
                    :max-date="new Date('2024-12-31')"
                />
                
                  </td>
                  
                  <td>
                   <VueDatePicker style="width:80px" v-model="riwayatPendidikan.tahunKeluar" year-picker 
                   :min-date="new Date('2000-01-01')"
                   :max-date="new Date('2024-12-31')" />
                  </td>
                  <td>
                    <select v-model="riwayatPendidikan.status_kelulusan">
                      <option value="Lulus">Lulus</option>
                      <option value="Tidak">Tidak Lulus</option>
                      <option value="Belum">Belum Lulus</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button
                      class="tambah"
                      @click.stop="tambahPendidikan()"
                    >
                      +
                    </button>
                    <button @click.stop="hapusPendidikan()" class="hapus">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- SUSUNAN KELUARGA -->
        <div id="app">
          <h2>Susunan Keluarga</h2>

          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th rowspan="2">Hubungan Keluarga</th>
                  <th rowspan="2">Nama</th>
                  <th rowspan="2">Jenis Kelamin</th>
                  <th rowspan="2">Tanggal Lahir</th>
                  <th rowspan="2">Pendidikan Terakhir</th>
                  <th rowspan="2">Perusahaan Terakhir</th>
                  <th rowspan="2">Jabatan Terakhir</th>
                  <th rowspan="2">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(keluarga, index) in keluarga" :key="index">
                  <td><input type="text" v-model="keluarga.hubungan_keluarga" /></td>
                  <td><input type="text" v-model="keluarga.nama" /></td>
                  <td>
                    <select
                    id="jenis_kelamin"
                    v-model="keluarga.jenis_kelamin"
                    class="form-control"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                  </td>
                  <td>
                    <input type="date" v-model="keluarga.tanggal_lahir" />
                  </td>
                  <td>
                    <select v-model="keluarga.pendidikan_terakhir" >
                      <option value="SD/Sederajat">SD/Sederajat</option>
                      <option value="SMP/Sederajat">SMP/Sederajat</option>
                      <option value="SMA/Sederajat">SMA/Sederajat</option>
                      <option value="D1">D1</option>
                      <option value="D2">D2</option>
                      <option value="D3">D3</option>
                      <option value="S1">S1</option>
                      <option value="S2">S2</option>
                      <option value="S3">S3</option>
                    </select>
                  </td>
                  <td>
                    <input type="text" v-model="keluarga.perusahaan_terakhir" />
                  </td>
                  <td>
                    <input type="text" v-model="keluarga.jabatan_terakhir" />
                  </td>
                  <td>
                    <input type="text" v-model="keluarga.keterangan" />
                  </td>
                </tr>

                <tr>
                  <td>
                    <button
                      class="tambah"
                      @click.stop="tambahKeluarga()"
                    >
                      +
                    </button>
                    <button @click.stop="hapusKeluarga()" class="hapus">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- KURSUS/TRAINING -->
        <div id="app">
          <h2>Kursus/Training</h2>

          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th rowspan="2">Bidang/Jenis</th>
                  <th rowspan="2">Penyelenggara</th>
                  <th rowspan="2">Lokasi</th>
                  <th rowspan="2">Lama Kursus</th>
                  <th rowspan="2">Tahun</th>
                  <th rowspan="2">Dibiayai oleh</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(kursus_training, index) in kursus_training" :key="index">
                  <td><input type="text" v-model="kursus_training.jenis_kursus" /></td>
                  <td><input type="text" v-model="kursus_training.penyelenggara" /></td>
                  <td><input type="text" v-model="kursus_training.lokasi" /></td>
                  <td><input type="text" v-model="kursus_training.lama_kursus" /></td>
                  <td><input type="number" v-model="kursus_training.tahun_mulai_kursus" /></td>
                  <td><input type="text" v-model="kursus_training.biaya_kursus" /></td>
                </tr>
              </tbody>

              <tr>
                <td>
                  <button
                    class="tambah"
                    @click.stop="tambahKursus()"
                    placeholder="Kursus"
                  >
                    +
                  </button>
                  <button @click.stop="hapusKursus(index)" class="hapus">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <!-- PENGETAHUAN BAHASA -->
        <div id="app">
          <h2>Pengetahuan Bahasa</h2>

          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th rowspan="2">Jenis Bahasa</th>
                  <th rowspan="2">Membaca</th>
                  <th rowspan="2">Menulis</th>
                  <th rowspan="2">Mendengar</th>
                  <th rowspan="2">Berbicara</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(pengetahuanBahasa, index) in pengetahuanBahasa" :key="index">
                  <td>
                    <input type="text" v-model="pengetahuanBahasa.jenis_bahasa" />
                  </td>
                  <td>
                    <select v-model="pengetahuanBahasa.tingkat_membaca">
                      <option value="Lulus">Baik Sekali</option>
                      <option value="Tidak">Baik</option>
                      <option value="Belum">Cukup</option>
                    </select>
                  </td>
                  <td>
                    <select v-model="pengetahuanBahasa.tingkat_menulis">
                      <option value="Lulus">Baik Sekali</option>
                      <option value="Tidak">Baik</option>
                      <option value="Belum">Cukup</option>
                    </select>
                  </td>
                  <td>
                    <select v-model="pengetahuanBahasa.tingkat_mendengar">
                      <option value="Lulus">Baik Sekali</option>
                      <option value="Tidak">Baik</option>
                      <option value="Belum">Cukup</option>
                    </select>
                  </td>
                  <td>
                    <select v-model="pengetahuanBahasa.tingkat_berbicara">
                      <option value="Lulus">Baik Sekali</option>
                      <option value="Tidak">Baik</option>
                      <option value="Belum">Cukup</option>
                    </select>
                  </td>
                </tr>
              </tbody>

              <tr>
                <td>
                  <button
                    class="tambah"
                    @click.stop="tambahBahasa()"
                    placeholder="Bahasa"
                  >
                    +
                  </button>
                  <button @click.stop="hapusBahasa(index)" class="hapus">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <!-- KEGIATAN SOSIAL -->
        <div id="app">
          <h2>Kegiatan Sosial</h2>

          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th rowspan="2">Organisasi</th>
                  <th rowspan="2">Macam Kegiatan</th>
                  <th rowspan="2">Jabatan</th>
                  <th rowspan="2">Tahun</th>
                  <th rowspan="2">Keterangan</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(kegiatanSosial, index) in kegiatanSosial" :key="index">
                  <td><input type="text" v-model="kegiatanSosial.kegiatan_organisasi" /></td>
                  <td><input type="text" v-model="kegiatanSosial.macam_kegiatan" /></td>
                  <td><input type="text" v-model="kegiatanSosial.jabatan" /></td>
                  <td><input type="number" v-model="kegiatanSosial.tahun_saat_berkegiatan" /></td>
                  <td><input type="text" v-model="kegiatanSosial.keterangan" /></td>
                </tr>
              </tbody>

              <tr>
                <td>
                  <button
                    class="tambah"
                    @click.stop="tambahSosial()"
                    placeholder="Sosial"
                  >
                    +
                  </button>
                  <button @click.stop="hapusSosial(index)" class="hapus">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <!-- Hobi -->
        <div class="container-hobi">
          <div class="form-group">
            <div style="text-align: center">
              <h2>Hobi dan Kegiatan Waktu Luang</h2>
            </div>
            <textarea id="hobi" v-model="hobiKegiatanLuang.kegiatan"></textarea>
          </div>
          <table class="table-hobi">
            <tr>
              <th>Anda membaca...</th>
              <th>Pokok-pokok yang dibaca</th>
            </tr>
            <tr>
              <td>
                <input
                  type="radio"
                  v-model="hobiKegiatanLuang.frekuensiBaca"
                  value="banyak"
                  id="banyak"
                />
                <label for="banyak">Banyak</label><br />
                <input
                  type="radio"
                  v-model="hobiKegiatanLuang.frekuensiBaca"
                  value="sedang"
                  id="sedang"
                />
                <label for="sedang">Sedang</label><br />
                <input
                  type="radio"
                  v-model="hobiKegiatanLuang.frekuensiBaca"
                  value="sedikit"
                  id="sedikit"
                />
                <label for="sedikit">Sedikit</label>
              </td>

              <td>
                <textarea
                  v-model="hobiKegiatanLuang.pokokBaca"
                  name="pokok_baca"
                  style="height: 100px"
                ></textarea>
              </td>
            </tr>
          </table>
          <br />
          <p>Anda membaca surat kabar/majalah apa saja?</p>
          <table class="table-hobi">
            <tr>
              <th>Surat Kabar</th>
              <td>
                <input
                  type="text"
                  v-model="hobiKegiatanLuang.suratKabar"
                  size="30"
                />
              </td>
            </tr>
            <tr>
              <th>Majalah</th>
              <td>
                <input
                  type="text"
                  v-model="hobiKegiatanLuang.majalah"
                  size="30"
                />
              </td>
            </tr>
            <tr></tr>
          </table>
        </div>
      </div>
    </template>

    <template #3>
      <!-- Step 3 Content -->
      <div class="container-form">
        <!-- Riwayat Pekerjaan -->
        <div id="app">
          <h2>Riwayat Pekerjaan: Dimulai Dengan Pekerjaan Sekarang</h2>
          <div class="form-group">
            <div class="table-responsive">
              <table class="table table-bordered" >
                <div v-for="(riwayatPekerjaan, index) in riwayatPekerjaan" :key="index">
                <thead>
                  <tr>
                    <th>Periode</th>
                    <th>Perusahaan</th>
                    <th>Jabatan</th>
                    <th>Detail Perusahaan</th>
                  </tr>
                </thead>
                <tbody >
                  <tr>
                    <td>
                      <div class="form-group">
                        <label>Dari:</label>
                        <VueDatePicker 
                        style="width:80px" 
                        v-model="riwayatPekerjaan.pekerjaan_dimulai" 
                        year-picker 
                        :min-date="new Date('2000-01-01')"
                        :max-date="new Date('2024-12-31')"
                    />
                      </div>
                      <div class="form-group">
                        <label>Sampai:</label>
                        <VueDatePicker 
                        style="width:80px" 
                        v-model="riwayatPekerjaan.pekerjaan_selesai" 
                        year-picker 
                        :min-date="new Date('2000-01-01')"
                        :max-date="new Date('2024-12-31')"
                    />
                      </div>
                    </td>
                    <td>
                      <div class="form-group">
                        <label>Nama Perusahaan:</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="riwayatPekerjaan.namaPerusahaan"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label>Alamat Perusahaan:</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="riwayatPekerjaan.alamatPerusahaan"
                        />
                      </div>
                      <div class="form-group">
                        <label>Telepon Perusahaan:</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="riwayatPekerjaan.teleponPerusahaan"
                        />
                      </div>
                    </td>
                    <td>
                      <div class="form-group">
                        <label>Jabatan Awal:</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="riwayatPekerjaan.jabatanAwal"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label>Jabatan Akhir:</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="riwayatPekerjaan.jabatanAkhir"
                          required
                        />
                      </div>
                    </td>
                    <td>
                      <div class="form-group">
                        <label>Jenis Usaha:</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="riwayatPekerjaan.jenisUsaha"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label>Jumlah Karyawan:</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="riwayatPekerjaan.jumlahKaryawan"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label>Nama Atasan Langsung:</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="riwayatPekerjaan.namaAtasanLangsung"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label>Nama Direktur:</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="riwayatPekerjaan.namaDirektur"
                          required
                        />
                      </div>
                    </td>
                  </tr>
                  <td colspan="3">
                    <th>Alasan Berhenti</th>
                    <textarea
                      name="alasan_berhenti"
                      style="width: 100%; height: 150px"
                      v-model="riwayatPekerjaan.alasanBerhenti"
                    ></textarea>
                  </td>
                </tbody>
              </div>
              <tr>
                <td>
                  <button
                    class="tambah"
                    @click.stop="tambahRiwayat()"
                    placeholder="Riwayat Pekerjaan"
                  >
                    +
                  </button>
                  <button @click.stop="hapusRiwayat(index)" class="hapus">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
              </table>
            
            </div>
          </div>
        </div>

        <!-- Referensi -->
        <div id="app">
          <h2 style="margin-bottom: 0">Referensi</h2>
          <h3>
            Kepada Siapa Kami Dapat Menanyakan Mengenai Diri Anda Lebih Lengkap
          </h3>

          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th rowspan="2">Nama</th>
                  <th rowspan="2">Alamat/Telepon</th>
                  <th rowspan="2">Pekerjaan</th>
                  <th rowspan="2">Hubungan</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(referensiKontakKenalan, index) in referensiKontakKenalan" :key="index">
                  <td><input type="text" v-model="referensiKontakKenalan.nama_kenalan" /></td>
                  <td><input type="text" v-model="referensiKontakKenalan.alamatTelp" /></td>
                  <td><input type="text" v-model="referensiKontakKenalan.pekerjaan" /></td>
                  <td><input type="number" v-model="referensiKontakKenalan.hubungan" /></td>
                </tr>
              </tbody>

              <tr>
                <td>
                  <button
                    class="tambah"
                    @click.stop="tambahReferensi()"
                    placeholder="Refensi"
                  >
                    +
                  </button>
                  <button @click.stop="hapusReferensi(index)" class="hapus">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <!-- Uraian Tugas & Tanggungjawab -->
        <div id="app">
          <h2>
            Uraikan Tugas Dan Tanggung Jawab Pada Jabatan Anda Yang Terakhir
          </h2>
          <textarea
            id="uraiantugas"
            v-model="uraian"
            class="form-control"
          ></textarea>
        </div>

        <!-- Posisi pada struktur organisasi tempat terakhir bekerja -->
        <div id="app">
          <h2>
            Gambarkan Posisi Pada Struktur Organisasi Tempat Terakhir Anda
            Bekerja
          </h2>
          <div class="uploadgambar">
            <div
            @dragenter.prevent="toggleActivePosisi"
            @dragleave.prevent="toggleActivePosisi"
            @dragover.prevent
            @drop.prevent="handleDropPosisi"
            :class="{ 'active-dropzone': activePosisi }"
            class="dropzone"
          >
            <label for="dropzonePosisi">Upload Gambar Posisi</label>
            <input
              type="file"
              id="dropzoneFilePosisi"
              class="dropzoneFile"
              ref="fileInputPosisi"
              @change="gambaranPosisi"
            />
          </div>
          <img
            id="uploadedImagePosisi"
            v-if="uploadedImageUrlPosisi"
            :src="uploadedImageUrlPosisi"
          />
          </div>
        </div>
      </div>
    </template>

    <template #4
      ><!-- Step 4 Content -->
      <div class="container-form">
        <div id="app">
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th rowspan="2">Pertanyaan</th>
                  <th colspan="2">Jawaban</th>
                  <th>Penjelasan</th>
                </tr>
                <tr>
                  <th>Ya</th>
                  <th>Tidak</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  id="pertanyaan"
                  v-for="(pertanyaan, index) in pertanyaanList"
                  :key="index"
                >
                  <td style="text-align: left">{{ pertanyaan }}</td>
                  <td>
                    <input
                      type="checkbox"
                      v-model="jawaban[index].ya"
                      @change="toggleCheck(index, 'ya')"
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      v-model="jawaban[index].tidak"
                      @change="toggleCheck(index, 'tidak')"
                    />
                  </td>
                  <td>
                    <input type="text" v-model="jawaban[index].penjelasan" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </template>
  </Vue3MultiStepper>
</template>

<style scoped src="../components/style.css"> </style>
<script src="../components/script.js"></script>
