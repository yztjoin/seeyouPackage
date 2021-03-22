<template>
  <div>
    <img
      class="showimg"
      @click="hand($event, i)"
      :src="item"
      alt=""
      v-for="(item, i) in imgArr"
      :key="i"
    />
    <EnlargeImg :imgArr="imgArr" :imgIndex="index" :isShow.sync="isShow"></EnlargeImg>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      imgArr: [
        "https://tse2-mm.cn.bing.net/th/id/OIP.ZaLr-H8d2lcL442UN-cS3gHaLH?pid=ImgDet&rs=1",
        "https://up.enterdesk.com/edpic/d0/f9/af/d0f9afaa4491a1e4720469ce17807c51.jpg",
        "https://th.bing.com/th/id/R5c4b111e9d235fca38b91b8146c196bd?rik=xOlj23DAqeW5Fw&riu=http%3a%2f%2fwww.ukutu.cn%2fupload%2f201603%2f08%2f20160308095344329.jpg&ehk=fyQw%2bt0cJO8l2HwZck%2bl29GyeK%2f1r06ieo2ECAWU9tQ%3d&risl=&pid=ImgRaw",
      ],
      isShow: false,
      index: 0,
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    hand(e, i) {
      console.log(i)
      this.index = i
      this.imgSrc = e.target.src
      this.$nextTick(() => {
        this.isShow = !this.isShow
      })
    },
  },
  computed: {},
  watch: {},
}
</script>

<style scpoed>
.showimg {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
</style>
