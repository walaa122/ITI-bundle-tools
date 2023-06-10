const { src, dest, series } = require("gulp");
const global = {
    html: "./project/index.html",
    css: "./project/*.css",
    js: "./project/*.js",
    img: "./project/*.jpg",
}

//html
const htmlmin = require('gulp-html-minifier-terser');

function htmlTask(){
    return src(global.html).pipe(htmlmin({
        collapseWhitespace:true, removeComments:true
    }))
    .pipe(dest("dist"))
}
exports.html = htmlTask

//css
const concat = require("gulp-concat")
const cleanCss = require("gulp-clean-css");

function cssTask(){
    return src(global.css).pipe(concat("style.min.css"))
    .pipe(cleanCss())
    .pipe(dest("dist/assets"))
}
exports.css = cssTask

//JS
const terser = require('gulp-terser')
function jsTask(){
    return src(global.js).pipe(concat("script.min.js"))
    .pipe(terser()).pipe(dest("dist/assets"))
}
exports.js = jsTask;

//images
const imageOptimize = require("gulp-optimize-images");
function imagesTask(){
    return src(global.img).pipe(imageOptimize({compressOptions:{
        jpeg: {
            quality: 90,
            progressive: true,
        },
        png: {
            quality: 90,
            progressive:true,
            compressionlevel:6,
        }
    }})).pipe(dest("dist/assets/images"))
}
exports.img = imagesTask;

exports.default = series(htmlTask, cssTask, jsTask, imagesTask);
