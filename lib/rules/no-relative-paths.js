/**
 * @fileoverview No relative paths in require
 * @author NelsonFrancisco
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: `No relative paths in 'require' and 'import'`,
      category: `Best Practices`,
      recommended: false
    },
    fixable: null,  // or "code" or "whitespace"
    schema: [
      {
        type: `object`,
        properties: {
          allowLocalSymbol: {
            type: `boolean`,
            default: false
          }
        },
        additionalProperties: false
      }
    ]
  },

  create: function(context) {
    const configuration = context.options[0] || {}
    const options = {
      allowLocalSymbol: configuration.allowLocalSymbol || false
    }
    const relativePathMessage = `Require with relative paths symbols`
    const localPathMessage = `Require with local path symbol and option 'allowLocalSymbol' to false`
      
    function importCheck(node){
      const source = node.source
      if (source.type !== `Literal`) {
        return
      }
      const value = source.value
      if (value.includes(`../`)) {
        context.report(node, relativePathMessage)
      } else if (value.includes(`./`) && !options.allowLocalSymbol) {
        context.report(node, localPathMessage)
      }
    }

    return {
      CallExpression: function(node) {
        const callee = node.callee
        if (callee.name !== `require`) {
          return
        }
        const callArguments = node.arguments
        for (const argument of callArguments) {
          if (argument.type !== `Literal` || typeof argument.value !== `string`) {
            continue
          }
          if (argument.value.includes(`../`)) {
            context.report(node, relativePathMessage)
          } else if (argument.value.includes(`./`) && !options.allowLocalSymbol) {
            context.report(node, localPathMessage)
          }
        }
      },
      ImportDeclaration: importCheck,
      ImportExpression: importCheck,
    }
  }
}
