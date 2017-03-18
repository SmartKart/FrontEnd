module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "browser": true
    },
    "ecmaFeatures": {
        "modules": true,
        "spread" : true,
        "restParams" : true,
        "jsx": true
    },
    "plugins": [
       "react"
    ],
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "rules": {
        "eqeqeq": [
            1,
            "always"
        ],
        "indent": [
            1,
            4,
            {
                "SwitchCase": 1
            }
        ],
        "linebreak-style": [
            1,
            "unix"
        ],
        "no-console": [
            0
        ],
        "quotes": [
            1,
            "single",
            {
                "allowTemplateLiterals": true
            }
        ],
        "semi": [
            1,
            "always"
        ],
        "react/prop-types": 0
    },
    "parserOptions": {
        "ecmaVersion": 7,
        "sourceType": "module",
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        }
    }
};
