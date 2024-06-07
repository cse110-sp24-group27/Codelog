/**
 * @jest-environment jsdom
 */

const { openPopup, closePopup } = require('../assets/scripts/+_button_selcted_project_page.js')
let ele1 = document.createElement('div')
let ele2 = document.createElement('div')
ele1.setAttribute('id', 'test1')
ele2.setAttribute('id', 'test2')
document.body.appendChild(ele1)
document.body.appendChild(ele2)

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
