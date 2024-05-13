/**
 * This is a function.
 *
 * @param {string} n - A string param
 * @param {string} [o] - A optional string param
 * @param {string} [d=DefaultValue] - A optional string param
 * @return {string} A good string
 *
 * @example
 *
 *     foo('hello')
 */

function foo(n, o, d) {
  return n
}

/**
 * Generate a book description.
 *
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 *
 * @returns {string} Description of the book.
 * @throws An error if values are not set.
 */
function Book(title, author) {
  if (!title || !author) {
    throw new Error('title and author must be set');
  }
  
  return `${title} by ${author}`;
}

/**
 * @param {Bar} x
 */

function test(x) {}

/**
 * @type {number}
 */
var FOO = 1
