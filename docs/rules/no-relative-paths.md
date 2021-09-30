# No relative paths in require (no-relative-paths)

My colleagues and I were working on a nodejs project, and we found some inconsistencies in `require` function call. So I decided to make this rule.


## Rule Details

This rule aims to report inconsistencies for those who want only absolute paths in their projects' `require` function call and `import` statements

**no auto fix**

Examples of **incorrect** code for this rule:

```js

const module = require('../module') //example 1
const module = require('./module') //example 2

call(require('./module')) //example 3
call('../', require('../module')) //example 4

const module = import('../module') //example 5
import('./module') //example 6

import { foo } from '../module' //example 7
import * as foo from './module' //example 8

```

Examples of **correct** code for this rule:

```js

const module = require('module') //example 9
const module = require('src/module') //example 10

call(require('module')) //example 11
call('../', require('src/module')) //example 12

const module = import('module') //example 13
import('src/module') //example 14

import { foo } from 'src/module' //example 15
import * as foo from 'src/module' //example 16

```

### Options

allowLocalSymbol:
Boolean option. If set to true, then previous examples 2, 3, 6 and 8 are valid.


Comes in handy when you want to refer to local files

## When Not To Use It

When you want relative paths to be possible in your requires.
