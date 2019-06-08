# No relative paths in require (no-relative-paths)

My colleagues and I were working on a nodejs project, and we found some inconsistencies in `require` function call. So I decided to make this rule.



## Rule Details

This rule aims to report inconsistencies for those who want only absolute paths in their projects' `require` function call

**no auto fix**

Examples of **incorrect** code for this rule:

```js

const module = require('../module') //example 1
const module = require('./module') //example 2

call(require('./module')) //example 3
call('../', require('../module')) //example 4

```

Examples of **correct** code for this rule:

```js

const module = require('module')
const module = require('src/module')

call(require('module'))
call('../', require('src/module'))

```

### Options

allowLocalSymbol:
Boolean option. If set to true, then previous examples 2 and 3 are valid.


Comes in handy when you want to refer to local files

## When Not To Use It

When you want relative paths to be possible in your requires.
