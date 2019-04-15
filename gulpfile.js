let gulp = require("gulp");
let sass = require("gulp-sass");
let mincss = require("gulp-clean-css");
let babel = require("gulp-babel");
let uglify = require("gulp-uglify");
let server = require("gulp-webserver");
let fs = require("fs");
let path = require("path");
let url = require("url");
let data = require("./data/data.json");
let minimage = require("gulp-imagemin");
//编译sass
gulp.task("devcss", () => {
        return gulp.src("./src/sass/index.scss")
            .pipe(sass())
            .pipe(gulp.dest("./dist/css"))
    })
    //编译js
gulp.task("devjs", () => {
    return gulp.src("./src/js/**/*.js")
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest("./dist/js"))
});
//监听
gulp.task("watch", () => {
    return gulp.watch(["./src/sass/**/*.scss", "./src/js/**/*.js"], gulp.series("devcss", "devjs"))
});
//静态服务
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
gulp.task("default", gulp.series("devcss", "server", "serverData", "watch"));
//压缩css
gulp.task("mincss", () => {
        return gulp.src("./dist/index.css")
            .pipe(mincss())
            .pipe(gulp.dest("./dist/index.css"))
    })
    //压缩js
gulp.task("minjs", () => {
    return gulp.src("./dist/js")
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js"))
});
//压缩image
gulp.task("minimg", () => {
    return gulp.src("./src/img/**/*.gif")
        .pipe(minimage())
        .pipe(gulp.dest("./dist/img"))
});