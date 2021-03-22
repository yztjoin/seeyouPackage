export const LRtransition = {
  data () {
    return {
      transitionName: null,
      fromRoute: null
    };
  },

  methods: {
    goback () {
      // this.transitionName = "slide-left"
      // console.log('返回执行', this.transitionName,this.fromRoute)
      // this.$router.push({
      //   path: this.fromRoute
      // })
    }
  },
  mounted () {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', this.goback, false);//false阻止默认事件
    }
  },
  destroyed () {
    window.removeEventListener('popstate', this.goback, false);//false阻止默认事件
  },
  beforeRouteEnter (to, from, next) {
    console.log(to, from);
    next(vm => {
      vm.fromRoute = from.path
    })
  }
};