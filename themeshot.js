var fs      = require("fs"),
    child   = require("child_process"),

    spawnSync   = require("spawn-sync"),
    less        = require("less");

if (!fs.existsSync("compiled")) {
    fs.mkdirSync("compiled");
}
if (!fs.existsSync("images")) {
    fs.mkdirSync("images");
}
fs.readdirSync("images").forEach(function (image) { // delete all old images
    fs.unlinkSync("images/" + image);
});

var templatesAvailable = fs.readdirSync("templates").map(function (templateFile) {
    return templateFile.substring(0, templateFile.lastIndexOf("."));
});

var dirs = fs.readdirSync("themes").filter(function (name) {
    return name !== "registry.json" && name !== "zips";
});

dirs.forEach(function (dir) {
    var extensionName = dir;
    dir = "themes/" + dir;
    
    while(true) {
        var dirContents = fs.readdirSync(dir).filter(function (name) {
            return name !== "__MACOSX";
        });
        if (dirContents.indexOf("package.json") < 0 && dirContents.length === 1) {
            dir += "/" + dirContents[0];
        } else {
            break;
        }
    }
    
    var packageJSON = JSON.parse(fs.readFileSync(dir + "/package.json")),
        fileName    = packageJSON.theme && packageJSON.theme.file;
    if (!fileName) {
        return;
    }

    var fileContent = fs.readFileSync(dir + "/" + fileName);
    console.log("Compiling. Extension: " + extensionName);
    less.render("#editor-holder {" + fileContent + "/**/\n}", function (e, output) {
        if (e) {
            console.error("Error processing theme " + extensionName + " (" + fileName + ")", e);
        } else {
            fs.writeFileSync("compiled/" + extensionName + ".css", output.css);
            templatesAvailable.forEach(function (templateName) {
                console.log("Taking screens. Extension: " + extensionName + ", Template: " + templateName);
                spawnSync("phantomjs.exe", ["phantom.js", extensionName, templateName, dir]);
            });
        }
    });
});
