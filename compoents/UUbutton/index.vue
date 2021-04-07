<!--
 * @Author: seeyou
 * @Date: 2020-11-16 17:11:58
 * @LastEditTime: 2021-04-02 10:55:58
 * @LastEditors: sueRimn
 * @Description: UU按钮 
 * @FilePath: \vue-projectf:\working\UUFE.runManAnswer.Web\src\pages\runManAnswer\AnswerButton.vue
-->
<template>
  <div ref="uubtn" @click="submit" class="uu-submitbtn" :class="uuBtnClass">
    <div class="uu-submitbtn-box">
      <slot name="left"></slot>
    <slot></slot>
    <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "UUbutton",
  props: {
    type: {
      type: String,
      default: "select",
    },
    padding: {
      type: Array,
      default() {
        return [10, 30]
      },
    },
  },
  data() {
    return {}
  },
  components: {},
  created() {},
  mounted() {
    let padding = this.padding.map((value) => {
      return this.rem(value) + "rem"
    })
    this.$refs.uubtn.style.padding = padding.join(" ")
  },
  methods: {
    rem(px) {
      let rem =
        px /
        (750 / document.documentElement.clientWidth) /
        parseInt(document.documentElement.style.fontSize)
      return rem
    },
    submit() {
      if (this.type == "none") return
      this.$emit("click")
    },
  },
  computed: {
    uuBtnClass() {
      let { type } = this
      return {
        "uu-submitbtn--blank": type === "blank",
        "uu-submitbtn--select": type === "select",
        "uu-submitbtn--grey": type == "grey",
        "uu-submitbtn--blank--ccc": type == "blank-c",
        "uu-submitbtn--orange": type == "orange",
        "uu-submitbtn--bg_blank": type == "bg_blank",
        "uu-submitbtn--none": type === "none" || this.loading == true,
      }
    },
  },
  watch: {},
}
</script>
<style lang="less" scoped>
.uu-submitbtn {
  display: inline-block;
  color: #fff;
  border-radius: 8px;
  padding: 10px 20px;
  vertical-align: middle;
  .uu-submitbtn-box {
    display: flex;
    align-content: center;
    justify-content: center;
  }
}
// .uu-submitbtn--select:active,
// .uu-submitbtn--blank:active {
//   opacity: 0.5;
// }
.uu-submitbtn--select {
  background: #ff8b03;
  font-size: 32px;
  font-weight: 400;
  color: #fff;
}
.uu-submitbtn--none {
  background: #ffe6c8;
  color: #fff;
}
.uu-submitbtn--blank {
  border-radius: 8px;
  border: 1px solid #bebebe;
  font-size: 32px;
  font-weight: 500;
  color: #333;
}
.uu-submitbtn--blank--ccc {
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 30px;
  font-weight: 400;
  color: #333;
}
.uu-submitbtn--orange {
  background: #fff1e0;
  border-radius: 8px;
  border: 1px solid #ff8b03;
  font-size: 30px;
  font-weight: 500;
  color: #ff8b03;
}
.uu-submitbtn--bg_blank {
  color: #ff8b03;
  background: #fff;
  font-size: 32px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ff8b03;
  line-height: 45px;
}
.uu-submitbtn--grey {
  font-size: 32px;
  color: #ffffff;
  background: #cccccc;
}
</style>
