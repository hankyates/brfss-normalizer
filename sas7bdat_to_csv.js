const SAS7BDAT = require('sas7bdat')

SAS7BDAT.toCsv('la15finl_noocc.sas7bdat', 'la15finl_noocc.csv', {
  sasOptions: {
  // See below, same as second argument to other SAS7BDAT functions
  },
  csvOptions: {
  // These are passed to http://csv.adaltas.com/stringify/
    quotedEmpty: false,
    quotedString: true
  }
})
.then(rows => console.log('Done!'))
.catch(err => console.log(err))

