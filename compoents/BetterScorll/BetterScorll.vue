<template>
  <div class="bs-topbox">
    <div class="bs_topplace" ref="header">
      <slot name="header"></slot>
    </div>
    <div class="wrapper">
      <div class="content">
        <div v-if="isPullingDown > 0" class="pulling_down_txt">
          <div v-if="isPullingDown == 2" class="loader_down"></div>
          <div v-if="isPullingDown == 3 || isPullingDown == 1">{{ pullingDownShow }}</div>
        </div>
        <slot name="content"></slot>
        <!-- <div v-if="isPullingUp > 0" class="pulling_up_txt">
          <div class="load">{{ pullingUpShow }}</div>
        </div> -->
      </div>
    </div>
    <div class="bs_bottomplace">
      <slot name="fooder" ref="fooder"></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
  name: "myBetterScroll",
  props: {
    isPullingDown: {
      type: Number,
      default: 0,
    },
    isPullingUp: {
      type: Number,
      default: 0,
    },
    option: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      bs: null,
    }
  },
  components: {},
  created() {},
  mounted() {
    this.bs = new BScroll(".wrapper", this.option)
    this.bs.on("pullingDown", () => {
      this.$emit("pullingDown")
    })
    this.bs.on("pullingUp", () => {
      this.$emit("pullingUp")
    })
    this.bs.on("scroll", (position) => {
      this.$emit("scroll", position)
    })
    this.bs.on("scrollEnd", (position) => {
      this.$emit("scrollEnd", position)
    })
    this.$emit("getBs", this.bs)
  },
  methods: {},
  computed: {
    pullingDownShow() {
      if (this.isPullingDown === 1) {
        return "释放刷新"
      }
      if (this.isPullingDown === 2) {
        return "刷新中"
      }
      if (this.isPullingDown === 3) {
        this.$nextTick(() => {
          this.bs.finishPullDown()
          this.bs.refresh()
        })
        return "刷新结束"
      }
    },
    pullingUpShow() {
      if (this.isPullingUp === 1) {
        return "加载中..."
      }
      if (this.isPullingUp === 2) {
        this.$nextTick(() => {
          this.bs.finishPullUp()
          this.bs.refresh()
        })
        return "加载中"
      }
      if (this.isPullingUp === 3) {
        this.$nextTick(() => {
          this.bs.finishPullUp()
          this.bs.refresh()
        })
        return "没有更多数据"
      }
    },
  },
  watch: {},
}
</script>

<style lang="less" scpoed>
@import url("./loderstyle.css");
.bs-topbox {
  max-height: 100vh;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  .wrapper {
    min-height: 100%;
    flex: 1;
    overflow: hidden;
  }
  
  .bs_topplace {
    height: var(--header-height);
  }
  .bs_bottomplace {
    height: var(--fooder-height);
  }
  .pulling_down_txt {
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    transform: translateY(-120%);
    font-size: 28px;
  }
  .pulling_up_txt {
    text-align: center;
    font-size: 28px;
    padding-bottom: 10px;
  }

  @-webkit-keyframes loader_up {
    0%,
    80%,
    100% {
      box-shadow: 0 50px 0 -50px;
    }
    40% {
      box-shadow: 0 50px 0 -10px;
    }
  }
  @keyframes loader_up {
    0%,
    80%,
    100% {
      box-shadow: 0 50px 0 -50px;
    }
    40% {
      box-shadow: 0 50px 0 -10px;
    }
  }
}
</style>
