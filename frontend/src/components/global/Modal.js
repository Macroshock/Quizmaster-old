import React from 'react'
import './Modal.css'
import Backdrop from './Backdrop.js'

function Modal(props) {

  return (
    <React.Fragment>
      {props.isActive &&
        <div>
          <Backdrop/>
          <div className='modal'>
            <header className='modal-header'><h1>{props.title}</h1></header>
            <section className='modal-content'>
              {props.children}
            </section>
            <section className='modal-actions'>
              {props.onCancel && <button className='modal-btn-cancel' onClick={props.onCancel}>Cancel</button>}
              {props.onConfirm && <button className='modal-btn-confirm' onClick={props.onConfirm}>Confirm</button>}
            </section>
          </div>
        </div>
      }
    </React.Fragment>
  )
  
}

export default Modal
