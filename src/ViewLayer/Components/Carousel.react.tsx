import React, { useState, useEffect, useRef } from 'react'
import { Swipeable } from 'react-swipeable'

import * as Interfaces from '../../Shared/interfaces'

interface Props {
  readonly cid: string,
    // component id
  readonly prefix: string,
    // For each prefix styles tree can be created in Carousel.less file
  readonly isCaptureDisplayed: boolean,
    // Allows or forbids displaing capture with images
  readonly isArrowDisplayed: boolean,
    // Allows or bans right, left arrows for listing items
  readonly isIndicatorDisplayed: boolean,
    // Allows or bans underscore indicators for listing items
  readonly isAutoCarousel: any,
    // If it equals number, than it works with number delay automatically
  readonly autoCarouselInterval: number,
    // Interval of changing images in miliseconds
  readonly listArr: any,
    /* Example
      listArr: [
        {
          id: 0,
          capture: 'New York',
          src: 'https://www.w3schools.com/bootstrap4/ny.jpg',
          active: true,
        },
        {
          id: 1,
          capture: 'Chicago',
          src: 'https://www.w3schools.com/bootstrap4/chicago.jpg',
          active: true,
        },
        {
          id: 2,
          capture: 'Los Angeles',
          src: 'https://www.w3schools.com/bootstrap4/la.jpg',
          active: true,
        },
        ...
      ]
    */
  readonly scrollInterval: number,
    // Set the interval of changing the img in miliseconds
  readonly scrollPeriodEnd: number,
    // Set the period withing the images will be changing in miliseconds
}

interface State {
  readonly listArr: any,
  readonly date: any,
}

export interface Carousel {
  preventSwipeTwice: boolean,
  totimeZone: any,
  tickID: any,
}

// Remove
const defaultProps: Props = {
  cid: '',
  prefix: '',
  isCaptureDisplayed: true,
  isArrowDisplayed: true,
  isIndicatorDisplayed: true,
  isAutoCarousel: false,
  autoCarouselInterval: 2000,
  scrollInterval: 500,
  scrollPeriodEnd: 1000,
  listArr: [
    {
      id: 0,
      capture: 'New York',
      src: 'https://www.w3schools.com/bootstrap4/ny.jpg',
      active: true,
    },
    {
      id: 1,
      capture: 'Chicago',
      src: 'https://www.w3schools.com/bootstrap4/chicago.jpg',
      active: true,
    },
    {
      id: 2,
      capture: 'Los Angeles',
      src: 'https://www.w3schools.com/bootstrap4/la.jpg',
      active: true,
    },
  ]
}

