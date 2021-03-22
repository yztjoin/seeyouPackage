
// 图片选择 返回input 
function fileSelect (fileType, fn) {
  // image: gif|jpeg|png 图片
  let input = document.createElement('input');
  input.type = 'file';
  input.accept = fileType || 'image/*';
  if (fileType) {
    fileType = fileType.split(',')
  }
  input.style.display = 'none';
  document.body.appendChild(input)
  input.addEventListener('click', (e) => {
    e.target.value = ''
  }, true)
  input.addEventListener('change', (e) => {
    return fn(input.files[0])
  }, true)
  return input
}
export default fileSelect