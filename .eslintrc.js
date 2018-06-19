module.exports = {
    "extends": "airbnb",
    "rules": {
        "react/prop-types": 0,
        "jsx-a11y/anchor-is-valid": [ "error", {
            "components": [ "Link" ],
            "specialLink": [ "to" ]
        }],
        "comma-dangle": ["error", {
            "arrays": "ignore",
            "objects": "ignore",
            "imports": "ignore",
            "exports": "ignore",
            "functions": "ignore"
        }]
    },
    "globals": { "fetch": false }
};