// .eslintrc.js
module.exports = {
    //....
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "prettier/prettier": ['error', {
            singleQuote: true,
            semi: true,
            useTabs: true,
            tabWidth: 2,
            trailingComma: 'all',
            printWidth: 80,
            bracketSpacing: true,
            arrowParens: 'avoid',
        }]
    }
}
