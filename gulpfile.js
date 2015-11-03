var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var hbsfy = require('hbsfy');
var gutil = require('gulp-util');
var electron = require('electron-connect').server.create();

gulp.task('serve', ['build-html', 'build-css', 'build-js'], function () {
  electron.start('--disable-http-cache');

  gulp.watch('main.js', function(){
    electron.restart('--disable-http-cache');
  });

  gulp.watch('src/css/*.scss', ['rebuild-css']);
  gulp.watch('src/js/app.js', ['rebuild-js']);
  gulp.watch('src/index.html', ['rebuild-html']);
});

gulp.task('rebuild-html', ['build-html'], function(){
  electron.reload();
});
gulp.task('rebuild-css', ['build-css'], function() {
  electron.reload();
});
gulp.task('rebuild-js', ['build-js'], function() {
  electron.reload();
});

gulp.task('build-js', function () {
  return browserify('./src/js/app.js')
    .transform(babelify)
    .transform(hbsfy)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/scripts/'))
    .on('error', gutil.log);
});

gulp.task('build-html', function() {
  return gulp.src('src/index.html')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('dist/'));
});

gulp.task('build-css', function() {
  return sass('./src/sass/main.scss', {
    loadPath: [
      './node_modules/bootstrap-sass/assets/stylesheets/',
      './node_modules/font-awesome/scss/',
    ]
  })
  .pipe(gulp.dest('./dist/stylesheets/'));
});

electron.on("appClosed", function(){
  electron.stop(function(){
    process.exit(0);
  });
});

gulp.task('start', ['serve']);
