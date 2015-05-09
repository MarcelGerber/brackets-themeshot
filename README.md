# Brackets Themeshot [![Dependency Status](https://david-dm.org/MarcelGerber/brackets-themeshot.svg)](https://david-dm.org/MarcelGerber/brackets-themeshot)

Creates screenshots of themes for Brackets.

## Setup
1. Make sure you got the submodules up to date. Run `git submodule update --init`.
2. Run `npm install`.
3. Make sure you got a copy of [BracketsThemesGrabber](https://github.com/MarcelGerber/BracketsThemesGrabber) on your system. Run `git clone https://github.com/MarcelGerber/BracketsThemesGrabber` in the folder you want it to install into, then `cd` into that folder and run `npm install` and `node grabem.js`. The latter takes some time.
4. Create a symlinked `themes` directory in brackets-themeshot, pointing to BracketsThemesGrabbers `downloads` directory.
    * On Windows: `mklink /d [brackets-themeshot]\themes [BracketsThemesGrabber]\downloads`, as admin
    * On Linux: `sudo ln -s [BracketsThemesGrabber]/downloads [brackets-themeshot]/themes`
    * On OS X: `ln -s [BracketsThemesGrabber]/downloads [brackets-themeshot]/themes`
5. Download a [PhantomJS 2.x](http://phantomjs.org/download.html) binary for your system (or build it yourself) and place it in the root directory of this project.
6. Run `node themeshot.js`
