const cp           = require('child_process');
const browserSync  = require('browser-sync').create();

const gulp         = require('gulp');
const jekyll       = require('gulp-jekyll');
const bourbon      = require('node-bourbon').includePaths;
const sass         = require('gulp-sass')(require('sass'));
const pug          = require('gulp-pug');
const prefix       = require('gulp-autoprefixer');
const prettify     = require('gulp-prettify');
const concat       = require('gulp-concat');
const cssnano      = require('gulp-cssnano');
const uglify       = require('gulp-uglify');
const ghdeploy     = require('gulp-gh-pages');
const log          = require('fancy-log');

const siteRoot     = './_site/';
const pugFiles_s   = './code/_pug/4-pages/*.pug';
const pugFiles_ws  = './code/_pug/**/*.pug';
const pugFiles_o   = '_includes/';
const htmlFiles    = ['./*.html', './_layouts/*.html','./_includes/**/*'];
const sassFolder   = './code/_sass/';
const sassFiles_s  = './code/_sass/*/*.sass';
const cssFiles_s   = './code/_scss/*.scss';
const cssFiles_o   = 'code/css';
const jsFiles_s    = './code/_js/*.js';
const jsFiles_o    = 'code/js';
// const jsScriptFile = 'scripts.js';
const dataFiles    = '_data/**/*.yml';
// const deployFolder =  "./_site/**/*"

const messages = {
  jekyllDev: 'Running: $ jekyll build for dev',
  jekyllProd: 'Running: $ jekyll build for prod'
};

const browserVersions = ['last 15 versions', '> 1%', 'ie 8'];

////////////////////////////////////////////////////////////////////////////////

gulp.task('sass', function () {
    console.log("sass");
    return gulp.src(cssFiles_s)
        .pipe(sass({
          includePaths: [sassFolder].concat(bourbon),
          onError:      browserSync.notify
        }))
        .pipe(prefix(browserVersions, { cascade: true }))
        .pipe(gulp.dest('./'+cssFiles_o))
        .pipe(browserSync.reload({stream:true})) ;
});

gulp.task('sass-prod', function sassProd() {
  return gulp.src(cssFiles_s)
    .pipe(sass({
      includePaths: [sassFolder].concat(bourbon),
      onError:      browserSync.notify
    }))
    .pipe(prefix(browserVersions, { cascade: true }))
    .pipe(cssnano())
    .pipe(gulp.dest('./'+cssFiles_o))
    ;
});

//

gulp.task('scripts', function () {
    return gulp.src(jsFiles_s)
        // .pipe(concat(jsScriptFile))
        .pipe(gulp.dest('./'+jsFiles_o))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('scripts-prod', function scriptsProd() {
  return gulp.src(jsFiles_s)
    // .pipe(concat(jsScriptFile))
    .pipe(uglify())
    .pipe(gulp.dest('./'+jsFiles_o))
    ;
});

//

gulp.task('pug', function () {
    return gulp.src(pugFiles_s)
        .pipe(pug())
        .pipe(prettify())
        .pipe(gulp.dest('./'+pugFiles_o));
});

gulp.task('pug-prod', function pugProd() {
  return gulp.src(pugFiles_s)
    .pipe(pug())
    .pipe(gulp.dest('./'+pugFiles_o));
});

////////////////////////////////////////////////////////////////////////////////

gulp.task('jekyll-dev', function(done) {
  browserSync.notify(messages.jekyllDev);
  cp.spawn('jekyll.bat', ['build',
                        '--trace',
                        '--drafts',
                        '--config',
                        '_config.yml'], {stdio: 'inherit'});
  done();

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => log('Jekyll: ' + message));
  };
  // jekyll.stdout.on(['data'], jekyllLogger);
  // jekyll.stderr.on(['data'], jekyllLogger);
});

gulp.task('jekyll-prod', function(done) {
  browserSync.notify(messages.jekyllProd);
  cp.spawn('jekyll.bat', ['build'], {stdio: 'inherit'});
  done();
});

gulp.task('jekyll-rebuild', gulp.series('jekyll-dev', function(done) {
  browserSync.reload();
  done();
}));

////////////////////////////////////////////////////////////////////////////////

gulp.task('browser-sync', function() {
  browserSync.init({
    files: siteRoot+'*',
    port: 4000,
    server: {
      baseDir: siteRoot
    },
    notify: false,
    require : [ 'jquery-browserify', 'jquery-mousewheel' ]
  });
});

gulp.task('watch', function() {
  gulp.watch(sassFiles_s, gulp.series('sass', 'jekyll-rebuild'));
  gulp.watch(jsFiles_s, gulp.series('scripts', 'jekyll-rebuild'));
  gulp.watch(pugFiles_ws, gulp.series('pug', 'jekyll-rebuild'));
  gulp.watch(htmlFiles, gulp.series('jekyll-rebuild'));
  gulp.watch(dataFiles, gulp.series('jekyll-rebuild'));
});

////////////////////////////////////////////////////////////////////////////////

gulp.task('default', gulp.series('sass', 'scripts', 'pug', 'jekyll-rebuild', gulp.parallel('watch', 'browser-sync')));

gulp.task('build', gulp.series(gulp.parallel('scripts-prod', 'sass-prod', 'pug-prod'), 'jekyll-prod'));

gulp.task('deploy', gulp.series('build', function deploy(done) {
    gulp.src(deployFolder)
        .pipe(ghdeploy());
    done();
}));
