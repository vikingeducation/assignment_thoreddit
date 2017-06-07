'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');

gulp.task('default', ['browser-sync', 'nodemon'], () => {});

gulp.task('browser-sync', () => {
    browserSync.init(null, {
        proxy: "localhost:3030", //this should be whatever your app is set to listen on
        browser: "google-chrome",
        port: 7001
    });
    gulp.watch('./views/**/*.handlebars').on('change', browserSync.reload);
    gulp.watch('./public/**/*.*').on('change', browserSync.reload);
});

gulp.task('nodemon', (callback) => {
    var started = false;

    return nodemon({
        script: 'app.js' // this is where you app is located
    })
    .on('start', () =>{
        if (!started) {
            callback();
            started = true;
        }
    });
});