const mongooose = require('mongoose');

const connectDB = (url:string) =>{
    return mongooose
.connect(url); 
}

module.exports = connectDB;
