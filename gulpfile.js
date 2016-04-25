var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var jade        = require('gulp-jade');
var reload      = browserSync.reload;
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

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
    return gulp.src(['./app/sass/*.sass'])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
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
