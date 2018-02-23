const gulp = require('gulp');
const mocha=require('gulp-mocha');

gulp.task('test', function() {
    return gulp.src(['test/**/*.js'],{read:true})
        .pipe(mocha({
            reporter:'landing',  //spec  list  landing  markdown
            ui:'tdd'
        }))
        .once('error', err => {
            console.error(err);
            process.exit(1);
        })
});

gulp.task('default',['test']);
