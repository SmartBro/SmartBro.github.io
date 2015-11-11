var gulp            = require('gulp'),
    jade            = require('gulp-jade'),
    sass            = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    uglify          = require('gulp-uglify'),
    concat          = require('gulp-concat'),
    changed         = require('gulp-changed'),
    connect         = require('gulp-connect');

gulp.task('connect', function () {
    connect.server({
        livereload: true,
        port: 8080
    });
});

gulp.task('jade', function () {
    gulp.src('src/**/*.jade')
        .pipe(changed('dist'))
        .pipe(jade({
            locals: {},
            pretty: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('js', function () {
    gulp.src('./src/**/*.js')
        .pipe(changed('./dist'))
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
});

gulp.task('sass', function () {
    gulp.src('./src/sass/main.sass')
        .pipe(changed('./assets/styles'))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch('./src/**/*.jade', ['jade']);
    gulp.watch('./src/**/*.js', ['js']);
    gulp.watch('./src/**/*.sass', ['sass']);
});

gulp.task('default', ['jade', 'js', 'sass', 'connect', 'watch']);
