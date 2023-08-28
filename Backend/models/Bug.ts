import mongoose from 'mongoose';

const BugSchema = new mongoose.Schema({
    title: String,
    deadline: String,
    status: String,
    type: String,
    developers: [{
        type: String,
    }],
    description: { type: String, default: '' },
    screenshot: { type: String, default: '' },
});

// Setter method for setting the title
BugSchema.methods.setTitle = function (title) {
    this.title = title;
};

// Setter method for setting the description
BugSchema.methods.setDescription = function (description) {
    this.description = description;
};

// Setter method for setting the screenshot
BugSchema.methods.setScreenshot = function (screenshot) {
    this.screenshot = screenshot;
};

// Setter method for setting the status
BugSchema.methods.setStatus = function (status) {
    this.status = status;
};

// Setter method for setting the type
BugSchema.methods.setType = function (type) {
    this.type = type;
};

// Add a developer to the developers array
BugSchema.methods.addDeveloper = function (developer) {
    this.developers.push(developer);
};

// Remove a developer from the developers array
BugSchema.methods.removeDeveloper = function (developer) {
    const index = this.developers.indexOf(developer);
    if (index !== -1) {
        this.developers.splice(index, 1);
    }
};

module.exports = mongoose.model('Bug', BugSchema);
