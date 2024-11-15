const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');

// Minify JavaScript
function scripts() {
    return gulp.src('src/js/*.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
}

// Minify CSS
function styles() {
    return gulp.src('src/css/*.css')
        .pipe(concat('main.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
}

// Minify HTML
function html() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ 
            collapseWhitespace: true,
            removeComments: true,
            minifyJS: true,
            minifyCSS: true
        }))
        .pipe(gulp.dest('dist'));
}

// Copy images
function images() {
    return gulp.src('public/images/*')
        .pipe(gulp.dest('dist/images'));
}

// Watch for changes
function watch() {
    gulp.watch('src/js/*.js', scripts);
    gulp.watch('src/css/*.css', styles);
    gulp.watch('src/*.html', html);
    gulp.watch('public/images/*', images);
}

// Export tasks
exports.scripts = scripts;
exports.styles = styles;
exports.html = html;
exports.images = images;
exports.watch = watch;

// Default task
exports.default = gulp.series(
    gulp.parallel(scripts, styles, html, images),
    watch
);