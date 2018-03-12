const gulp = require('gulp');

// Testing..
const istanbul = require('gulp-istanbul'),
  jasmine = require('gulp-jasmine');
gulp.task('test', function (cb) {
  gulp.src('lib/**/*.js')
    .pipe(istanbul({
      'includeUntested': true
    }))
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      gulp.src(['test/**/*spec.js'])
        .pipe(jasmine({
          'verbose': (process.env['VERBOSE'] == 'true')
        }))
        .pipe(istanbul.writeReports())
        .on('end', cb);
    });
});

gulp.task('default', ['test']);
