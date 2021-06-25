const uuid = require('short-uuid')

module.exports = {
    getUuid () {
        return uuid.generate()
    }
}