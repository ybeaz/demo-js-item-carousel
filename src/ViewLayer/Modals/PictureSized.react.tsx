import React from 'react'

import * as Interfaces from '../../Shared/interfaces'
import { CommonContainer } from '../Containers/CommonContainer.react'
import { Carousel } from '../Components/Carousel.react'

interface Props {
  readonly sid: string, 
  readonly capture: string,
  readonly listArr: any,
  readonly handleActions: Function,
  readonly reduxState: any,
}
interface State {

}

const defaultProps = {
  sid: '',
  capture: '',
  listArr: [],
}

export const PictureSizedModal: React.SFC<Props> = (inputProps: Props): JSX.Element => {
  // ************ DEFAULT VALUES ************
  const props = { ...defaultProps, ...inputProps }


  // ************ LIFECYCLE METHODS ************


  // ************ FUNCTIONS ************
  const getDisplayClass: Function = (status: boolean): string => {

    let displayClass = 'Modal__hide'
    if (status) {
      displayClass = 'Modal__show'
    }

    return displayClass
  }

  // ************ EVENT HANDLERS ************
  const handleEvents: Function = (e: any, action: any): void => {

  }

  // ************ RENDER SECTION ************
  const {
    reduxState, sid, capture, handleActions, listArr
  } = props
  const { modalWindows } = reduxState
  const { display } = modalWindows
  const modalClass = getDisplayClass(display)
  const action = { type: 'CLOSE_MODAL_IMG_SIZED' }

  const carouselProps: any = { listArr, isCaptureDisplayed: false }

  // console.info('PictureSized [10]', { carouselProps, props })

  return (
    <div className={`Modal Modal_${sid} ${modalClass}`}>
      <div className='Modal__dialog'>
        <div className='Modal__content'>
          <div
            className='Modal__upperLeftCloseButton'
            onClickCapture={(e: React.FormEvent<HTMLDivElement>) =>
              handleActions(e, action)}
          >
            <i className='fas fa-times' />
          </div>

          {/* <!-- Modal Header --> */}
          <div className='Modal__header'>
            {/*
              <h4 className='Modal__title'>
                {'capture'}
              </h4>
            */}
          </div>
          
          {/* <!-- Modal body --> */}
          <div className='Modal__body'>
            <div className='Modal__message'>
              <Carousel {...carouselProps} />
            </div>

          </div>

          {/* <!-- Modal footer -->
          <div className='Modal__footer'>
            <button
              type='button'
              className='Modal__footerButton'
              onClickCapture={(e: React.FormEvent<HTMLButtonElement>) =>
                handleActions(e, action)}
            >
              Close
            </button>
          </div>
          */}
        </div>
      </div>
    </div>
  )
}

export const PictureSized: any = CommonContainer(PictureSizedModal)
