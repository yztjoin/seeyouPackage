import bs from './BetterScroll.vue'

const install = function (Vue) {
  if (install.isInstall == true) return;
  install.isInstall = true
  const bsConstructor = Vue.extend(bs)
  new bsConstructor()
  // bsInstence.vm = bsInstence.$mount()
}