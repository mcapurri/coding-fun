const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const projectList = require("./projects.json");
// const path = require("path");

const hbSet = handlebars.create({
    helpers: {
        selectItem() {
            return "selected";
        },
    },
});
console.log("projects: ", projectList);
app.engine("handlebars", hbSet.engine);
app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");

app.use(express.static("./projects"));
app.use(express.static("./public"));
// app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("home", {
        layout: "main",
        projects: projectList,
    });
});

app.get("/projects/:project", (req, res) => {
    const project = req.params.project;
    const selectedProject = projectList.find(
        (item) => item.nameProject === project
    );

    if (!selectedProject) {
        return res.sendStatus(404);
    }
    res.render("about", {
        layout: "main",
        projectList,
        selectedProject,
    });
});
app.listen(8080, console.log("Server is listening"));
