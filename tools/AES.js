const CryptoJS = require("crypto-js");
const key = ""

function set(value) {
    return CryptoJS.AES.encrypt(value, key).toString();
}

function get(value) {
    return CryptoJS.AES.decrypt(value, key).toString(CryptoJS.enc.Utf8);
}

const AES = {
    set,
    get
}
module.exports = AES 