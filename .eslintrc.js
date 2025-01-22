module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/react",
    ],
    plugins: ["import"],
    rules: {
        "import/prefer-default-export": "warn", // or "error"
    },
};
