<template>
  <div>
    <div class="header">
      <div class="main-header">
        <div class="logo">
          <!-- Let's assume your logo image file is named "logo.png" -->
          <img src="./assets/pt_sanqua_cover.jpg" alt="Logo" />
          <img src="./assets/pt_sanqu_cover2.jpg" alt="Logo" />
        </div>
        <div class="login">
          <a href="#">
            <img src="./assets/user.png" alt="Login" />
            <span>Masuk Akun</span>
          </a>
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
  >
    <template #1
      ><!-- Step 1 Content -->
      <div class="container-form">
        <h1>DATA DIRI</h1>
        <div class="form-group">
          <label for="pekerjaan">Pekerjaan Yang Dilamar</label>
          <input
            type="text"
            id="pekerjaan"
            v-model="pekerjaan"
            class="form-control"
          />
        </div>
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
        <textarea id="alamat" v-model="alamat" class="form-control"></textarea>
      </div>

      <div class="form-group">
        <label for="telepon">Telepon</label>
        <input
          type="text"
          id="telepon"
          v-model="telepon"
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="jenis_kelamin">Jenis Kelamin</label>
        <select id="jenis_kelamin" v-model="jenis_kelamin" class="form-control">
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
        <label for="kebangsaan">Kebangsaan</label>
        <input
          type="text"
          id="kebangsaan"
          v-model="kebangsaan"
          class="form-control"
        />
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
          ref="otherInput"
          v-if="status_rumah_tinggal === 'Lainnya'"
          type="text"
          v-model="otherText"
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
          Note: Beritahukan dengan rinci. Seperti jenis, merk, tahun, dan status
          kepemilikan.
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
            @change="handleFileSelect"
          />
        </div>
        <img
          id="uploadedImage"
          v-if="uploadedImageUrl"
          :src="uploadedImageUrl"
        />
      </div>
    </template>

    <template #2
      ><!-- Step 2 Content -->
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
              <tr>
                <td>SD</td>
                <td><input type="text" v-model="sd.namasekolah" /></td>
                <td><input type="text" v-model="sd.tempatsekolah" /></td>
                <td><input type="text" v-model="sd.jurusan" /></td>
                <td>
                  <input
                    type="number"
                    v-model="sd.tahunDari"
                    style="width: 50px"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    v-model="sd.tahunSampai"
                    style="width: 50px"
                  />
                </td>
                <td>
                  <select v-model="sd.statuskelulusan">
                    <option value="Lulus">Lulus</option>
                    <option value="Tidak">Tidak Lulus</option>
                    <option value="Belum">Belum Lulus</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>SMP</td>
                <td><input type="text" v-model="smp.namasekolah" /></td>
                <td><input type="text" v-model="smp.tempatsekolah" /></td>
                <td><input type="text" v-model="smp.jurusan" /></td>
                <td>
                  <input
                    type="number"
                    v-model="smp.tahunDari"
                    style="width: 50px"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    v-model="smp.tahunSampai"
                    style="width: 50px"
                  />
                </td>
                <td>
                  <select v-model="smp.statuskelulusan">
                    <option value="Lulus">Lulus</option>
                    <option value="Tidak">Tidak Lulus</option>
                    <option value="Belum">Belum Lulus</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>SMA</td>
                <td><input type="text" v-model="sma.namasekolah" /></td>
                <td><input type="text" v-model="sma.tempatsekolah" /></td>
                <td><input type="text" v-model="sma.jurusan" /></td>
                <td>
                  <input
                    type="number"
                    v-model="sma.tahunDari"
                    style="width: 50px"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    v-model="sma.tahunSampai"
                    style="width: 50px"
                  />
                </td>
                <td>
                  <select v-model="sma.statuskelulusan">
                    <option value="Lulus">Lulus</option>
                    <option value="Tidak">Tidak Lulus</option>
                    <option value="Belum">Belum Lulus</option>
                  </select>
                </td>
              </tr>
              <tr v-for="(kuliah, index) in kuliah" :key="index">
                <td>Kuliah</td>
                <td><input type="text" v-model="kuliah.namasekolah" /></td>
                <td><input type="text" v-model="kuliah.tempatsekolah" /></td>
                <td>
                  <input
                    type="text"
                    v-model="kuliah.jurusan"
                    placeholder="Contoh: S1 Akuntansi"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    v-model="kuliah.tahunDari"
                    style="width: 50px"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    v-model="kuliah.tahunSampai"
                    style="width: 50px"
                  />
                </td>
                <td>
                  <select v-model="kuliah.statuskelulusan">
                    <option value="Lulus">Lulus</option>
                    <option value="Tidak">Tidak Lulus</option>
                    <option value="Belum">Belum Lulus</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <button class="tambah-kuliah" @click.stop="tambahKuliah()">
                    +
                  </button>
                </td>
                <td>
                  <button @click.stop="hapusKuliah(index)" class="hapus-kuliah">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- SUSUNAN KELUARGA -->
      <div id="app">
        <h2>Formulir Susunan Keluarga</h2>

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
              <tr>
                <td><input type="text" v-model="ayah.hubungan" /></td>
                <td><input type="text" v-model="ayah.nama" /></td>
                <td><input type="text" v-model="ayah.jenis_kelamin" /></td>
                <td><input type="date" v-model="ayah.tanggal_lahir" /></td>
                <td>
                  <input type="text" v-model="ayah.pendidikan_terakhir" />
                </td>
                <td>
                  <input type="text" v-model="ayah.perusahaan_terakhir" />
                </td>
                <td><input type="text" v-model="ayah.jabatan_terakhir" /></td>
                <td><input type="text" v-model="ayah.keterangan" /></td>
              </tr>

              <tr>
                <td><input type="text" v-model="ibu.hubungan" /></td>
                <td><input type="text" v-model="ibu.nama" /></td>
                <td><input type="text" v-model="ibu.jenis_kelamin" /></td>
                <td><input type="date" v-model="ibu.tanggal_lahir" /></td>
                <td><input type="text" v-model="ibu.pendidikan_terakhir" /></td>
                <td><input type="text" v-model="ibu.perusahaan_terakhir" /></td>
                <td><input type="text" v-model="ibu.jabatan_terakhir" /></td>
                <td><input type="text" v-model="ibu.keterangan" /></td>
              </tr>

              <tr v-for="(saudara, index) in saudara" :key="index">
                <td><input type="text" v-model="saudara.hubungan" /></td>
                <td><input type="text" v-model="saudara.nama" /></td>
                <td><input type="text" v-model="saudara.jenis_kelamin" /></td>
                <td><input type="date" v-model="saudara.tanggal_lahir" /></td>
                <td>
                  <input type="text" v-model="saudara.pendidikan_terakhir" />
                </td>
                <td>
                  <input type="text" v-model="saudara.perusahaan_terakhir" />
                </td>
                <td>
                  <input type="text" v-model="saudara.jabatan_terakhir" />
                </td>
                <td><input type="text" v-model="saudara.keterangan" /></td>
              </tr>

              <tr>
                <td>
                  <button class="tambah-saudara" @click.stop="tambahSaudara()">
                    +
                  </button>
                </td>
                <td>
                  <button
                    @click.stop="hapusSaudara(index)"
                    class="hapus-saudara"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>

              <tr v-for="(anak, index) in anak" :key="index">
                <td><input type="text" v-model="anak.hubungan" /></td>
                <td><input type="text" v-model="anak.nama" /></td>
                <td><input type="text" v-model="anak.jenis_kelamin" /></td>
                <td><input type="date" v-model="anak.tanggal_lahir" /></td>
                <td>
                  <input type="text" v-model="anak.pendidikan_terakhir" />
                </td>
                <td>
                  <input type="text" v-model="anak.perusahaan_terakhir" />
                </td>
                <td><input type="text" v-model="anak.jabatan_terakhir" /></td>
                <td><input type="text" v-model="anak.keterangan" /></td>
              </tr>

              <tr>
                <td>
                  <button
                    class="tambah-anak"
                    @click.stop="tambahAnak()"
                    placeholder="Anak"
                  >
                    +
                  </button>
                </td>
                <td>
                  <button @click.stop="hapusAnak(index)" class="hapus-anak">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- KURSUS/TRAINING -->
      <div id="app">
        <h2>Formulir Kursus/Training</h2>

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
          </table>
        </div>
      </div>
    </template>
    <template #3><!-- Step 3 Content --></template>
    <template #4><!-- Step 4 Content --></template>
    <template #5><!-- Step 5 Content --></template>
    <template #6><!-- Step 6 Content --></template>
  </Vue3MultiStepper>
</template>

<style>
@import url(./style.css);
</style>
<script src="./script"></script>
