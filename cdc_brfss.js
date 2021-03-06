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
const DONT_KNOW = "Don't Know/Not Sure"
const REFUSED = 'Refused'

let DISPCODEMAP = {
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

let LANDLINEMAP = Object.assign(
  {},
  YesNoMissing,
  {
    '7': DONT_KNOW,
    '9': REFUSED
  }
)

let HHADULTMAP = {
  [BLANK+BLANK]: MISSING,
  '77': DONT_KNOW,
  '99': REFUSED
}

lineReader.on('line', function (line) {
  let _STATE = states[line.substr(0, 2)]
  let FMONTH = months[line.substr(16, 2)]
  let IMONTH = months[line.substr(18, 2)]
  let IDAY = line.substr(20, 2)
  let IYEAR = line.substr(22, 4)
  let DISPCODE = DISPCODEMAP[line.substr(31, 4)]
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
  let CADULT = eighteenOrOlder[line.substr(76, 1)]
  let PVTRESD2 = YesNoMissing[line.substr(77, 1)]
  let CCLGHOUS = YesMissing[line.substr(78, 1)]
  let CSTATE = YesNoMissing[line.substr(79, 1)]
  let LANDLINE = LANDLINEMAP[line.substr(82, 1)]
  let HHADULT = HHADULTMAP[line.substr(83, 2)] || line.substr(83, 2)
  let ZIPCODE = line.substr(83, 2)

  // Page 13
    if (line.substr(162, 5) !== BLANK+BLANK+BLANK+BLANK+BLANK) console.log(line.substr(162, 5))

})
