/**
 * @jest-environment jsdom
 */

const { openPopup, closePopup, addInput, deleteInput } = require('../assets/scripts/+_button_selcted_project_page.js')
const ele1 = document.createElement('div')
const ele2 = document.createElement('div')
const container = document.createElement('div')
const container2 = document.createElement('div')
const button = document.createElement('button')
ele1.setAttribute('id', 'test1')
ele2.setAttribute('id', 'test2')
container.setAttribute('id', 'inputcontainer')
container2.setAttribute('id', 'inputcontainer2')
container2.appendChild(button)
document.body.appendChild(ele1)
document.body.appendChild(ele2)
document.body.appendChild(container)
document.body.appendChild(container2)

describe('Testing openPopup...', () => {
  openPopup('test1')
  test('Testing style of element to be \'block\'...', () => {
    expect(ele1.style.display).toEqual('block')
  })
})

describe('Testing closePopup...', () => {
  closePopup('test2')
  test('Testing style of element to be \'none\'...', () => {
    expect(ele2.style.display).toEqual('none')
  })
})

describe('Testing addInput and deleteInput...', () => {
  addInput(1)
  test('Testing if any node is added...', () => {
    expect(container.hasChildNodes()).toEqual(true)
  })
  const inputGroup = container.childNodes[0]
  test('Testing if inputGroup is added...', () => {
    expect(inputGroup.classList[0]).toEqual('input-group')
  })
  const inputField = inputGroup.childNodes
  test('Testing if input field is added...', () => {
    expect(inputField.length).toEqual(2)
  })
  test('Testing if submit button is added...', () => {
    expect(inputField[1].innerText).toEqual('Delete')
  })
  deleteInput(button)
  test('Testing deleting input group...', () => {
    expect(document.querySelector('#inputcontainer2')).toEqual(null)
  })
})
