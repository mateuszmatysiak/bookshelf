import {Dialog} from './lib'
import React from 'react'

const ModalContext = React.createContext()

function Modal(props) {
  const [isOpen, setIsOpen] = React.useState(false)

  return <ModalContext.Provider value={{isOpen, setIsOpen}} {...props} />
}

function ModalDismissButton({children: child}) {
  const {setIsOpen} = React.useContext(ModalContext)

  const onClose = () => setIsOpen(false)

  return React.cloneElement(child, {onClick: onClose})
}

function ModalOpenButton({children: child}) {
  const {setIsOpen} = React.useContext(ModalContext)

  const onOpen = () => setIsOpen(true)

  return React.cloneElement(child, {onClick: onOpen})
}

function ModalContents(props) {
  const {isOpen, setIsOpen} = React.useContext(ModalContext)

  const onClose = () => setIsOpen(false)

  return <Dialog isOpen={isOpen} onDismiss={onClose} {...props} />
}

export {Modal, ModalContents, ModalDismissButton, ModalOpenButton}
