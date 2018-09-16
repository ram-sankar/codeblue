var mongoose = require('mongoose');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	phone: {
		type: Number
	}
});
var User =  mongoose.model('doctor', UserSchema);

        
var newreport = mongoose.Schema({
	pat_id: {
		type: Number
	},
	name: {
		type: String
	},
	phone: {
		type: Number
	},
	visit: {
		type: String
	},
    age : {
		type: Number
	},
    gender : {
		type: String
	},
    reason : {
		type: String
	},
    medication : {
		type: String
	},
    remarks : {
		type: String
	}
});
var report =  mongoose.model('complete_reports', newreport);


var shortreport = mongoose.Schema({
	dov: {
		type: String
	},
	reason: {
		type: String
	},
	hospital: {
		type: String
	}
});
var shortreport =  mongoose.model('reports', shortreport);


var newdata = mongoose.Schema({
	userid: {
		type: String
	}
});
var data =  mongoose.model('datas', newdata);


module.exports = {
    User : User,
    report : report,
    shortreport : shortreport,
    data : data
}

