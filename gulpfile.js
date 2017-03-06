/* --------- plugins --------- */

var
	gulp        = require('gulp'),
	browserSync = require('browser-sync');


/* --------- browser sync --------- */

gulp.task('sync', function() {
	browserSync({
		port: 3000,
		server: {
			baseDir: 'app'
		}
	});
});


/* --------- default --------- */

// gulp.task('default', ['sync']);