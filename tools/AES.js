const CryptoJS = require("crypto-js");
const config = require("../config")

function set(value) {
    return CryptoJS.AES.encrypt(value, config.AESKey).toString();
}

function get(value) {
    if (!value) {
        return false
    }
    return CryptoJS.AES.decrypt(value, config.AESKey).toString(CryptoJS.enc.Utf8);
}

const AES = {
    set,
    get
}
module.exports = AES 