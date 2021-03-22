<template>
  <transition name="img_fade">
    <div
      class="enlargeImg_showbox"
      v-show="isShow"
      @click="showboxHand"
      @touchstart="start"
      @touchmove="move"
      @touchend="end"
      ref="img"
    >
      <div class="count">{{ `${index + 1}/${imgArr.length}` }}</div>
      <div class="imgarr_window" ref="imgarrWindow">
        <!-- <transition name="largeIn"> -->
        <img
          :src="item"
          alt="图片"
          v-for="(item, i) in imgArr"
          :key="i"
          @touchstart="index = i"
        />
        <!-- </transition> -->
      </div>
      <slot name="del"></slot>
    </div>
  </transition>
</template>

<script>
import { TouchMixin } from "../mixins/touch"
export default {
  name: "EnlargeImg",
  mixins: [TouchMixin],
  props: {
    isShow: {
      type: Boolean,
      default: true,
    },
    imgArr: {
      type: Array,
      default() {
        return []
      },
    },
    imgIndex: {
      type: Number,
      default() {
        return 0
      },
    },
  },
  data() {
    return {
      itemWidth: null,
      index: 0,
      isSliding: false,
      borderlineNum: 100,
      // imgArr:[],
    }
  },
  components: {},
  created() {},
  mounted() {
    // this.imgArr = this.p_imgArr
    this.$refs.imgarrWindow.style.setProperty("--img-width", `${window.innerWidth}px`)
    this.itemWidth = window.innerWidth
    this.index = this.imgIndex
  },
  methods: {
    start() {
      this.touchStart(event)
    },
    move() {
      this.touchMove(event)
      this.$refs.img.style.setProperty(
        "--img-transformX",
        this.index * -this.itemWidth + this.deltaX + "px"
      )
    },
    showboxHand() {
      this.$emit("update:isShow", !this.isShow)
    },
    end() {
      if (
        this.offsetX <= this.borderlineNum ||
        (this.index - 1 < 0 && this.deltaX > this.borderlineNum) ||
        (this.index + 1 > this.imgArr.length - 1 && this.deltaX < -this.borderlineNum)
      ) {
        this.sliding()
        this.$refs.img.style.setProperty(
          "--img-transformX",
          `${this.index * -this.itemWidth}px`
        )
        return
      }
      if (this.deltaX < -this.borderlineNum) {
        this.sliding()
        this.$refs.img.style.setProperty(
          "--img-transformX",
          `${++this.index * -this.itemWidth}px`
        )
      } else if (this.deltaX > this.borderlineNum) {
        this.sliding()
        this.$refs.img.style.setProperty(
          "--img-transformX",
          `${--this.index * -this.itemWidth}px`
        )
      }
    },
    sliding() {
      this.$refs.img.style.setProperty("--transition", `0.3s`)
      setTimeout(() => {
        this.$refs.img.style.setProperty("--transition", `0s`)
      }, 500)
    },
  },
  computed: {},
  watch: {
    imgIndex(newValue, oValue) {
      if(newValue == -1 ) return
      this.index = newValue
      this.$refs.img.style.setProperty(
        "--img-transformX",
        `${this.index * -this.itemWidth}px`
      )
    },
    imgArr(n, o) {
    },
  },
}
</script>

<style lang="less" scoped>
.img_fade-enter-active,
.img_fade-leave-active {
  transition: all 0.3s !important;
  img{
    transition: all 0.3s !important;
  }
}
.img_fade-enter/* .fade-leave-active below version 2.1.8 */ {
  opacity: 0 !important;
}
.img_fade-enter-to {
  opacity: 1 !important;
}
.img_fade-leave {
  opacity: 1 !important;
  img {
    transform: scale(1) !important;
  }
}
.img_fade-leave-to {
  opacity: 0 !important;
  img {
    transform: scale(0) !important;
  }
}
.stackNum {
  z-index: 999;
}


.enlargeImg_showbox {
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0);
  z-index: 990;
  --img-transformX: 0px;
  --img-width: 0px;
  --transition: 0s;
  img {
    width: var(--img-width);
    // transform: scale(0);
    // transition: 0.3s all ease-in;
    object-fit: scale-down;
  }
  // .active {
  //   transform: scale(1);
  // }
  .imgarr_window {
    display: flex;
    flex-wrap: nowrap;
    transform: translateX(var(--img-transformX));
    transition: var(--transition) all;
    justify-content: center;
  }
  .count {
    position: absolute;
    top: 0px;
    color: #fff;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
  }
}
</style>
