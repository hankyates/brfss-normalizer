let fs = require('fs')
let request = require('superagent')
let Queue = require('promise-queue')
let requests = new Queue(2)

const DEMOGRAPHICS_CODEBOOK = require('./codebook/demographics')
const TOBACCO_USE_CODEBOOK = require('./codebook/tobacco_use')
const ALCOHOL_CONSUMPTION_CODEBOOK = require('./codebook/alcohol_consumption')

let lineReader = require('readline').createInterface({
  input: fs.createReadStream(__dirname + '/la15finl_noocc.csv')
})

let createValue = (value, labels) => 
  (value.substr(0, 1) === '1') ?  value.substr(1, 2).replace(/^0+/, '') + ' Days per week' :
    (value.substr(0, 1) === '2') ?  value.substr(1, 2).replace(/^0+/, '') + ' Days in the past 30 days' :
      labels[value]

lineReader.on('line', (line) => {
  let col = line.split(',')
  let zip = col[72]
  let parish = col[71]
  let sex = col[63]
  let kday2 = col[91]
  let alcday5 = col[96]

  let doc = {
    "alcohol_consumption": {
      "ALCDAY5": Object.assign({},
        ALCOHOL_CONSUMPTION_CODEBOOK["ALCDAY5"],
        {value: createValue(
          alcday5,
          ALCOHOL_CONSUMPTION_CODEBOOK["ALCDAY5"].labels
        )}
      )
    },
    "tobacco_use": {
      "KDAY2": Object.assign({},
        TOBACCO_USE_CODEBOOK["KDAY2"],
        {value: TOBACCO_USE_CODEBOOK["KDAY2"].labels[kday2]}
      )
    },
    "demographics": {
      "SEX": Object.assign({},
        DEMOGRAPHICS_CODEBOOK["SEX"],
        {value: DEMOGRAPHICS_CODEBOOK["SEX"].labels[sex]}
      ),
      "CTYCODE1": Object.assign({},
        DEMOGRAPHICS_CODEBOOK["CTYCODE1"],
        {value: DEMOGRAPHICS_CODEBOOK["CTYCODE1"].labels[parish] || parish}
      ),
      "ZIPCODE": Object.assign({},
        DEMOGRAPHICS_CODEBOOK["ZIPCODE"],
        {value: (DEMOGRAPHICS_CODEBOOK["ZIPCODE"].labels[zip] || zip).replace(/"/g, '')}
      )
    }
  }

  //console.log(doc)

  requests.add(() => new Promise((resolve) =>
    request
      .post("https://66h6kq81bk:ufljj4hc0c@crdb-1096007071.us-east-1.bonsaisearch.net/test_brfss/survey_response")
      .send(doc)
      .end(function(err, res){
        resolve()
        console.log(requests.queue.length)
        if (err) console.error(err)
      })
  ))

})
