module.exports = {
    "env": {
        "browser": true,
        "node": true
    },
    "extends": "airbnb",
    "rules": {
        "import/no-cycle": false,
        "no-underscore-dangle": 0,
        "react/prop-types": 0,
        "jsx-a11y/anchor-is-valid": [ "error", {
            "components": [ "Link" ],
            "specialLink": [ "to" ]
        }],
        "jsx-a11y/label-has-for": 0,
        "comma-dangle": ["error", {
            "arrays": "ignore",
            "objects": "ignore",
            "imports": "ignore",
            "exports": "ignore",
            "functions": "ignore"
        }],
        "react/no-children-prop": false,
    },
    "globals": {
        "fetch": false,
        "document": false
    }
};