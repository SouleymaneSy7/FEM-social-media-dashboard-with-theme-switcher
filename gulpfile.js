// Initialisation des Packages Gulp
const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const browserSync = require("browser-sync").create();

// Taches SASS
function scssTask() {
  return src("./src/Sass/**/*.scss", { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest("build/css", { sourcemaps: "." }));
}

// Taches Javascript
function jsTask() {
  return src("./src/Js/*.js", { sourcemaps: true })
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(terser())
    .pipe(dest("build/js", { sourcemaps: "." }));
}

// Créer un Serveur Browser-Sync
function browserSyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: ".",
    },
    notify: {
      styles: {
        top: "auto",
        bottom: 0,
      },
    },
  });

  cb();
}

// Récharger Avec Browser-Sync
function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}

// Watch
function watchTask() {
  watch("*.html", browserSyncReload);
  watch(
    ["src/Sass/*.scss", "src/Js/*.js"],
    series(scssTask, jsTask, browserSyncReload)
  );
}

// Taches par défauts de Gulp
exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);
