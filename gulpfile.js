let gulp = require("gulp");
let sass = require("gulp-sass");
let mincss = require("gulp-clean-css");
let babel = require("gulp-babel");
let uglify = require("gulp-uglify");
let server = require("gulp-webserver");
let fs = require("fs");
let path = require("path");
let url = require("url");
let data = require("./data/data.json")
    //编译sass
gulp.task("devcss", () => {
    return gulp.src("./src/sass/index.scss")
        .pipe(sass())
        .pipe(gulp.dest("./dist/css"))
})
gulp.task("watch", () => {
    return gulp.watch("./src/sass/**/*.scss", gulp.series("devcss"))
})
gulp.task("server", () => {
    return gulp.src("./src/")
        .pipe(server({
            port: 8080,
            open: true,
            livereload: true,
            proxies: [
                { source: "/api/getlist", target: "http://localhost:3000/api/getlist" }
            ]
        }))
})
gulp.task("serverData", () => {
    return gulp.src("./src")
        .pipe(server({
            port: 3000,
            middleware: [(req, res, next) => {
                let { pathname, query } = url.parse(req.url, true);
                pathname = pathname == "/" ? "index.html" : pathname;
                switch (req.method) {
                    case "GET":
                        if (pathname == "/api/getlist/") {
                            res.end(JSON.stringify(data))
                        }
                        break;
                }
            }]

        }))
})
gulp.task("default", gulp.series("devcss", "server", "serverData", "watch"))