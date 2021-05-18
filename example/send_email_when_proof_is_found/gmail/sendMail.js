const {google} = require('googleapis'); // Install this by `npm install googleapis`
const Encoding = require('encoding-japanese'); // Install this by `npm install encoding-japanese`
const setup = require('./setup');

// Enable to write message in Japanese
function toJIS(str){
  return Encoding.convert(str, {to: 'JIS'});
}

module.exports = async function sendMail(subject, message, from, to, cc="", bcc="") {
  const auth = await setup();
  const gmail = google.gmail({version: 'v1', auth});
  const raw = makeEmailBody(subject, message);
  
  let error;
  const res = await gmail.users.messages.send({
    userId: 'me',
    resource: {
      raw,
    }
  }).catch(err => {
    error = err;
  });
  
  if(error){
    console.log('The API returned an error: ' + error);
    return;
  }
  
  console.log(res.data);
}

function makeEmailBody(subject, message, from, to, cc, bcc) {
  const str = [];
  str.push("Content-Type: text/plain; charset=\"UTF-8\"\n");
  str.push("MIME-Version: 1.0\n");
  str.push("Content-Transfer-Encoding: 7bit\n");
  if(from){
    str.push("from: ", toJIS(from), "\n");
  }
  if(to){
    if(Array.isArray(to)){
      str.push("to: ", to.map(t => toJIS(t)).join(', '), "\n");
    }
    else{
      str.push("to: ", toJIS(to), "\n");
    }
  }
  if(cc){
    if(Array.isArray(cc)){
      str.push("cc: ", cc.map(c => toJIS(c)).join(', '), "\n");
    }
    else{
      str.push("cc: ", toJIS(cc), "\n");
    }
  }
  if(bcc){
    if(Array.isArray(bcc)){
      str.push("bcc: ", bcc.map(b => toJIS(b)).join(', '), "\n");
    }
    else{
      str.push("bcc: ", toJIS(bcc), "\n");
    }
  }
  str.push("subject: ", toJIS(subject), "\n\n");
  str.push(message);
  
  return Buffer.from(str.join('')).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
}
