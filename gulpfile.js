'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
const babel = require('gulp-babel');


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./",
        index: "index.html",
        ui: {
            port: 8999
        }
    });

    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch('./src/sass/*', ['sass']).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("src/css/"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);