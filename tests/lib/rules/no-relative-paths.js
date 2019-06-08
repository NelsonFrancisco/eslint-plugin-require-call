/**
 * @fileoverview No relative paths in require
 * @author NelsonFrancisco
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require(`../../../lib/rules/no-relative-paths`),
  RuleTester = require(`eslint`).RuleTester


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester()
const relativePathMessage = `Require with relative paths symbols`
const localPathMessage = `Require with local path symbol and option 'allowLocalSymbol' to false`
const type = `CallExpression`
const allowLocalSymbol = [{allowLocalSymbol:true}]

ruleTester.run(`no-relative-paths`, rule, {

  valid: [
    {
      code: `var module = require('src/module')`
    },{
      code: `require('src/module')`
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
    },
  ],

  invalid: [
    {
      code: `var module = require('../src/module')`,
      errors: [{
        message: relativePathMessage,
        type
      }]
    },{
      code: `require('../src/module')`,
      errors: [{
        message: relativePathMessage,
        type
      }]
    },{
      code: `require('src/../module')`,
      errors: [{
        message: relativePathMessage,
        type
      }]
    },{
      code: `call('../', require('../module'))`,
      errors: [{
        message: relativePathMessage,
        type
      }]
    },
    {
      code: `call('../', require('../src/module'))`,
      errors: [{
        message: relativePathMessage,
        type
      }],
      options: allowLocalSymbol
    },{
      code: `require('./src/module')`,
      errors: [{
        message: localPathMessage,
        type
      }],
    },{
      code: `require('src/module', '../module')`,
      errors: [{
        message: relativePathMessage,
        type
      }]
    },{
      code: `require('src/module', './module')`,
      errors: [{
        message: localPathMessage,
        type
      }],
    },
  ]
})
