const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const ejs = require('gulp-ejs');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');

gulp.task('styles', () => gulp.src('style/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('dist/style')));

gulp.task('copy-index', () => gulp.src('index.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('dist')));

gulp.task('minify-css', () => gulp.src('dist/**/*.css')
  .pipe(cleanCSS())
  .pipe(gulp.dest('dist')));

gulp.task('minify-html', () => gulp.src('dist/**/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('dist')));

gulp.task('minify-js', () => gulp.src('js/modal_window.js')
  .pipe(terser())
  .pipe(gulp.dest('dist/js')));

gulp.task('default', gulp.series('styles', 'copy-index', 'minify-css', 'minify-html', 'minify-js'));
