// 文件转换base64
function file2DataUrl (file, callback, error) {
  var reader = new FileReader();
  reader.onload = function () {
    callback(reader.result);
  };
  reader.onerror = function () {
    if (isFunc(error)) {
      error('读取文件失败！');
    }
  };
  reader.readAsDataURL(file);
}

// 图片压缩
function file2Image (file, callback, error) {
  let WIN = window
  var image = new Image();
  var URL = WIN.URL || WIN.webkitURL;
  let url = URL.createObjectURL(file);
  image.src = url;
  if (WIN.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(WIN.navigator.userAgent)) {
    // 修复IOS上webkit内核浏览器抛出错误 `The operation is insecure` 问题
    image.crossOrigin = 'anonymous';
  }
  image.alt = file.name;
  image.onerror = function () {
    if (isFunc(error)) {
      error('图片加载错误！');
    }
  }
  image.onload = () => {
    callback(image);
    URL.revokeObjectURL(url);
  };
  // var http = new XMLHttpRequest();
  // http.open("GET", url, true);
  // http.responseType = "blob";
  // http.onload = function (e) {
  //   if (this.status == 200 || this.status === 0) {
  //     let blob = new Blob([this.response], { type: 'image/jpeg' });
  //     console.log('压缩前', blob)
  //   }
  // };
  // http.send();
}
// image转换canvas
function image2Canvas (image) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  let naturalWidth = image.naturalWidth
  let naturalHeight = image.naturalHeight
  canvas.width = naturalWidth;
  canvas.height = naturalHeight;
  ctx.save();
  ctx.drawImage(image, 0, 0, naturalWidth, naturalHeight);
  ctx.restore();
  return canvas;
}
let isFunc = function (value) {
  return typeof value === 'function';
};
// new ImageCompressor({
//   file: imgFile,
//   maxSize: 5, //单位大小 M
//   minSize: 1,
//   beforeCompress(file) {
//     console.log(file)
//   },
//   success(DataUrl,blob) {
//     console.log(DataUrl,blob)
//   }
// })
// jpg png jpeg
class ImageCompressor {
  constructor(options) {
    this.options = options;
    this.file = options.file;
    this.maxSize = options.maxSize * 1000 * 1000
    this.minSize = options.minSize * 1000 * 1000
    this.image = null;
    this.isCompressor = true;
    let size = this.options.file.size
    if (size > this.maxSize) {
      if (isFunc(this.options.exceedSize)) {
        this.options.exceedSize()
      } else {
        alert(`图片不得大于${options.maxSize}M`)
      }
      return
    }
    if (this.file.type.indexOf('image') == -1) {
      alert('请选择图片文件')
      return
    }
    console.log(this.file)
    // return
    this.init();
  }
  init () {
    if (this.options.file.size <= this.minSize) {
      file2DataUrl(this.file, DataUrl => {
        this.options.success(DataUrl, this.file)
      })
      return
    }
    file2Image(this.options.file, image => {
      if (isFunc(this.options.beforeCompress)) {
        this.options.beforeCompress(this.options.file)
      }
      let canvas = image2Canvas(image)
      canvas.toBlob(blob => {
        blob.name = 'trendsimg.jpeg'
        file2DataUrl(blob, DataUrl => {
          this.options.success(DataUrl, blob)
        })
      }, this.options.type || "image/jpeg",
        this.options.quality || 0.8)
    })
  }
}
function blobToFile (blob, fileName) {
  blob.lastModifiedDate = new Date();
  blob.name = fileName;
  return blob;
}

function dataURLtoBlob (dataurl) {
  var arr = dataurl.split(',');
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

let util = {
  file2Image,
  image2Canvas,
  file2DataUrl,
  isFunc
}
export { util, ImageCompressor }