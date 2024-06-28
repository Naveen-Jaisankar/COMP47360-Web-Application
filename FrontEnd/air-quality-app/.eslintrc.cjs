module.exports = {
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "plugins": ["react"],
  "env": {
    "browser": true,
    "es2021": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": "warn"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
};
