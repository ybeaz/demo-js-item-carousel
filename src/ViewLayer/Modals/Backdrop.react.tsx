import React from 'react'

import { CommonContainer } from '../Containers/CommonContainer.react'

import './Backdrop.less'

interface Props {
  readonly sid?: string,
  readonly display: boolean,
}

const defaultProps: Props = {
  sid: '',
  display: false,
}

const BackdropModal: React.SFC<Props> = (propsInput: Props): JSX.Element => {
  const props = { ...defaultProps, ...propsInput }
  const { display, sid } = props
  
  const getDisplayClass: Function = (status: boolean): string => {

    let displayClass = 'ModalBackdrop__hide'
    if (status) {
      displayClass = 'ModalBackdrop__show'
    }

    return displayClass
  }

  const modalClass = getDisplayClass(display)

  return (
    <div className={`ModalBackdrop ModalBackdrop_${sid} ${modalClass}`} />
  )
}

export default CommonContainer(BackdropModal)

