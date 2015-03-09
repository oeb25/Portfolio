const gulp = require('gulp'),
	webpack = require('gulp-webpack'),
	livereload = require('gulp-livereload'),
	sourcemaps = require('gulp-sourcemaps')

gulp.task('webpack', function() {
	gulp.src('app/main.js')
		.pipe(sourcemaps.init())
		.pipe(webpack({
			watch: true,
			debug: true,
			devtool: 'inline-source-map',
			output: {
				filename: 'bundle.js'
			},
			module: {
				loaders: [
					{ test: /\.js/, loader: 'babel' },
					{ test: /\.md/, loader: 'raw' }
				]
			}
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public'))
})

gulp.task('watch', function() {

	livereload.listen()

	gulp.watch('public/*', function(a) {
		livereload.reload(a.path)
	})

})

gulp.task('default',['webpack', 'watch'])