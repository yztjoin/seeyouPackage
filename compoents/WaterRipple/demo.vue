<template>
  <div class="demo_top">
    <div @mousedown="mousedown">点击</div>
    <div>阔</div>
    <appleToggle :size="0.3"></appleToggle>
    <WaterRipple class="btn" @click="click" :color="'red'">测试</WaterRipple>
    <WaterRipple class="btn" :color='"purple"'>长度测试</WaterRipple>
    <WaterRipple class="btn">长度测试长度测试</WaterRipple>
    <WaterRipple class="btn">长度测试长度测试长度测试</WaterRipple>
  </div>
</template>

<script>
import WaterRipple from "./index"
import appleToggle from "../appleToggle/index"
export default {
  name: "",
  data() {
    return {}
  },
  components: { WaterRipple, appleToggle },
  created() {},
  mounted() {},
  methods: {
    click() {
      this.$router.push({
        path: "CareerLine",
      })
    },
    mousedown() {
      console.log('asdsad');
    }
  },
  computed: {},
  watch: {},
}
</script>

<style scpoed>
.demo_top {
  display: flex;
  flex-direction: column;
  /* height: 100vh; */
  width: 100%;
  justify-content: center;
  align-items: center;
}
.btn {
  margin: 10px 0px;
  padding: 5px 50px;
  color: #fff;
  font-size: 40px;
}
</style>
