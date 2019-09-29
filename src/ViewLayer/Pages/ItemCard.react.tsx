import React, { useEffect } from 'react'

import * as Interfaces from '../../Shared/interfaces'
import { CommonContainer } from '../Containers/CommonContainer.react'
import { SectionWrapper } from '../Components/SectionWrapper.react'
import { Pagination } from '../Components/Pagination.react'
import { Backdrop } from '../Modals/Backdrop.react'
import { PictureSized } from '../Modals/PictureSized.react'
import { any } from 'prop-types';

interface Props {
  readonly reduxState?: any,
  readonly handleActions?: Function,
}
interface State {
}

const defaultProps: Props = {}

const ItemCardPage: React.SFC<Props> = (inputProps: Props): JSX.Element => {
  const props = { ...defaultProps, ...inputProps }

  useEffect(() => {
    const action: Interfaces.Action = {
      type: 'getTreeData',
    }
    // console.info('Analytics02->componentDidUpdate', { action })
    handleEvents({}, action)
  }, [])

  const getItemCard: Function = (): JSX.Element => {
    const { reduxState } = props
    const { treeData, indexCollection } = reduxState
    const { pagination, carousel } = indexCollection
    // console.info(`ItemCard->getItemCard() [5]`, { pagination, carousel, props })

    const { groups } = treeData
    const { name = '', images = [], priceRange = {} } = groups ? groups[pagination] : {}
    const { alt = '', rel = '', width = 0, href = '', height = 0 } = groups ? images[carousel] : {}
    const { regular = {} } = groups ? priceRange : {}
    const { high = 0, low = 0 } = groups ? regular : {}

    return <div className='ItemCard'>
      <div className='ItemCard__name_wrapper'>
        <div className='ItemCard__name'>
          {name}
        </div>
      </div>
      <img
        className='ItemCard__images' src={href}
        width={width} height={height} alt={alt}
        onClick={e => handleEvents(e, {type: 'openModalImgSized'})}
      />
      <div className='ItemCard__priceRange'>
        <div className='ItemCard__priceRange_regular_high'>${high}-</div>
        <div className='ItemCard__priceRange_regular_low'>${low}</div>
      </div>
    </div>
  }

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
        props.handleActions({}, action)
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

  // render() => ...
  const { reduxState } = props
  const { treeData, modalWindows, indexCollection } = reduxState
  const { pagination, carousel } = indexCollection
  const { display } = modalWindows
  const itemCardElem = getItemCard()
  
  const pictureSizedSrc = getPictureSizedSrc(treeData, pagination, carousel)
  const pictureSizedProps: any = { listArr: pictureSizedSrc }

  const paginationItemsSrc = getPaginationItemsSrc(treeData)
  const paginationProps: any = { itemsSrc: paginationItemsSrc, activeItem: pagination }

  const displayClass = getDisplayClass(display)
  
  // console.info('ItemCard->render()', { pagination, pictureSizedProps, reduxState, props })
  return <SectionWrapper>
    <div className={displayClass}>
      {itemCardElem}
    </div>
    <Pagination {...paginationProps} />
    <Backdrop />
    <PictureSized {...pictureSizedProps} />
  </SectionWrapper>
}

export const ItemCard: any = CommonContainer(ItemCardPage)
