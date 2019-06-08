# eslint-plugin-require-call

ESLint plugin to help you with `require` function call


## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-require-call`:

```
$ npm install eslint-plugin-require-call --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-module-requires` globally.

## Usage

Add `module-requires` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "require-call"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "require-call/rule-name": 2
    }
}
```

## Supported Rules

* [no-relative-paths](docs/rules/no-relative-paths.md)





