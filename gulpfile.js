// Compiles the sources in code/ into what Jekyll reads: Pug into _includes/,
// Sass into code/css, JS into code/js. The outputs are committed, because
// GitHub Pages builds the site with its own Jekyll and has no Node.
// Jekyll itself is run apart, by build.sh, in its own container.

const gulp         = require('gulp');
const bourbon      = require('node-bourbon').includePaths;
const sass         = require('gulp-sass')(require('sass'));
const pug          = require('gulp-pug');
const prefix       = require('gulp-autoprefixer');
const cssnano      = require('gulp-cssnano');
const uglify       = require('gulp-uglify');
const fs           = require('fs');
const yaml         = require('js-yaml');

const pugFiles_s   = './code/_pug/4-pages/*.pug';
const pugFiles_ws  = './code/_pug/**/*.pug';
const pugFiles_o   = '_includes/';
const sassFolder   = './code/_sass/';
const sassFiles_ws = ['./code/_sass/**/*.sass', './code/_sass/**/*.scss', './code/_scss/*.scss'];
const cssFiles_s   = './code/_scss/*.scss';
const cssFiles_o   = 'code/css';
const jsFiles_s    = './code/_js/*.js';
const jsFiles_o    = 'code/js';
const linksData    = '_data/general/links.yml';

// The links page draws one node per `linkN` entry; Pug needs the count when it compiles.
function pugLocals() {
  const links = yaml.load(fs.readFileSync(linksData, 'utf8'));
  return { linkCount: Object.keys(links).filter(k => /^link\d+$/.test(k)).length };
}

const browserVersions = ['last 15 versions', '> 1%', 'ie 8'];

////////////////////////////////////////////////////////////////////////////////

gulp.task('sass-prod', function () {
  return gulp.src(cssFiles_s)
    .pipe(sass({ includePaths: [sassFolder].concat(bourbon) }).on('error', sass.logError))
    .pipe(prefix(browserVersions, { cascade: true }))
    .pipe(cssnano())
    .pipe(gulp.dest('./'+cssFiles_o));
});

gulp.task('scripts-prod', function () {
  return gulp.src(jsFiles_s)
    .pipe(uglify())
    .pipe(gulp.dest('./'+jsFiles_o));
});

gulp.task('pug-prod', function () {
  return gulp.src(pugFiles_s)
    .pipe(pug({ locals: pugLocals() }))
    .pipe(gulp.dest('./'+pugFiles_o));
});

////////////////////////////////////////////////////////////////////////////////

gulp.task('build', gulp.parallel('scripts-prod', 'sass-prod', 'pug-prod'));

gulp.task('watch', gulp.series('build', function watching() {
  gulp.watch(sassFiles_ws, gulp.series('sass-prod'));
  gulp.watch(jsFiles_s, gulp.series('scripts-prod'));
  gulp.watch([pugFiles_ws, linksData], gulp.series('pug-prod'));
}));

gulp.task('default', gulp.series('build'));
