<template>
  <div class="pre-login-container">
    <img src="../assets/SANQUA-2.jpg" alt="Image" />
    <div class="text-container">
      <h1>Mau mengisi Form?</h1>
      <p>Silahkan login terlebih dahulu.</p>
      <a href="/login">Login</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "PreLogin",
  props: {},
};
</script>

<style scoped>
.pre-login-container {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  overflow: hidden;
}

.pre-login-container img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.text-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.text-container h1 {
  font-size: 40px;
  margin-bottom: 10px;
  color: #fff;
}

.text-container p {
  font-size: 20px;
  margin-bottom: 20px;
  color: #fff;
}

.text-container a {
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 20px;
}
</style>
