import React, { Suspense, useState, useEffect } from 'react'
import LazyLoad from 'react-lazyload'

import { CommonContainer } from '../Containers/CommonContainer.react'
import { SectionWrapper } from '../Components/SectionWrapper.react'
import NavHorizontal from '../Components/NavigationHorisontal.react'
import ItemCard from '../Components/ItemCard.react'
import Header from '../Components/Header.react'
import Backdrop from '../Modals/Backdrop.react'
import Spinner from '../Modals/Spinner.react'

import * as Interfaces from '../../Shared/interfaces'

import './ItemListScreen.less'

interface Props {
  reduxState: any,
  handleActions: Function,
}

interface State {
  readonly stateTreeData: any,
}

const defaultProps: Props = {
  reduxState: {},
  handleActions: () => {},
}

const ItemListScreen_: React.SFC<Props> = (inputProps: Props): JSX.Element => {
  // ************ DEFAULT VALUES ************ 
  const props = { ...defaultProps, ...inputProps }
  const { reduxState, handleActions } = props
  let { treeData } = reduxState
  let { groups } = treeData
  // console.info('ItemList [D]', { groups, treeData, reduxState, props })

  // ************ LIFECYCLE METHODS ************
  useEffect(() => {
    if(!reduxState || !reduxState.treeData || !reduxState.treeData.groups) {
      const action: Interfaces.Action = {
        type: 'getTreeData',
      }
      handleEvents({}, action)
    }
  }, [])

  // ************ FUNCTIONS ************
  const arrTransform: Function = (groups: any[]): any[] => {
    const images = []
    groups.forEach(item => {
      const { images: images1, id, name, priceRange } = item
      const { regular = {} } = groups ? priceRange : {}
      const { high = 0, low = 0 } = groups ? regular : {}
      const images2 = images1.map(item1 => ({ ...item1, id, name, high, low }))
      images2.forEach(item => images.push(item))
    })

    return images
  }
  // console.info('ItemList [F]', { groups, treeData, reduxState, props })

  const getImageList: Function = (groups: any[]): JSX.Element[] => {
    
    const imagesArr: any[] = arrTransform(groups)

    return imagesArr.map((item: any, i: number) => {
      const itemCardElemProps = { handleEvents: () => {}, ...item, classNameAdd: 'ItemCard_itemListScreen'}
      return (
        <LazyLoad key={`LazyLoad_${item.id}_${i}`} height={200} offset={100}>
          <ItemCard key={`ItemCard_${item.id}_${i}`} {...itemCardElemProps} />
        </LazyLoad>
      )
      
    })
  }

  // ************ EVENT HANDLERS ************
  const handleEvents: Function = (e: any, action: any): void => {
    switch (action.type) {

      case 'getTreeData':
      {
        const action: Interfaces.Action = {
          type: 'GET_TREE_DATA',
        }
        handleActions({}, action)
      }
      break

      default: {
        console.info(`ItemCard->handleEvents unexpected action type: ${action.type}`, { action })
      }
    }
  }

  // ************ RENDER SECTION ************
  const action = { type: 'action1'}
  const navHorisontalProps: any = { 
    navList: [
      { capture: 'Item card', to: '/demo-js-item-carousel.html/item0', active: false },
      { capture: 'Item list', to: '/demo-js-item-carousel.html/ItemList', active: true },
    ],
  }

  return <SectionWrapper>
    {groups && !!groups.length ?
      <div className='ItemCardScreen'>
        <Header>Item list screen</Header>
        <NavHorizontal {...navHorisontalProps} />
        <section className='ItemCardScreen__mainSection'>
        <Suspense fallback={<><Backdrop display /><Spinner display /></>}>
          {getImageList(groups)}
        </Suspense>
        </section>
      </div>
      : <>
        <Backdrop display />
        <Spinner display />
      </>
    }
  </SectionWrapper>
}

export default CommonContainer(ItemListScreen_)
