var j = require('jski');

module.exports = j.object({

  firstname:    j.string().minLength(2),
  lastname:     j.string().minLength(2),
  email:        j.string().minLength(6).format('email'),
  age:          j.integer().minimum(1).maximum(120),
  password:     j.string().minLength(6)

}).required('firstname', 'lastname', 'email', 'age', 'password');