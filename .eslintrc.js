module.exports = {
  "extends": "standard",
  "env": {
    "node": true
  },
  // Custom rules
  "rules": {
    "semi": ["error", "always"],
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "ignore"
    }]
  }
};
