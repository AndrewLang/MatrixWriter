//'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify-css');
var merge = require('merge2');
var concat = require('gulp-concat');
var ts = require('gulp-typescript');
var rename = require('gulp-rename');
var sequence = require('run-sequence');
var shell = require('gulp-shell');
var uglify = require('gulp-uglify');


var del = require('del');
var dist = 'dist';
var folder = 'src/app/';

gulp.task('compile', function () {
    return gulp.src('/')
        .pipe(shell('tsc && concurrently'));
});

gulp.task('sass', function () {
    console.log("Compile sass to css.")

    var folder = 'app/assets/styles/';
    return merge(
        gulp.src(folder + '*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(minify())
            .pipe(rename({ suffix: '.min' }))
    )
        .pipe(concat('app.css'))
        .pipe(gulp.dest(dist));
    //.pipe(reload({stream:true}));


});

gulp.task('start:server', function () {
    return gulp.src('/')
        .pipe(shell('concurrently \"npm run tsc:w\" \"npm run lite\" \"gulp sass:watch\"'));
});

gulp.task('sass:watch', function () {
    gulp.watch('app/assets/styles/*.scss', ['sass']);
    //gulp.watch('*.ts', ['scripts'])
});

gulp.task('start', function (callback) {
    sequence(["compile", "sass"], "start:server", function () {
        console.log("gulp task finish");      
    });
});

// backup of npm
// tsc && concurrently  && electron .