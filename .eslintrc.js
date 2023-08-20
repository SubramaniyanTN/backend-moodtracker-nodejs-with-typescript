module.exports ={
    "env": {
        "es2021": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "airbnb-base",
        "plugin:@prettier/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import'/typescript",
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        ecmaversion:12,
        sourceType:"module"
    },
    "plugins": [
        "@typescript-eslint",
        "import",
        "prettier"
    ],
    "rules": {
        "prettier/prettier": "error",
        "import/extensions": "off",
        "no-console": "off",
        "import/order":[
            "error",
            {
                "newlines-between":"never",
                groups:[
                    ['builtin','external'],
                    ['internal','parent','sibling','index']
                ]
            }
        ]
    },
    "settings": {
        "import/resolver": {
            "typescript": {
                "alwaysTryTypes": true,
                "project": "./tsconfig.json"
            }
        }
    }
}