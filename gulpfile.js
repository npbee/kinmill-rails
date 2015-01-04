var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha-co');
var exit = require('gulp-exit');
var sass = require('gulp-ruby-sass');
var watch = require('gulp-watch');

var config = require('./config/paths');
var paths = config.paths;



/**********
 * SCSS
 *********/
gulp.task('scss-dev', function () {
    return sass('scss/app.scss', {
        sourcemap: true
    })
    .on('error', function(err) {
        console.error('Error', err.message);
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./static/css'));
});



/**********
 * JS
 *********/
var bundler = watchify(browserify({
    entries: ['./app.js'],
    transform: [reactify],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
}));


function bundle() {
    console.log('Rebundling...');
    return bundler.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./static'));
}

bundler.on('update', bundle);



/**********
 * SERVER
 *********/
gulp.task('server', function() {
    nodemon({
        script: 'server.js',
        ext: 'html js',
        nodeArgs: ['--harmony'],
        env: {
            'NODE_ENV': process.env.NODE_ENV || 'development'
        }
    })
    .on('change', [])
    .on('restart', function() {
        console.log('restarted')
    });
});



/**********
 * TESTS
 *********/
gulp.task('test', function() {
    return gulp.src('./tests/**/*.js')
        .pipe(mocha({
            reporter: 'nyan'
        }))
        .pipe(exit());
   }
);



/**********
 * TASKS
 *********/
gulp.task('scss', function() {
    watch('./scss/**/*.scss', function() {
        gulp.start('scss-dev');
    });
});
gulp.task('js', bundle);
gulp.task('default', ['server', 'js', 'scss']);
