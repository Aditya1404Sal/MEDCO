const mongoose = require('mongoose');
const historySchema = new mongoose.Schema({
    userId:{
        type: String,
        required:true
    },
    doctorId:{
        type:String,
        required:true
    },
    historyId:{
        type:String,
        required:true
    },
    age:{

    },
    name:{

    },
    email:{

    },
    phone:{

    },
    allergies:{

    },
    congenitalConditions:{

    },
    vaccinesHistory:{

    },
    birthHistory:{

    },
    parentMaritalConsanguinity:{

    },
    parentMaritalStatus:{

    },
    childGender:{

    },
    milestoneHistory:{

    },
    emotionalHistory:{

    },
    abuseHistory:{

    },
    historyOfAdmissionToHospital:{

    },
    dietryHistory:{

    },
    parentsSubstanceHistory:{

    },
    parentOccupation:{

    },
    dentalHistory:{

    },
    historyOfSleepProblems:{

    },
    toiletTraining:{

    },
    historyOfPica:{
        
    }
}
);

const historyModel = mongoose.model('history',historySchema);
module.exports = historyModel;