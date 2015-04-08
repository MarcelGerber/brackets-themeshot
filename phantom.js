var page    = require("webpage").create(),
    system  = require("system"),
    fs      = require("fs");

var themeName   = system.args[1],
    template    = system.args[2],
    themeDir    = system.args[3];

var packageJSON     = JSON.parse(fs.read(themeDir + "/package.json")),
    themeOptions    = packageJSON.theme,
    fileName        = themeOptions.file,
    isDark          = themeOptions.dark || false,
    addModeClass    = themeOptions.addModeClass || false;

var htmlString = fs.read("templates/" + template + ".html");
htmlString = htmlString.replace("__ADD_MODE_CLASS__", addModeClass);
htmlString = htmlString.replace(/__BASE_PATH__/g, phantom.libraryPath);
htmlString = htmlString.replace("__CSS_FILE_HERE__", "compiled/" + themeName + ".css");
htmlString = htmlString.replace("__DARK_HERE__", isDark ? "dark" : "");
htmlString = htmlString.replace("__THEME_NAME__", themeName);

page.onLoadFinished = function() {
    page.render("images/" + themeName + "-" + template + ".png");
    phantom.exit();
};

page.localToRemoteUrlAccessEnabled = true;
page.viewportSize = {width: 1920, height: 1080};
page.content = htmlString;
