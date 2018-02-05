const gulp = require('gulp');
const mocha=require('gulp-mocha');

gulp.task('default', function() {
    return gulp.src(['test/dao/*.js'],{read:false})
        .pipe(mocha())
        .once('error', err => {
            console.error(err);
            process.exit(1);
        })
});