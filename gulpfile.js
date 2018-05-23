const gulp = require('gulp');
const shell = require('shelljs');
const watch = require('gulp-watch');
const sequence = require('run-sequence');

// prettier-ignore
const talks = [
  '00-js-intro',
  '01-react-basics',
  '02-routing',
  '03-async',
  '04-redux.md'
];

gulp.task('pretalks', done => {
  talks.forEach(x => {
    shell.exec(`mkdirp dist/${x}`);
  });
  done();
});

gulp.task('talks', ['pretalks'], done => {
  talks.forEach(x => {
    shell.exec(`cleaver talks/${x}.md --output dist/${x}/index.html`);
  })
  done();
});


gulp.task('watch', ['build'], () => {
  watch(['talks/**/*.{md,css}'], () => {
    gulp.start('build');
  });
});

gulp.task('build', done => {
  sequence(
    'talks',
    done,
  );
});

gulp.task('default', ['watch']);
