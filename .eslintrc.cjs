module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended"
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json"
  },
  plugins: [
    "vue"
  ],
  rules: {
    quotes: ["warn", "double"]
  }
}
