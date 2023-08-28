import mongoose from 'mongoose';

const BugSchema = new mongoose.Schema({
    title: String,
    deadline: String,
    status: String,
    type: String,
    projectID: String,
    developers: [{
        type: String,
    }],
    // Optional 
    description: { type: String, default: '' },
    screenshot: { type: String, default: '' },
});

// Setter method for setting the title
BugSchema.methods.setTitle = function (title:string) {
    this.title = title;
};

// Setter method for setting the deadline
BugSchema.methods.setDeadline = function (deadline:string) {
    this.deadline = deadline;
};

// Setter method for setting the status
BugSchema.methods.setStatus = function (status:string) {
    this.status = status;
};

// Setter method for setting the type
BugSchema.methods.setType = function (type:string) {
    this.type = type;
};

// Add a developer to the developers array
BugSchema.methods.addDeveloper = function (developer:string) {
    this.developers.push(developer);
};

// Remove a developer from the developers array
BugSchema.methods.removeDeveloper = function (developer:string) {
    const index = this.developers.indexOf(developer);
    if (index !== -1) {
        this.developers.splice(index, 1);
    }
};

// Setter method for setting the description
BugSchema.methods.setDescription = function (description:string) {
    this.description = description;
};

// Setter method for setting the screenshot
BugSchema.methods.setScreenshot = function (screenshot:string) {
    this.screenshot = screenshot;
};

module.exports = mongoose.model('Bug', BugSchema);
