const mongoose = require('mongoose')
//name/location/goal/success
const missionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    goal: {
        type: String,
        required: true
    },
    success: {
        type: Boolean,
        required: false
    }
})
/*
name/number/location/missions[{}]/specialties[disguise, surveillance, poisons, acting, gadget proficiency]/preferredCombat[hand-to-hand, pistol, long-range rifle]/preferredTools[laxatives, lockpicks, stinkbombs, smokebombs, mini-camera, drone, cyanide]
*/
const agentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
				type: String,
				required: true,
				unique: true
		},
		location: {
				type: String,
				required: true
		},
		specialties: {
				type: [String],
				required: false
		},
		preferredCombat: {
				type: String,
				required: true
		},
		preferredTools: {
				type: [String],
				required: false
		},
		missions: {
				type: [missionSchema],
				required: false
		}
})

module.exports = mongoose.model('Agent', agentSchema)