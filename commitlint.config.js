const Configuration = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'subject-case': [
      2,
      'always',
      [
        'sentence-case',
        'start-case',
        'pascal-case',
        'upper-case',
        'lower-case',
      ],
    ],
    'type-enum': [
      2,
      'always',
      [
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'refactor',
        'revert',
        'style',
        'test',
        'deps',
      ],
    ],
  },
};

module.exports = Configuration;
