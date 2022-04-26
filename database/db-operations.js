module.exports = {
    findOne: async function (Model, key, value) {
        return Model.findOne({
            where: {
                key: value
            }
        })
    }
}


