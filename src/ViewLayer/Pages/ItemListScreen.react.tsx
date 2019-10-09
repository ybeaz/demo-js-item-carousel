import React, { useState, useEffect } from 'react'
import { CommonContainer } from '../Containers/CommonContainer.react'
import { SectionWrapper } from '../Components/SectionWrapper.react'
import ItemCard from '../Components/ItemCard.react'

import * as Interfaces from '../../Shared/interfaces'

import './ItemListScreen.less'

interface Props {
  reduxState: any,
  handleActions: Function,
}

interface State {
  readonly stateTreeData: any,
}

const defaultProps: Props = {}

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
      const images2 = images1.map(item1 => ({ ...item1, id, name, priceRange }))
      images2.forEach(item => images.push(item))
    })

    return images
  }
  // console.info('ItemList [F]', { groups, treeData, reduxState, props })

  const getImageList: Function = (groups: any[]): JSX.Element => {
    
    const imagesArr: any[] = arrTransform(groups)

    return imagesArr.map((item: any, i: number) => {
      const itemCardElemProps = { handleEvents: () => {}, ...item}
      return <ItemCard key={`${item.id}_${i}`} {...itemCardElemProps} />
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
  return <SectionWrapper>
    {groups && !!groups.length ?
      <>{getImageList(groups)}</>
      : <>Wait loading...</>
    }
  </SectionWrapper>
}

export const ItemListScreen: any = CommonContainer(ItemListScreen_)
