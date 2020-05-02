import React, { useState, useCallback } from 'react'
import Modal from '../global/Modal.js'

function LogInModal (props) {

  const [modalMessage, setModalMessage] = useState('')
  const [modalMType, setModalMType] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const displayMessage = useCallback((message, type) => {
    setModalMessage(message)
    type ? setModalMType(type) : setModalMType('')
  })

  const logInModalConfirm = useCallback(() => {
    displayMessage('')

    fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(async res => {
      let data = await res.json()

      if (res.ok) {
        displayMessage('')
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
    <Modal title="Log In" isActive={props.isActive} onConfirm={logInModalConfirm} onCancel={modalCancel}>
      <form className="form-login">
        <div>
          <label htmlFor="login-input-email">Email</label>
          <input id="login-input-email" name="loginEmail" 
            type="email" onChange={e => setEmail(e.target.value)}></input>
        </div>
        <div>
          <label htmlFor="login-input-password">Password</label>
          <input id="login-input-password" name="loginPassword" type="password" 
            onChange={e => setPassword(e.target.value)}></input>
        </div>
        <p className={`message ${modalMType}`}>{modalMessage}</p>
      </form>
    </Modal>
  )
  
}

export default LogInModal
