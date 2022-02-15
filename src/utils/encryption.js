var bcrypt = require("bcrypt")


const encrypt = async (password = '') => {
    const salt = await bcrypt.genSalt()
    return await bcrypt.hash(password, salt);
}

const compare = async (password = '', passwordHash = '') => {
    return await bcrypt.compare(password, passwordHash);
}

module.exports = {
    encrypt: encrypt,
    compare: compare,
}