export const Carousel : React.SFC<Props> = (inputProps: Props): JSX.Element => {
  const props =  {...defaultProps, ...inputProps }

  // const { listArr: listArrProps } = props
  let tickID
  const totimeZone: Date =	new Date()
  let preventSwipeTwice = false

  const [listArr, setListArr] = useState(props.listArr)
  const [date, setDate] = useState(totimeZone)
  // console.info('Carousel->constructor', { date, listArr, props, defaultProps })
 
  // ************ LIFECYCLE METHODS ************
  function usePrevious(value) {
    const ref = useRef()
    useEffect(() => {
      ref.current = value
    })
    return ref.current
  }

  useEffect(() => {
    const {
      isAutoCarousel,
      autoCarouselInterval,
    } = props

    const actionNextItem: Interfaces.Action = {
      type: 'nextItem',
    }

    if (isAutoCarousel) {
      tickID	=	setInterval(() => handleEvents({}, actionNextItem), autoCarouselInterval)
    }
  }, [])

  const listArrPrevProps = usePrevious(listArr)

  useEffect(() => {

    const { listArr: listArrProps } = props

    if(JSON.stringify(listArrPrevProps) !== JSON.stringify(listArrProps)){
      setListArr(listArrProps)
      // console.info('Carousel->componentDidUpdate() [5]', { listArr, listArrProps, listArrPrevProps }) 
    }
  }, [props.listArr])

  // ************ FUNCTIONS ************
  const indicators: Function = (listArr: any): JSX.Element =>
    listArr.map((item: any, i: number) => {
    const { id, active } = item
    let itemClass: string = 'Carousel__indicator'
    if (active === true) {
      itemClass += ' Carousel__indicator_active'
    }

    const action: Interfaces.Action = {
      type: 'clickIndicator',
      item,
    }

    // console.info('Carousel->carouselRender [3]', { id: item.id, item, pageItemClass, activeItem: activeItem })
    return (
      // tslint:disable-next-line: react-a11y-event-has-role
      <div key={id} className={itemClass}
        // tslint:disable-next-line: react-this-binding-issue
        onClick={(e: any): void => handleEvents(e, action)}
      ></div>
    )
  })

  const imgs: Function = (listArr: any) => listArr.map((item: any, i: number) => {
    const { isCaptureDisplayed } = props
    const { capture, src, active } = item
    let itemClass: string = 'carousel-item Carousel__item transitionPrevDesc'
    if (active === true) {
      itemClass = 'carousel-item Carousel__item transitionNextDesc'
    }

    // console.info('Carousel->carouselRender [5]', { item, pageItemClass, activeItem: activeItem })
    return (
      <div
        key={i}
        className={itemClass}
      >
        {isCaptureDisplayed ? <div className='Carousel__itemCapture'>
          {capture}
        </div>
        : null
        }
        <img
          src={src}
          className='Carousel__itemImg'
          alt={capture}
        />
      </div>
    )
  })

  // ************ EVENT HANDLERS ************
  const handleEvents: Function = (e: any, action: any): void => {

    // console.info('Carousel->handleEvents', { e, listArr, action })
    switch (action.type) {

      case 'onTouchStart':
      {
        alert('We onTap')
        const actionOnTouchStopMove: Interfaces.Action  = {
          type: 'onTouchStopMove',
        }
        handleEvents({}, actionOnTouchStopMove)
      }
      break

      case 'onTouchMove':
      {
        // console.info( 'Carousel->handleEvents() [1]', action)

        if (preventSwipeTwice === false) {
          const { scrollInterval, scrollPeriodEnd } = action
          const actionNextItem: Interfaces.Action  = {
            type: 'nextItem',
          }
          // console.info( 'Carousel->handleEvents() [5]', { delay, action })
          tickID = setInterval(() => handleEvents({}, actionNextItem), scrollInterval)
          preventSwipeTwice = !preventSwipeTwice

          setTimeout(() => {
            clearInterval(tickID)
            preventSwipeTwice = false
          },
          scrollPeriodEnd)
        }

      }
      break

      case 'onTouchStopMove':
      {
        // console.info( 'Carousel->handleEvents() [1]', action)
        clearInterval(tickID);
        preventSwipeTwice = false
      }
      break

      case 'nextItem':
      {
        const index: number = listArr.map((item: any) => item.active)
          .indexOf(true)
        const { length } = listArr
        let indexNext: number = index + 1
        if (index === length - 1) {
          indexNext = 0
        }
        const listArrNext: any = listArr.map((item: any, i: number) => {
          let activeNext: boolean = false
          if (i === indexNext) {
            activeNext = true
          }

          return { ...item, active: activeNext }
        })
        // console.info( 'Carousel->handleEvents() [1]', { listArrNext, listArr, indexNext, index, action })
        setListArr(listArrNext)
      }
      break

      case 'prevItem':
      {
        // console.info( 'Carousel->handleEvents() [1]', action)
        const index: number = listArr.map((item: any) => item.active)
          .indexOf(true)
        const { length } = listArr
        let indexNext: number = index - 1
        if (index === 0) {
          indexNext = length - 1
        }
        const listArrNext: any = listArr.map((item: any, i: number) => {
          let activeNext: boolean = false
          if (i === indexNext) {
            activeNext = true
          }

          return { ...item, active: activeNext }
        })
        setListArr(listArrNext)
      }
      break

      case 'clickIndicator':
      {
        const { item } = action
        const { capture, src } = item

        const listArrNext: any = listArr.map((item01: any, i: number) => {
          let activeNext: boolean = false
          if (src === item01.src) {
            activeNext = true
          }

          return { ...item01, active: activeNext }
        })
        setListArr(listArrNext)

        // console.info('Carousel->handleEvents', { listArrNext, listArr, action })
      }
      break

      default:
      {
        console.info('Carousel->handleEvents() [10]', 'I have never heard of that ...', action)
      }
    }
  }

  // ************ RENDER SECTION ************
  const {
    cid,
    prefix,
    isArrowDisplayed,
    isIndicatorDisplayed,
    scrollInterval,
    scrollPeriodEnd,
  } = props
  // console.info('Carousel->render() [0]', { listArr })

  const actionPrevItem: Interfaces.Action = {
    type: 'prevItem',
  }

  const actionNextItem: Interfaces.Action = {
    type: 'nextItem',
  }

  const actionOnTouchMove: Interfaces.Action = {
    type: 'onTouchMove',
    scrollInterval,
    scrollPeriodEnd,
  }

  const actionOnTouchStopMove: Interfaces.Action  = {
    type: 'onTouchStopMove',
  }

  // react-swipeable https://www.npmjs.com/package/react-swipeable
  const swipeConfig: any = {
    delta: 10,                             // min distance(px) before a swipe starts
    preventDefaultTouchmoveEvent: false,   // preventDefault on touchmove, *See Details*
    trackTouch: true,                      // track touch input
    trackMouse: false,                     // track mouse input
    rotationAngle: 0,
    onSwipedLeft: (): any => handleEvents({}, actionOnTouchMove),
    onSwipedRight: (): any => handleEvents({}, actionOnTouchStopMove),
  }

  // console.info('Carousel->render() [10]', { listArr })
  return (
    <div id={cid} className={`Carousel slide ${prefix}`}>
      { isIndicatorDisplayed ? (
        <div className='Carousel__indicators'>
          {indicators(listArr)}
        </div>
      )
        : undefined
      }
      <div className='Carousel__inner'>
        <Swipeable { ...swipeConfig } >
          {imgs(listArr)}
        </ Swipeable>
      </div>
      { isArrowDisplayed
        ? (
          <div>
            <div className='Carousel__controlPrev'>
              <span className='Carousel__controlPrevIcon'
              // tslint:disable-next-line: react-this-binding-issue
                onClick={(e: any) => handleEvents(e, actionPrevItem)}
              >
                <i className='fas fa-chevron-left' />
              </span>
            </div>
            <div className='Carousel__controlNext'>
              <span
                className='Carousel__controlNextIcon'
                onClick={(e: any) => handleEvents(e, actionNextItem)}
              >
                <i className='fas fa-chevron-right' />
              </span>
            </div>
          </div>
        )
        : undefined
      }
    </div>
  )
}

