var states = require('./codebook/states')
var months = require('./codebook/months')

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('/home/hank/ff/brfss-normalizer/LLCP2015.ASC')
});

lineReader.on('line', function (line) {
  let state = states[line.substr(0, 2)]
  console.log(
    months[line.substr(16, 2)]
  )
});
