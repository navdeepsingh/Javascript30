const base32_encode = require('./base32test.js');
const fs = require('fs-extra');
var csv = require("fast-csv");
var csvStream = csv.createWriteStream({ headers: true }),
  writableStream = fs.createWriteStream("new_encrypt.csv");

csvStream.pipe(writableStream);
let memberId, encMemberId;

csv
  .fromPath("test_encrypt.csv")
  .on("data", function (data) {
    memberId = data;
    encMemberId = base32_encode(data);    
    console.log(memberId, encMemberId);
    csvStream.write({ 'Member ID': memberId, 'Encrypted Member ID': encMemberId });
  })
  .on("end", function () {
    console.log("done");
  });

writableStream.on("finish", function () {
  console.log("FINISH!");
});  
