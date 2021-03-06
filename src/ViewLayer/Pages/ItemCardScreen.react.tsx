
import React, { useState, useEffect, Suspense, Fragment } from 'react'

import * as Interfaces from '../../Shared/interfaces'
import * as serviceFunc from '../../Shared/serviceFunc'

import Header from '../Components/Header.react'
import NavHorizontal from '../Components/NavigationHorisontal.react'
import NavTop from '../Components/NavTop.react'
import Pagination from '../Components/Pagination.react'
import { SectionWrapper } from '../Components/SectionWrapper.react'
import { CommonContainer } from '../Containers/CommonContainer.react'
import Backdrop from '../Modals/Backdrop.react'
import Spinner from '../Modals/Spinner.react'
// const PictureSized: JSX.Element = React.lazy(() => import('../Modals/PictureSized.react'))
import PictureSized from '../Modals/PictureSized.react'
import ItemCard from '../Components/ItemCard.react'

import './ItemCardScreen.less'

interface Props {
  readonly reduxState: any,
  readonly handleActions: Function,
}
interface State {
  readonly isImageLoaded: boolean,
}

const defaultProps: Props = {
  reduxState: {},
  handleActions: (): void => {},
}

const ItemCardScreen_: React.SFC<Props> = (inputProps: Props): JSX.Element => {
  // ************ DEFAULT VALUES ************
  const props: Props = { ...defaultProps, ...inputProps }

  // ************ LIFECYCLE METHODS ************
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  useEffect(() => {
    const action: Interfaces.Action = {
      type: 'getTreeData',
    }
    // console.info('Analytics02->componentDidUpdate', { action })
    handleEvents({}, action)
  }, [])

  // ************ FUNCTIONS ************
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
    // console.info(`ItemCard->handleEvents() type: ${action.type} [0]`, { handleActions, props, action, e })

    switch (action.type) {

      case 'imageLoaded': 
      {
        setIsImageLoaded(true)
      }
      break

      case 'openModalImgSized':
      {
        const action: Interfaces.Action = {
          type: 'OPEN_MODAL_IMG_SIZED',
        }
        handleActions({}, action)
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
  const navHorisontalProps: any = { 
    navList: [
      { capture: 'Item card', to: '/demo-js-item-carousel.html/item0', type: 'reactRouterLink', classStyle: '', active: true },
      { capture: 'Item list', to: '/demo-js-item-carousel.html/ItemList', type: 'reactRouterLink', classStyle: '', active: false },
      { capture: 'Github link', to: 'https://github.com/ybeaz/demo-js-item-carousel', type: 'anchor', classStyle: 'NavHorizontal__a_github', active: false },
    ],
  }
  const displayClassSectionWrapper = serviceFunc.getDisplayClass(isImageLoaded)
  const displayClassItemCardScreen = serviceFunc.getRevDisplayClass(display)

  // console.info('ItemCardScreen [R]', { display, displayClassItemCardScreen, isImageLoaded })
  return <>
    <SectionWrapper key={'0'} classStyle={displayClassSectionWrapper}>
      {displayClassItemCardScreen === 'd_f' ?
        <div className={`ItemCardScreen ${displayClassItemCardScreen}`}>
          <Suspense fallback={<><Backdrop display={true} /><Spinner display /></>}>
            <NavTop />
            <Header>Demo: Item card screen</Header>
            <NavHorizontal {...navHorisontalProps} />
            <ItemCard {...itemCardElemProps} />
            <Pagination {...paginationProps} />
          </Suspense>
        </div>
        : null
      }
      <Suspense fallback={<><Backdrop display={true} /><Spinner display /></>}>
        <PictureSized {...pictureSizedProps} />
      </Suspense>
    </SectionWrapper>
    <Backdrop display={!isImageLoaded} /><Spinner display={!isImageLoaded} />
  </>
}

export default CommonContainer(ItemCardScreen_)
