fs = require('fs');

fs.readFile('day1/data/input', 'utf8', (err, data) => {
  var result = 0;
  data = data.trim();
  for (var i = 0; i < data.length; i++) {
    var next = (i + data.length / 2) % data.length;
    if (data[i] === data[next]) {
      result += +data[i];
    }
  }
  console.log(result);
});
