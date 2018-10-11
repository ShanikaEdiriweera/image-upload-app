const test = require('ava')
const { dependencies, devDependencies } = require('../package.json')
const dropModules = ['babel-cli']
const isDropped = module => !dropModules.includes(module)

/*
    Tests that all modules load.
    Add dependecies without exports to dropModules list
*/

test('basic check', t => {
  t.true(true, 'ava works ok')
})

Object.keys(dependencies).filter(isDropped).forEach(dependency => {
  test(`${dependency} loads ok`, t => {
    const module = require(dependency)
    t.truthy(module)
  })
})

Object.keys(devDependencies).filter(isDropped).forEach(dependency => {
  test(`${dependency} loads ok`, t => {
    const module = require(dependency)
    t.truthy(module)
  })
})