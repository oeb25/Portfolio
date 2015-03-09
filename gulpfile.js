const gulp = require('gulp'),
	webpack = require('gulp-webpack'),
	livereload = require('gulp-livereload')

gulp.task('webpack', function() {
	gulp.src('app/main.js')
		.pipe(webpack({
			watch: true,
			output: {
				filename: 'bundle.js'
			},
			module: {
				loaders: [
					{ test: /\.js/, loader: 'babel' }
				]
			}
		}))
		.pipe(gulp.dest('public'))
})

gulp.task('watch', function() {

	livereload.listen()

	gulp.watch('public/*', function(a) {
		livereload.reload(a.path)
	})

})

gulp.task('default',['webpack', 'watch'])