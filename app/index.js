var generators = require('yeoman-generator'),
    _          = require('lodash');

classicInputFunction = function (name, message, defaultValue) {
  return function () {
    var done = this.async();
    this.prompt({
      type    : 'input',
      name    : name,
      message : message,
      default : defaultValue,
      store   : true 
    }, function (answers) {
      this.answers = this.answers || {};
      this.answers[name] = answers[name];
      done();
    }.bind(this));
  };
};

module.exports = generators.Base.extend({
  prompting: {
    projectName: classicInputFunction('projectName', 'Your project name', this.appname),
    projectDescription: classicInputFunction('projectDescription', 'Your project description', 'TO BE DEFINED'),
    githubAccount: classicInputFunction('githubAccount', 'Your github account', 'Picta-it')
  },
  writing: function () {
    var answers = this.answers;

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        title: _.capitalize(_.camelCase(answers.projectName)) || '',
        projectName: answers.projectName || '',
        projectDescription: answers.projectDescription || '',
        githubAccount: answers.githubAccount || ''
      }
    );
  }
});
