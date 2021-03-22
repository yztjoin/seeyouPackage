<template>
  <div class="SwipeCell_boxtop" ref="SwipeCellBoxtop">
    <div class="slideActive">
      <p
        class="slide"
        @touchmove="Moving"
        @touchstart="startMove($event)"
        @touchend="moveEnd"
        @touchcancel="moveEnd"
      >
        <slot>单元格</slot>
      </p>
      <p class="slide_bar" ref="itme">
        <span
          v-for="(item, index) in itemOption"
          :key="index"
          :style="{ backgroundColor: item.bgColor, color: item.color }"
          @click="itemClick(item.name)"
          >{{ item.value }}</span
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SwipeCell",
  props: {
    itemWidth: {
      type: Number,
      default: 140,
    },
    itemOption: {
      typeof: Array,
      default() {
        return [
          {
            name: "collect",
            value: "收藏",
            bgColor: "#07c160",
            color: "#ff",
          },
          {
            name: "delete",
            value: "删除",
            bgColor: "#ee0a24",
            color: "#ff",
          },
        ]
      },
    },
  },
  data() {
    return {
      progress: 0,
      boxtopDom: null,
      startDate: null,
      dragging: false,
      touchInfo: {
        pageXStart: 0,
        pageYStart: 0,
        pageXEnd: 0,
        pageYEnd: 0,
        offsetY: 0,
        offsetX: 0,
        direction:''
      },
    }
  },
  components: {},
  created() {},
  mounted() {
    this.boxtopDom = this.$refs.SwipeCellBoxtop.style
    this.boxtopDom.setProperty("--slide-width", this.itemWidth + "px")
    document.addEventListener("touchstart", this.swipeBack)
  },
  methods: {
    itemClick(position) {
      this.$emit("click", position)
    },
    swipeBack() {
      if (this.progress !== 0) {
        this.boxtopDom.setProperty("--transition", "0.3s all ease-in-out")
        this.progress = 0
        this.boxtopDom.setProperty("--progress", this.progress)
      }
    },
    getDirection(x, y) {
      if (x > y && x > 10) {
        return "horizontal"
      }
      if (y > x && y > 10) {
        return "vertical"
      }
      return ""
    },
    Moving(e) {
      let { targetTouches } = e
      this.touchInfo.offsetX = Math.abs(
        this.touchInfo.pageXStart - targetTouches[0].pageX
      )
      this.touchInfo.offsetY = Math.abs(
        this.touchInfo.pageYStart - targetTouches[0].pageY
      )
      this.touchInfo.direction =
        this.touchInfo.direction ||
        this.getDirection(this.touchInfo.offsetX, this.touchInfo.offsetY)
      if (this.touchInfo.direction === "horizontal") {
        if (typeof event.cancelable !== "boolean" || event.cancelable) {
          e.preventDefault()
        }
        let num = this.$refs.itme.offsetWidth
        this.progress = (this.touchInfo.pageXStart - targetTouches[0].pageX) / num
        if (this.progress <= 0) {
          this.progress = 0
        }
        if (this.progress >= 1) {
          this.progress = 1
        }
        this.boxtopDom.setProperty("--progress", this.progress)
      } else {
        return
      }
    },
    startMove(e) {
      console.log(this.touchInfo.direction)
      if (this.progress !== 0) {
        this.swipeBack()
        return
      }
      let { targetTouches } = e
      this.boxtopDom.setProperty("--transition", "0s all ease-in-out")
      this.touchInfo.pageXStart = targetTouches[0].pageX
      this.touchInfo.pageYStart = targetTouches[0].pageY
    },
    moveEnd(e) {
      let { changedTouches } = e
      this.touchInfo.pageXStart = 0
      this.boxtopDom.setProperty("--transition", "0.3s all")
      if (this.progress >= 0.4) {
        this.progress = 1
        this.boxtopDom.setProperty("--progress", this.progress)
      }
      if (this.progress < 0.6) {
        this.progress = 0
        this.boxtopDom.setProperty("--progress", this.progress)
      }
      this.touchInfo.direction = ''
    },
  },
  computed: {},
  watch: {},
  beforeDestroy() {},
}
</script>

<style lang="less" scpoed>

.SwipeCell_boxtop {
  // --slide-width: 300px;
  --progress: 0;
  --transition: 0s all ease-in-out;
  width: 100%;
  font-size: 28px;
  overflow: hidden;
  div {
    width: 100%;
  }
  .slide {
    padding: 30px 10px;
    margin: 3px 0 3px 0;
    background-color: #fff;
    display: flex;
    align-items: center;
    outline: 0;
  }
  .slideActive {
    position: relative;
    transform: translateX(calc((var(--progress) * var(--slide-width)) * -1));
    transition: var(--transition);
  }
  .slide_bar {
    // content: "删除";
    height: 100%;
    width: var(--slide-width);
    position: absolute;
    right: 0px;
    top: 0px;
    transform: translateX(100%);
    color: #fff;
    display: flex;
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      height: 100%;
    }
  }
}
</style>
