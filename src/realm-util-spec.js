'use strict'
/* global describe, it */

const throwsError = fn => {
  var pass = false
  try {
    fn()
  } catch (e) {
    pass = true
  }
  return pass
}

describe('named', () => {
  const realmUtil = require('.')
  it("errors without the 'name' property ", () => {
    console.assert(
      throwsError(() => {
        realmUtil.named()
      }),
      'At least one parameter is required'
    )
  })
  it("gets the 'name' property", () => {
    class MyClass {}
    console.assert(
      realmUtil.named(MyClass) === 'MyClass',
      'Incorrect name returned'
    )
  })
})
describe('withSchema', () => {
  const realmUtil = require('.')
  it('throws errors', function () {
    class User {}
    console.assert(
      throwsError(() => realmUtil.withSchema()),
      'when no class/function to decorate is provided'
    )
    console.assert(
      throwsError(() => realmUtil.withSchema(User)),
      'when no schema is provided'
    )
  })
  it('decorates the class with a schema', () => {
    class User {}

    const decoratedUser = realmUtil.withSchema(User, {
      properties: {
        name: { type: 'string' },
        documents: { type: 'list', objectType: 'Document' }
      }
    })
    console.assert(decoratedUser.schema.name === 'User')
    console.assert(decoratedUser.schema.properties.name.type === 'string')
    console.assert(
      decoratedUser.schema.properties.documents.objectType === 'Document'
    )
    console.assert(decoratedUser.schema.properties.documents.type === 'list')
  })
})
