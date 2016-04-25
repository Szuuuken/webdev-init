var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var jade        = require('gulp-jade');
var reload      = browserSync.reload;
var favicons    = require("gulp-favicons"), gutil = require("gutil");

gulp.task("favicon", function () {
    return gulp.src("./app/img/brand.png").pipe(favicons({
      appName: "kleinrath.wien",
      appDescription: "Foto, Grfik, Druck",
      developerName: "Daniel Szukitsch",
      developerURL: "http://kleinrath.wien",
      background: "#020307",
      path: "favicons/",
      url: "http://kleinrath.wien",
      display: "standalone",
      orientation: "portrait",
      version: 1.0,
      logging: false,
      online: false,
      html: "test.html",
      pipeHTML: true,
      replace: true
    }))
    .on("error", gutil.log)
    .pipe(gulp.dest("./dist/favicons"));
});

gulp.task('js',function(){
    return gulp.src([
      './bower_components/jquery/dist/jquery.min.js',
      './bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
      './app/js/*.js'])
      .pipe(gulp.dest('./dist/js/'))
      .pipe(reload({stream: true}));
});

gulp.task('images',function(){
    return gulp.src('./app/img/**')
          .pipe(gulp.dest('./dist/img/'))
});

/**
 * Compile jade files into HTML
 */
gulp.task('templates', function() {

    var YOUR_LOCALS = {};

    return gulp.src('./app/*.jade')
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest('./dist/'))
});

/**
 * Important!!
 * Separate task for the reaction to `.jade` files
 */
gulp.task('jade-watch', ['templates'], reload);

/**
 * Sass task for live injecting into all browsers
 */
gulp.task('sass', function () {
    return gulp.src('./app/sass/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'))
        .pipe(reload({stream: true}));
});

/**
 * Serve and watch the scss/jade files for changes
 */
gulp.task('default', ['sass', 'templates', 'images', 'js'], function () {

    browserSync({server: './dist'});

    var sass_watch = [
      './app/sass/**/*.sass'
    ];

    var jade_watch = [
      './app/*.jade',
      './app/jade/**/*.jade'
    ];

    gulp.watch(sass_watch, ['sass']);
    gulp.watch(jade_watch, ['jade-watch']);
    gulp.watch('./app/img/**',['images']);
    gulp.watch('./app/js/*.js',['js']);
});
