'use strict';

const gulp            = require('gulp');
const gutil           = require("gulp-util");

const babel           = require('gulp-babel');
const rename          = require('gulp-rename');
const uglify          = require('gulp-uglify');
const banner          = require('gulp-banner');
const notify          = require('gulp-notify');
const bump            = require('gulp-bump');
const strip           = require('gulp-strip-comments');

const pkg             = require('./package.json');

const comment         = `/*!
 * ${pkg.name} - version ${pkg.version}
 *
 * Made with ❤ by ${pkg.author.name} ${pkg.author.email}
 *
 * Copyright (c) ${(new Date()).getFullYear()} ${pkg.author.name}
 */
`;

const src             = {
  jsAll:        'src/**/*.js',
  jsDest:       'dist',
};

const uglifyConfig    = {
  mangle: {
    except: ['http']
  },
  compress: {
    drop_console: true
  },
  preserveComments: false,
};

gulp.task('watch', () => {
  gulp.watch(src.jsAll, ['js']);
});

gulp.task('js', ['js:next'], () => {
  return gulp.src(src.jsAll)
    .pipe(babel({
      presets: ['es2015', 'stage-0'],
      plugins: [
        "add-module-exports",
        "transform-es2015-modules-umd"
      ],
    }))
    .pipe(rename('http.js'))
    .pipe(banner(comment))
    .pipe(gulp.dest(src.jsDest))
    .pipe(strip())
    .pipe(babel({
      presets: ['babili']
    }))
    .pipe(rename('http.min.js'))
    .pipe(banner(comment))
    .pipe(gulp.dest(src.jsDest));
});

gulp.task('js:next', () => {
  return gulp.src(src.jsAll)
    .pipe(rename('http.next.js'))
    .pipe(banner(comment))
    .pipe(gulp.dest(src.jsDest))
    .pipe(strip())
    .pipe(babel({
      presets: ['babili']
    }))
    .pipe(rename('http.next.min.js'))
    .pipe(banner(comment))
    .pipe(gulp.dest(src.jsDest))
    .pipe(notify('js done'));
});

gulp.task('bump:pre', () => {
   gulp.src(['./bower.json', './component.json', './package.json'])
    .pipe(bump({type: 'prerelease'}))
    .pipe(gulp.dest('./'));
});

gulp.task('bump:patch', () => {
   gulp.src(['./bower.json', './component.json', './package.json'])
    .pipe(bump({type: 'patch'}))
    .pipe(gulp.dest('./'));
});

gulp.task('bump:minor', () => {
   gulp.src(['./bower.json', './component.json', './package.json'])
    .pipe(bump({type: 'minor'}))
    .pipe(gulp.dest('./'));
});

gulp.task('bump:major', () => {
   gulp.src(['./bower.json', './component.json', './package.json'])
    .pipe(bump({type: 'major'}))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['dist', 'watch']);

gulp.task('dist', ['js'], () => {
  return gulp.src('./')
    .pipe(notify('dist done'));
});

// generic error handler
function onError(err) {
  // console.log(err.toString());
  this.emit('end');
}
