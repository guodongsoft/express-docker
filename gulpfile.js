const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');

const srcDir = '..';
const destDir = 'lib';

const folders = ((dir) => {
  return fs.readdirSync(dir)
    .filter((file) => {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
})(srcDir);

gulp.task('copyFiles', () => {
  //遍历得到每一个子文件
  const tasks = folders.map((folder) => {

    gulp.src([
      `${srcDir}/${folder}/**/*`,
      `!${srcDir}/${folder}/**/*.js`,
      '!bin/**',
      '!build/**',
      '!lib/**',
      '!node_modules/**'])
      .pipe(gulp.dest(destDir));
  });

  return tasks;
});

gulp.task('uglifyJs', () => {
  //遍历得到每一个子文件
  const tasks = folders.map((folder) => {

    gulp.src([
      `${srcDir}/${folder}/**/*.js`,
      '!gulpfile.js',
      '!build/*.js',
      '!node_modules/**/*.js',
      '!lib/**/*.js'])
      .pipe(babel({ presets: ['@babel/env'] }))
      .pipe(uglify({ toplevel: true }))
      .pipe(obfuscate())
      .pipe(gulp.dest(destDir));
  });

  return tasks;
});

gulp.task('default', ['copyFiles', 'uglifyJs']);
