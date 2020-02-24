const axios = require('axios')
const routing = require('../utils/routing.js')

test('Get users from database', async () => {

  // These are the users that should be retrieved from the get users method
  const users = [
    {"_id":"5e1e97d15758b61ce475d603","name":"Julio","email":"julio@gmail.com","password":"234","role":"admin"},
    {"_id":"5e1e9b1346257b25d8c6a5e2","name":"Jose","email":"jose@gmail.com","password":"2342","role":"user"},
    {"_id":"5e1e9c3710a3781e703280bc","name":"Jorge","email":"jorge@gmail.com","password":"2343","role":"user"}
  ]

  let res

  try {
    res = await axios.get(routing.toRoute('users'))
  } catch(err) {
    console.log(err)
    throw new Error('Failed to fetch get request.')
  }

  expect(res.status).toBe(200)
  expect(res.data).toStrictEqual(users)

})

test('Get a single user from the database', async () => {

  // This is the user that should be retrieved
  const user = {"_id":"5e1e97d15758b61ce475d603","name":"Julio","email":"julio@gmail.com","password":"234","role":"admin"}

  let res

  try {
    res = await axios.get(routing.toRoute('users/julio@gmail.com'))
  } catch(err) {
    console.log(err)
    throw new Error('Failed to fetch get request.')
  }

  expect(res.status).toBe(200)
  expect(res.data).toStrictEqual(user)

})

test('Create a user', async () => {

  const user = {"name":"Juan","email":"juan@gmail.com","password":"345","role":"user"}

  let res

  try {
    res = await axios.post(routing.toRoute('users/'), user)
  } catch(err) {
    console.log(err)
    throw new Error('Failed to fetch post request.')
  }

  expect(res.status).toBe(201)

  try {
    res = await axios.get(routing.toRoute('users/juan@gmail.com'))
  } catch(err) {
    console.log(err)
    throw new Error('Failed to fetch get request.')
  }

  expect(res.status).toBe(200)
  delete res.data._id
  expect(res.data).toStrictEqual(user)

})

test('Update a user', async () => {

  const user = {"name":"Jose"}

  let res

  try {
    res = await axios.patch(routing.toRoute('users/juan@gmail.com'), user)
  } catch(err) {
    console.log(err)
    throw new Error('Failed to fetch patch request.')
  }

  expect(res.status).toBe(200)

  try {
    res = await axios.get(routing.toRoute('users/juan@gmail.com'))
  } catch(err) {
    console.log(err)
    throw new Error('Failed to fetch get request.')
  }

  expect(res.status).toBe(200)
  expect(res.data.name).toStrictEqual(user.name)
  
})

test('Delete a user', async () => {

  let res

  try {
    res = await axios.delete(routing.toRoute('users/juan@gmail.com'))
  } catch(err) {
    console.log(err)
    throw new Error('Failed to fetch delete request.')
  }

  expect(res.status).toBe(204)

  try {
    res = await axios.get(routing.toRoute('users/juan@gmail.com'))
  } catch(err) {
    // This one is actually supposed to fail
    expect(err.response.status).toBe(404)
  }
  
})
