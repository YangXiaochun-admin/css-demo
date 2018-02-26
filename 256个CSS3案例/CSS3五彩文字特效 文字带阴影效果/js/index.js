var box = document.querySelector('.box').textContent,
    rs = document.querySelector('.render'),
    f = [
      'arial','verdana','monospace',
      'consolas','impact','helveltica'
    ],
    c = [
      '1ABC9C','3498DB','34495E','E67E22',
      'E74C3C','2ECC71','E74C3C','95A5A6','D35400'
    ];
var out = '';
for (var i = 0; i < box.length; i++) {
  // Random array fonts
  var r = f[Math.floor(Math.random() * f.length)],
      // Random array colors
      sh = c[Math.floor(Math.random() * c.length)],
      st = 'color:#'+sh+
      ';font-family: '+r+
      ';text-shadow:0px 1px 0px #'+sh+',0px 2px 0px #'+sh+',0px 3px 0px #'+sh+',0px 4px 0px #'+sh+', 0px 5px 0px  #'+sh+',0px 6px 0px #'+sh+', 0px 7px 0px #'+sh+',0px 8px 7px #'+sh;
  out += '<span style="'+st+'">'+box[i]+'</span>';
}  
rs.innerHTML = out; 