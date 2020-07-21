const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");
let noOfRenderedEmployees = 0;
const render = (employees) => {
  const html = [];

  html.push(
    employees
      .filter((employee) => employee.getRole() === "Manager")
      .map((manager) => renderManager(manager))
  );

  html.push(
    employees
      .filter((employee) => employee.getRole() === "Engineer")
      .map((engineer) => renderEngineer(engineer))
  );
  html.push(
    employees
      .filter((employee) => employee.getRole() === "Intern")
      .map((intern) => renderIntern(intern))
  );

  return renderMain(html.join(""));
};

const close_and_open_div_row = () => {
  let template = `</div> <div class="row justify-content-center">`;
  return template;
};
const renderManager = (manager) => {
  let template = fs.readFileSync(
    path.resolve(templatesDir, "manager.html"),
    "utf8"
  );
  /*
  let end = noOfRenderedEmployees++ % 3 === 0 ? "</div>" : "";
  let start = noOfRenderedEmployees++ % 3 == 0 ? "<div class=row>" : "";
  template = replacePlaceholders(template, "end_manager", end);
  template = replacePlaceholders(template, "start_manager", start); */
  template = replacePlaceholders(template, "name", manager.getName());
  template = replacePlaceholders(template, "role", manager.getRole());
  template = replacePlaceholders(template, "email", manager.getEmail());
  template = replacePlaceholders(template, "id", manager.getId());
  template = replacePlaceholders(
    template,
    "officeNumber",
    manager.getOfficeNumber()
  );
  console.log("typeof-template", typeof template);
  noOfRenderedEmployees++;
  if (noOfRenderedEmployees % 3 === 0) {
    template += close_and_open_div_row();
  }
  return template;
};

const renderEngineer = (engineer) => {
  let template = fs.readFileSync(
    path.resolve(templatesDir, "engineer.html"),
    "utf8"
  );
  /*
  let end = noOfRenderedEmployees++ % 3 === 0 ? "</div>" : "";
  let start = noOfRenderedEmployees++ % 3 == 0 ? "<div class=row>" : "";
  template = replacePlaceholders(template, "end_engineer", end);
  template = replacePlaceholders(template, "start_engineer", start); */
  template = replacePlaceholders(template, "name", engineer.getName());
  template = replacePlaceholders(template, "role", engineer.getRole());
  template = replacePlaceholders(template, "email", engineer.getEmail());
  template = replacePlaceholders(template, "id", engineer.getId());
  template = replacePlaceholders(template, "github", engineer.getGithub());
  noOfRenderedEmployees++;
  if (noOfRenderedEmployees % 3 === 0) {
    template += close_and_open_div_row();
  }
  return template;
};

const renderIntern = (intern) => {
  let template = fs.readFileSync(
    path.resolve(templatesDir, "intern.html"),
    "utf8"
  );
  /*
  let end = noOfRenderedEmployees++ % 3 == 0 ? "</div>" : "";
  let start = noOfRenderedEmployees++ % 3 == 0 ? "<div class=row>" : "";
  template = replacePlaceholders(template, "end_intern", end);
  template = replacePlaceholders(template, "start_intern", start); */
  template = replacePlaceholders(template, "name", intern.getName());
  template = replacePlaceholders(template, "role", intern.getRole());
  template = replacePlaceholders(template, "email", intern.getEmail());
  template = replacePlaceholders(template, "id", intern.getId());
  template = replacePlaceholders(template, "school", intern.getSchool());
  noOfRenderedEmployees++;
  if (noOfRenderedEmployees % 3 === 0) {
    template += close_and_open_div_row();
  }
  return template;
};

const renderMain = (html) => {
  const template = fs.readFileSync(
    path.resolve(templatesDir, "main.html"),
    "utf8"
  );
  return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;
