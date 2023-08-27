import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: String,
  manager: String,
  developers: [{
    type: String,
  }],
  qas: [{
    type: String,
  }],
  bugs: [{
    type: String,
  }],
});

// Add a manager to the manager field
ProjectSchema.methods.addManager = function(manager:string) {
  this.manager = manager;
};

// Add a developer to the developers array
ProjectSchema.methods.addDeveloper = function(developer:string) {
  this.developers.push(developer);
};

// Add a QA to the qas array
ProjectSchema.methods.addQA = function(qa:string) {
  this.qas.push(qa);
};

// Add a bug to the bugs array
ProjectSchema.methods.addBug = function(bug:string) {
  this.bugs.push(bug);
};

// Remove a manager from the manager field
ProjectSchema.methods.removeManager = function() {
  this.manager = undefined;
};

// Remove a developer from the developers array
ProjectSchema.methods.removeDeveloper = function(developer:string) {
  const index = this.developers.indexOf(developer);
  if (index !== -1) {
    this.developers.splice(index, 1);
  }
};

// Remove a QA from the qas array
ProjectSchema.methods.removeQA = function(qa:string) {
  const index = this.qas.indexOf(qa);
  if (index !== -1) {
    this.qas.splice(index, 1);
  }
};

// Remove a bug from the bugs array
ProjectSchema.methods.removeBug = function(bug:string) {
  const index = this.bugs.indexOf(bug);
  if (index !== -1) {
    this.bugs.splice(index, 1);
  }
};

// Add a title to the title field
ProjectSchema.methods.addTitle = function(title:string) {
  this.title = title;
};

module.exports = mongoose.model("Project", ProjectSchema);
