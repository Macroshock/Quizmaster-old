import React, { useState, useCallback } from 'react'
import Modal from '../global/Modal.js'

function SignUpModal (props) {

  const [modalMessage, setModalMessage] = useState('')
  const [modalMType, setModalMType] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const displayMessage = useCallback((message, type) => {
    setModalMessage(message)
    type ? setModalMType(type) : setModalMType('')
  })

  const signUpModalConfirm = useCallback(() => {
    displayMessage('')
  
    if (!name || !email || !password) {
      displayMessage('All fields are required!', 'error')
      return
    }
  
    fetch('http://localhost:8000/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    }).then(async res => {
      let data = await res.json()
  
      if (res.ok) {
        displayMessage('Registered successfully!', 'success')
      } else if (data.message) {
        displayMessage(data.message, 'error')
      } else {
        displayMessage('Input is not valid.', 'error')
      }
    }).catch(err => {
      displayMessage('Server is not responding.', 'error')
    })
  })

  const modalCancel = useCallback(() => {
    // call parent's component onCancel first, to set the modal inactive
    props.onCancel()
    displayMessage('')
  })

  return (
    <Modal title="Sign Up" isActive={props.isActive} onConfirm={signUpModalConfirm} onCancel={modalCancel}>
      <form className="form-signup">
        <div>
          <label htmlFor="signup-input-name">Name</label>
          <input id="signup-input-name" name="signupName" 
            type="text" onChange={e => setName(e.target.value)}></input>
        </div>
        <div>
          <label htmlFor="signup-input-email">Email</label>
          <input id="signup-input-email" name="signupEmail" 
            type="email" onChange={e => setEmail(e.target.value)}></input>
        </div>
        <div>
          <label htmlFor="signup-input-password">Password</label>
          <input id="signup-input-password" name="signupPassword" 
            type="password" onChange={e => setPassword(e.target.value)}></input>
        </div>
        <p className={`message ${modalMType}`}>{modalMessage}</p>
      </form>
    </Modal>
  )
  
}

export default SignUpModal