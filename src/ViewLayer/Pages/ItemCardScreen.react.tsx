
import React, { useEffect, Suspense } from 'react'

import * as Interfaces from '../../Shared/interfaces'
import { CommonContainer } from '../Containers/CommonContainer.react'
import { SectionWrapper } from '../Components/SectionWrapper.react'
import NavigationHorisontal from '../Components/NavigationHorisontal.react'
import { Pagination } from '../Components/Pagination.react'
import { Backdrop } from '../Modals/Backdrop.react'

const PictureSized = React.lazy(() => import('../Modals/PictureSized.react'))
// import PictureSized from '../Modals/PictureSized.react'
import ItemCard from '../Components/ItemCard.react'

import './ItemCardScreen.less'

interface Props {
  readonly reduxState: any,
  readonly handleActions: Function,
}
interface State {
}

const defaultProps: Props = {
  reduxState: {},
  handleActions: () => {},
}

const ItemCardScreen_: React.SFC<Props> = (inputProps: Props): JSX.Element => {
  // ************ DEFAULT VALUES ************
  const props = { ...defaultProps, ...inputProps }

  // ************ LIFECYCLE METHODS ************
  useEffect(() => {
    const action: Interfaces.Action = {
      type: 'getTreeData',
    }
    // console.info('Analytics02->componentDidUpdate', { action })
    handleEvents({}, action)
  }, [])

  // ************ FUNCTIONS ************
  const getDisplayClass: Function = (status: boolean): string => {

    let displayClass = 'd_f'
    if (status) {
      displayClass = 'd_n'
    }

    return displayClass
  }

  const getPaginationItemsSrc: Function = (treeData: any): any => {
    let outcome = []
    const { groups } = treeData

    if (groups && groups.length > 0) {
      outcome = groups.map(( item: any, i: number ) => {
        const { name, thumbnail } = item
        return {
          id: i,
          capture: name,
          src: thumbnail.href,
          active: true,
        }
      })
    }

    return outcome
  }

  const getPictureSizedSrc: Function = (treeData: any, pagination: number, carousel: number): any => {
    let outcome = []
    const { groups } = treeData

    if (groups && groups.length > 0) {
      const { name, images } = groups[pagination]
      // console.info('ItemCard->getPictureSizedSrc()', { name, images, pagination, groups })
      outcome = images.map(( item: any, i: number ) => {
        const { href } = item
        let active = false
        if(carousel === i) active = true
        return {
          id: i,
          capture: name,
          src: href,
          active,
        }
      })
    }

    return outcome
  }

  // ************ EVENT HANDLERS ************
  const handleEvents: Function = (e: any, action: Interfaces.Action): void => {
    const { handleActions } = props
    let data: any
    // console.info(`ItemCard->handleEvents() type: ${action.type} [0]`, { handleActions, props, action, e })

    switch (action.type) {

      case 'openModalImgSized':
      {
        const action: Interfaces.Action = {
          type: 'OPEN_MODAL_IMG_SIZED',
        }
        handleActions({}, action)
        // console.info(`ItemCard->handleEvents() type: ${action.type} [10]`, { props, action, e })
      }
      break

      case 'getTreeData':
      {
        const action: Interfaces.Action = {
          type: 'GET_TREE_DATA',
        }
        props.handleActions({}, action)
      }
      break

      default: {
        console.info(`ItemCard->handleEvents unexpected action type: ${action.type}`, { action })
      }
    }
  }

  // ************ RENDER SECTION ************
  const { reduxState } = props
  const { treeData, modalWindows, indexCollection } = reduxState
  const { pagination, carousel } = indexCollection
  const { display } = modalWindows

  const { groups } = treeData
  const { name = '', images = [], priceRange = {} } = groups ? groups[pagination] : {}
  const { alt = '', rel = '', width = 0, href = '', height = 0 } = groups ? images[carousel] : {}
  const { regular = {} } = groups ? priceRange : {}
  const { high = 0, low = 0 } = groups ? regular : {}

  const itemCardElemProps = {
    handleEvents, name, images, priceRange, alt, rel, width, href, height, regular, high, low
  }
  
  const pictureSizedSrc = getPictureSizedSrc(treeData, pagination, carousel)
  const pictureSizedProps: any = { listArr: pictureSizedSrc }

  const paginationItemsSrc = getPaginationItemsSrc(treeData)
  const paginationProps: any = { itemsSrc: paginationItemsSrc, activeItem: pagination }

  const displayClass = getDisplayClass(display)
  
  // console.info('ItemCard [R]', { itemCardElemProps, pagination, pictureSizedProps, reduxState, props })
  return <SectionWrapper key={'0'}>
    {displayClass === 'd_f' ?
      <NavigationHorisontal />
      : null
    }
    <div className={displayClass}>
      <ItemCard {...itemCardElemProps} />
    </div>
    {<Pagination {...paginationProps} />}
    <Suspense fallback={<span>I am working on it ...</span>}>
      <Backdrop />
      <PictureSized {...pictureSizedProps} />
    </Suspense>
  </SectionWrapper>
}

export default CommonContainer(ItemCardScreen_)
