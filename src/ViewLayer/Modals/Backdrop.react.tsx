import React from 'react'

import { CommonContainer } from '../Containers/CommonContainer.react'

interface Props {
  readonly sid?: string,
  readonly reduxState: any,
}

const defaultProps: Props = {
  sid: '',
  reduxState: {},
}

const BackdropModal: React.SFC<Props> = (props: Props): JSX.Element => {
  const propsPrivate: Props = { ...defaultProps, ...props }
  const { reduxState, sid } = propsPrivate
  const { modalWindows } = reduxState
  const { display } = modalWindows
  
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

export const Backdrop: any = CommonContainer(BackdropModal)

