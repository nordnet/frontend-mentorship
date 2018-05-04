const gulp = require('gulp');
const shell = require('shelljs');
const watch = require('gulp-watch');
const sequence = require('run-sequence');


const additionalMenu = [
  { text: 'Pure UI',          url: 'https://rauchg.com/2015/pure-ui' },
  { text: 'Documentation',    url: 'https://reactjs.org/docs/' },
  { text: 'PropTypes',        url: 'https://reactjs.org/docs/typechecking-with-proptypes.html' },
  { text: 'Create react app', url: 'https://github.com/facebook/create-react-app/' },
  { text: 'github',           url: 'https://github.com/user/repo' },
];

// prettier-ignore
const talks = [
  '00-js-intro',
  '01-react-basics',
  '02-routing',
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
