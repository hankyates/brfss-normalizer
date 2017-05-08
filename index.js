let fs = require('fs')

let lineReader = require('readline').createInterface({
  input: fs.createReadStream(__dirname + '/LLCP2015.ASC')
})

let states = require('./codebook/states')
let months = require('./codebook/months')

const BLANK = ' '
const MISSING = 'Missing'
const YES = 'Yes'
const NO = 'No'

let final_disposition = {
  '1100': 'Completed Interview',
  '1200': 'Partial Complete Interview'
}

let YesNoMissing = {
  [BLANK]: MISSING,
  '1': YES,
  '2': NO
}

let YesMissing = {
  [BLANK]: MISSING,
  '1': YES
}

let CELLFON3MAP = {
  [BLANK]: MISSING,
  '1': NO,
  '2': YES
}

let MaleFemale = {
  [BLANK]: MISSING,
  '1': 'Male',
  '2': 'Female'
}

let eighteenOrOlder = {
  [BLANK]: MISSING,
  '1': 'Yes, Male Respondent',
  '2': 'Yes, Female Respondent'
}

lineReader.on('line', function (line) {
  let _STATE = states[line.substr(0, 2)]
  let FMONTH = months[line.substr(16, 2)]
  let IMONTH = months[line.substr(18, 2)]
  let IDAY = line.substr(20, 2)
  let IYEAR = line.substr(22, 4)
  let DISPCODE = final_disposition[line.substr(31, 4)]
  let CTELENUM = YesMissing[line.substr(62, 1)]
  let PVTRESD1 = YesNoMissing[line.substr(63, 1)]
  let COLGHOUS = YesMissing[line.substr(64, 1)]
  let STATERES = YesMissing[line.substr(65, 1)]
  let CELLFON3 = CELLFON3MAP[line.substr(66, 1)]
  let LADULT = eighteenOrOlder[line.substr(67, 1)]
  // TODO what happens when 6 or more adults
  let NUMADULT = line.substr(68, 2) === BLANK+BLANK ? MISSING : line.substr(68, 2)
  let NUMMEN = line.substr(70, 2) === BLANK+BLANK ? MISSING : line.substr(68, 2)
  let NUMWOMEN = line.substr(72, 2) === BLANK+BLANK ? MISSING : line.substr(68, 2)
  let CTELNUM1 = YesMissing[line.substr(74, 1)]
  let CELLFON2 = YesNoMissing[line.substr(75, 1)]

  // Page 11
  console.log(
  )

})
