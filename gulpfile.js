/* --------- plugins --------- */

var
	gulp        = require('gulp'),
	browserSync = require('browser-sync').create(),
	jade        = require('gulp-jade'),
	plumber     = require('gulp-plumber'),
	browserify  = require('gulp-browserify'),
	uglify      = require('gulp-uglify'),
	rename      = require("gulp-rename"),
	compass     = require('gulp-compass'),
	concat      = require('gulp-concat');



/* --------- paths --------- */

var
	paths = {
		jade : {
			location    : 'app/markups/**/*.jade',
			compiled    : 'app/markups/_pages/*.jade',
			destination : '.'
		},

		scss : {
			location    : 'app/styles/**/*.scss',
			entryPoint  : 'css/main.css'
		},

		compass : {
			configFile  : 'config.rb',
			cssFolder   : 'css',
			scssFolder  : 'app/styles',
			imgFolder   : 'img'
		},

		js : {
			location    : 'app/scripts/main.js',
			plugins     : 'app/scripts/_plugins/*.js',
			destination : 'js'
		},

		browserSync : {
			baseDir : './',
			watchPaths : ['*.html', 'css/*.css', 'js/*.js']
		}
	}


/* --------- browser sync --------- */

// gulp.task('sync', function() {
// 	browserSync({
// 		port: 3000,
// 		server: {
// 			baseDir: 'app'
// 		}
// 	});
// });

gulp.task('sync', function() {
	browserSync.init({
		server: {
			baseDir: paths.browserSync.baseDir
		}
	});
});

/* --------- jade --------- */

gulp.task('jade', function() {
	gulp.src(paths.jade.compiled)
		.pipe(plumber())
		.pipe(jade({
			pretty: '\t',
		}))
		.pipe(gulp.dest(paths.jade.destination));
});

/* --------- scss-compass --------- */

gulp.task('compass', function() {
	gulp.src(paths.scss.location)
		.pipe(plumber())
		.pipe(compass({
			config_file: paths.compass.configFile,
			css: paths.compass.cssFolder,
			sass: paths.compass.scssFolder,
			image: paths.compass.imgFolder
		}));
});

/* --------- plugins --------- */

gulp.task('plugins', function() {
	return gulp.src(paths.js.plugins)
		.pipe(plumber())
		.pipe(concat('plugins.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.js.destination));
});

/* --------- plugins --------- */

gulp.task('scripts', function() {
	return gulp.src(paths.js.location)
		.pipe(plumber())
		.pipe(uglify())
		.pipe(rename('main.min.js'))
		.pipe(gulp.dest(paths.js.destination));
});

/* --------- watch --------- */

gulp.task('watch', function(){
	gulp.watch(paths.jade.location, ['jade']);
	gulp.watch(paths.scss.location, ['compass']);
	gulp.watch(paths.js.location, ['scripts']);
	gulp.watch(paths.js.plugins, ['plugins']);
	gulp.watch(paths.browserSync.watchPaths).on('change', browserSync.reload);
});


/* --------- default --------- */

gulp.task('default', ['sync', 'jade', 'compass', 'plugins', 'scripts', 'watch']);