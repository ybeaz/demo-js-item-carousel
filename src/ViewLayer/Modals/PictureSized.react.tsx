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

// eslint-disable-next-line react/prefer-stateless-function
export class PictureSizedModal extends React.PureComponent<Props, State> {
  public static defaultProps = {
  }

  constructor(props) {
    super(props)
  }

  public getDisplayClass: Function = (status: boolean): string => {

    let displayClass = 'd_n'
    if (status) {
      displayClass = 'd_i_f'
    }

    return displayClass
  }

  public render(): JSX.Element {
    const {
      reduxState, sid, capture, handleActions, listArr
    } = this.props
    const { modalWindows } = reduxState
    const { display } = modalWindows
    const modalClass = this.getDisplayClass(display)
    const action = { type: 'CLOSE_MODAL_IMG_SIZED' }

    const carouselProps: any = { listArr }

    // console.info('PictureSized [10]', { carouselProps, props: this.props })

    return (
      <div className={`Modal Modal_${sid} ${modalClass}`}>
        <div className='Modal__dialog'>
          <div className='modal__content'>

            {/* <!-- Modal Header --> */}
            <div className='Modal__header'>
              {/*
                <h4 className='Modal__title'>
                  {'capture'}
                </h4>
              */}
              <button
                type='button'
                className='close Modal__upperLeftCloseButton'
                onClickCapture={(e: React.FormEvent<HTMLButtonElement>) =>
                  handleActions(e, action)}
              >
                &times;
              </button>
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
}

export const PictureSized: any = CommonContainer(PictureSizedModal)
