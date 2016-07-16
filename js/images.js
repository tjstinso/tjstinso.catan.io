
function setImage(name) {
  var img = document.getElementsByClassName('resource').firstChild;
  img.onLoad(function() {
    if (img.width > img.height) {
      img.height = '100%';
      img.width = 'auto';
    }
  })
}
