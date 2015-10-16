
  var img = document.getElementsByClassName('tile');
  for (var i = 0; i < img.length; i++) {
    console.log(img[i]);
  }
  console.log("helo");
  console.log(img);
  img.onload(function() {
    if (img.width > img.height) {
      img.height = '100%';
      img.width = 'auto';
    }
  })

