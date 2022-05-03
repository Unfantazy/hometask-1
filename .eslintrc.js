// eslint-disable-next-line no-undef
module.exports = {
    "plugins": ["@typescript-eslint"],
    "extends": [
        "plugin:@typescript-eslint/recommended",
    ],
    "env": {
        "browser": true,
        "es2021": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": "latest",
        "project": "./tsconfig.json",
    },
    "rules": {
        "no-console": 2,
        "semi": ["error", "never"],
        "quotes": ["error", "single"],
        "max-lines": ["error", { "max": 200, "skipBlankLines": true, "skipComments": true }],
        "no-var": "error",
        "indent": "error",
        "no-multi-spaces": "error",
        "space-in-parens": "error",
        "no-multiple-empty-lines": "error",
        "prefer-const": "warning",
        "no-use-before-define": "error",
        "object-curly-spacing": ["error", "always"]
    },

};
