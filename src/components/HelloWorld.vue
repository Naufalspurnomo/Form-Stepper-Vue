<template>
  <tr>
    <td>
      <button class="tambah-kuliah" @click="tambahKuliah()">+</button>
    </td>
    <td>
      <button @click="hapusKuliah(index)" class="hapus-kuliah">
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
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
