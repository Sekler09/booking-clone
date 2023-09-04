module.exports = {
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],

  plugins: ['react', 'cypress', 'simple-import-sort'],

  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['src', './src'],
          ['assets', './src/assets'],
          ['components', './src/components'],
          ['pages', './src/pages'],
          ['routes', './src/routes'],
          ['store', './src/store'],
          ['styles', './src/styles'],
          ['utils', './src/utils'],
        ],
        extensions: ['.js', '.jsx'],
      },
    },
  },

  env: {
    browser: true,
    es2021: true,
    'cypress/globals': true,
  },

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },

  overrides: [
    {
      files: ['*.cy.js'],
      rules: {
        'react/jsx-filename-extension': 'off',
        'react/react-in-jsx-scope': 'off',
      },
    },
    {
      files: ['cypress.config.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'consistent-return': 'off',
        'no-unused-vars': 'off',
      },
    },
    {
      files: ['cypress/support/index.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'import/extensions': 'off',
      },
    },
    {
      files: [
        'cypress/support/commands.js',
        'cypress/support/commandsComponent.js',
      ],
      rules: {
        'react/jsx-filename-extension': 'off',
        'react/react-in-jsx-scope': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/extensions': 'off',
      },
    },
  ],
};
