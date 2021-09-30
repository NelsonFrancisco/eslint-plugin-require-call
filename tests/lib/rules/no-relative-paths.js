/**
 * @fileoverview No relative paths in 'require' and 'import'
 * @author NelsonFrancisco
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

//oh the irony
var rule = require(`../../../lib/rules/no-relative-paths`),
  RuleTester = require(`eslint`).RuleTester


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2020, sourceType: `module`, } })
const relativePathMessage = `Require with relative paths symbols`
const localPathMessage = `Require with local path symbol and option 'allowLocalSymbol' to false`
const callExpressionErrorType = `CallExpression`
const importDeclarationErrorType = `ImportDeclaration`
const importExpressionErrorType = `ImportExpression`
const allowLocalSymbol = [{allowLocalSymbol:true}]

ruleTester.run(`no-relative-paths`, rule, {
  valid: [
    {
      code: `var module = require('src/module')`
    },{
      code: `require('src/module')`
    },{
      code: `require(module)`
    },{
      code: `call('../', require('module'))`
    },{
      code: `call('../', require('./src/module'))`,
      options: allowLocalSymbol
    },{
      code: `require('./src/module')`,
      options: [{
        allowLocalSymbol: true
      }]
    },{
      code: `require('src/module', './module')`,
      options: allowLocalSymbol
    },{
      code: `import foo from 'foo'`,
    },{
      code: `import 'foo'`,
    },{
      code: `import './foo'`,
      options: allowLocalSymbol
    },{
      code: `import * as stuff from 'foo'`,
    },{
      code: `import {stuff} from 'foo'`,
    },{
      code: `import (foo)`,
    },{
      code: `import ('module')`,
    },{
      code: `import ('./foo')`,
      options: allowLocalSymbol
    },{
      code: `const {stuff} = import ('foo')`,
    },
  ],
  invalid: [
    {
      code: `var module = require('../src/module')`,
      errors: [{
        message: relativePathMessage,
        type: callExpressionErrorType
      }]
    },{
      code: `require('../src/module')`,
      errors: [{
        message: relativePathMessage,
        type: callExpressionErrorType
      }]
    },{
      code: `require('src/../module')`,
      errors: [{
        message: relativePathMessage,
        type: callExpressionErrorType
      }]
    },{
      code: `call('../', require('../module'))`,
      errors: [{
        message: relativePathMessage,
        type: callExpressionErrorType
      }]
    },
    {
      code: `call('../', require('../src/module'))`,
      errors: [{
        message: relativePathMessage,
        type: callExpressionErrorType
      }],
      options: allowLocalSymbol
    },{
      code: `require('./src/module')`,
      errors: [{
        message: localPathMessage,
        type: callExpressionErrorType
      }],
    },{
      code: `require('src/module', '../module')`,
      errors: [{
        message: relativePathMessage,
        type: callExpressionErrorType
      }]
    },{
      code: `require('src/module', './module')`,
      errors: [{
        message: localPathMessage,
        type: callExpressionErrorType
      }],
    },{
      code: `import '../module'`,
      errors: [{
        message: relativePathMessage,
        type: importDeclarationErrorType
      }],
    },{
      code: `import foo from '../module'`,
      errors: [{
        message: relativePathMessage,
        type: importDeclarationErrorType
      }],
    },{
      code: `import * as stuff from '../module'`,
      errors: [{
        message: relativePathMessage,
        type: importDeclarationErrorType
      }],
    },{
      code: `import foo from './module'`,
      errors: [{
        message: localPathMessage,
        type: importDeclarationErrorType
      }],
    },{
      code: `import ('../module')`,
      errors: [{
        message: relativePathMessage,
        type: importExpressionErrorType
      }],
    },{
      code: `import ('./module')`,
      errors: [{
        message: localPathMessage,
        type: importExpressionErrorType
      }],
    },{
      code: `const {stuff} = import ('./module')`,
      errors: [{
        message: localPathMessage,
        type: importExpressionErrorType
      }],
    },{
      code: `const {stuff} = import ('../module')`,
      errors: [{
        message: relativePathMessage,
        type: importExpressionErrorType
      }],
      options: allowLocalSymbol
    }
  ],
})
