const mongoose = require('mongoose');
const historySchema = new mongoose.Schema({
    userId:{
        type: String
    },
}
);

const historyModel = mongoose.model('history',historySchema);
module.exports = historyModel;