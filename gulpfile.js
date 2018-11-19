const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');

const srcDir = '..';
const destDir = 'lib';

const getFolders = (dir) => {
  return fs.readdirSync(dir)
    .filter((file) => {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
};

gulp.task('uglifyJs', () => {
  //调用getFolders方法获取到文件集合
  const folders = getFolders(srcDir);
  //遍历得到每一个子文件
  const tasks = folders.map((folder) => {
    gulp.src([`${srcDir}/${folder}/**/*.js`, '!gulpfile.js', '!build/*.js', '!node_modules/**/*.js', '!lib/**/*.js'])
      .pipe(babel({ presets: ['@babel/env'] }))
      //压缩js
      .pipe(uglify({
        toplevel: true
      }))
      .pipe(obfuscate())
      //输出文件
      .pipe(gulp.dest(destDir));
  });

  return tasks;
});
