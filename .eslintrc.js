module.exports = {
    "extends": "airbnb",
    "rules": {
        "react/prop-types": 0,
        "jsx-a11y/anchor-is-valid": [ "error", {
            "components": [ "Link" ],
            "specialLink": [ "to" ]
        }],
        "jsx-a11y/label-has-for": [ 2, {
            "components": [ "Label" ],
            "required": {
                "some": [ "nesting", "id" ]
            },
            "allowChildren": false
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