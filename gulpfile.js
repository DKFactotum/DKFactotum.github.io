const cp           = require('child_process');
const browserSync  = require('browser-sync').create();

const gulp         = require('gulp');
const jekyll       = require('gulp-jekyll');
const sass         = require('gulp-sass');
const pug          = require('gulp-pug');
const prefix       = require('gulp-autoprefixer');
const prettify     = require('gulp-prettify');
const concat       = require('gulp-concat');
const cssnano      = require('gulp-cssnano');
const uglify       = require('gulp-uglify');
const ghdeploy     = require('gulp-gh-pages');
const log          = require('fancy-log');

const siteRoot     = './_site';
const pugFiles_s   = './code/_pug/**/*.pug';
const pugFiles_o   = '_includes';
const htmlFiles    = ['./index.html', './_layouts/*.html','./sources/*.html', './_includes/*'];
const sassFiles_s  = ['./code/_sass/*','code/_sass/**/*'];
const sassFolder   = './code/_sass';
const cssFiles_s   = ['./code/css/*.scss'];
const cssFiles_o   = 'code/css';
const jsFiles_s    = ['./code/_js/*.js'];
const jsFiles_o    = 'code/js';
const jsScriptFile = 'scripts.js';
const dataFiles    = '_data/**/*.yml';
const deployFolder =  "./_site/**/*"

const messages = {
  jekyllDev: 'Running: $ jekyll build for dev',
  jekyllProd: 'Running: $ jekyll build for prod'
};

////////////////////////////////////////////////////////////////////////////////

gulp.task('sass', function sassDev() {
  return gulp.src(cssFiles_s)
    .pipe(sass({
      includePaths: sassFolder,
      onError:      browserSync.notify
    }))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest(siteRoot+'/'+cssFiles_o))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('./'+cssFiles_o));
});

gulp.task('sass-prod', function sassProd() {
  return gulp.src(cssFiles_s)
    .pipe(sass({
      includePaths: sassFolder,
      onError:      browserSync.notify
    }))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(cssnano())
    .pipe(gulp.dest(siteRoot+'/'+cssFiles_o))
    .pipe(gulp.dest('./'+cssFiles_o));
});

//

gulp.task('scripts', function scriptsDev() {
  return gulp.src(jsFiles_s)
    .pipe(concat(jsScriptFile))
    .pipe(gulp.dest(siteRoot+'/'+jsFiles_o))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('./'+jsFiles_o));
});

gulp.task('scripts-prod', function scriptsProd() {
  return gulp.src(jsFiles_s)
    .pipe(concat(jsScriptFile))
    .pipe(uglify())
    .pipe(gulp.dest(siteRoot+'/'+jsFiles_o))
    .pipe(gulp.dest('./'+jsFiles_o));
});

//

gulp.task('pug', function pugDev() {
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

gulp.task('jekyll-dev', function jekyllDev(done) {
  browserSync.notify(messages.jekyllDev);
  cp.spawn('jekyll.bat', ['build',
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

gulp.task('jekyll-prod', function jekyllProd(done) {
  browserSync.notify(messages.jekyllProd);
  cp.spawn('jekyll.bat', ['build'], {stdio: 'inherit'});
  done();
});

gulp.task('jekyll-rebuild', gulp.series('jekyll-dev', function jekyllRebuild() {
  browserSync.reload();
}));

////////////////////////////////////////////////////////////////////////////////

gulp.task('browser-sync', gulp.series('sass', 'scripts', 'pug', 'jekyll-dev', function sync() {
  browserSync.init({
    files: siteRoot+'/**',
    port: 4000,
    server: {
      baseDir: siteRoot
    },
    notify: false,
    require : [ 'jquery-browserify', 'jquery-mousewheel' ]
  });
}));

gulp.task('watch', function watch() {
  gulp.watch(sassFiles_s, gulp.series('sass'));
  gulp.watch(jsFiles_s, gulp.series('scripts'));
  gulp.watch(pugFiles_s, gulp.series('pug', 'jekyll-rebuild'));
  gulp.watch(htmlFiles, gulp.series('jekyll-rebuild'));
  gulp.watch(dataFiles, gulp.series('jekyll-rebuild'));
});

////////////////////////////////////////////////////////////////////////////////

gulp.task('default', gulp.series('browser-sync', 'watch'));

gulp.task('build', gulp.series('scripts-prod', 'sass-prod', 'pug-prod', 'jekyll-prod'));

gulp.task('deploy', gulp.series('build', function deploy() {
  return gulp.src(deployFolder)
    .pipe(ghdeploy())
}));
