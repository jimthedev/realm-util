'use strict'
function named (objectWithName) {
  if (!objectWithName || !objectWithName.name) {
    throw new Error(
      'realm-util schema error, named(): The provided class has moved or does not exist.'
    )
  }
  return objectWithName.name
}

function withSchema (classToDecorate, schema) {
  if (!classToDecorate || typeof classToDecorate !== 'function') {
    throw new Error(
      'realm-util schema error, withSchema(): Please provide a class to decorate.'
    )
  }
  if (!schema || typeof schema !== 'object') {
    throw new Error(
      'realm-util schema error, withSchema(): Please provide a schema.'
    )
  }
  classToDecorate.schema = Object.assign(
    { name: named.call(named, classToDecorate) },
    schema
  )
  return classToDecorate
}

const realmUtil = { named, withSchema }

module.exports = realmUtil
