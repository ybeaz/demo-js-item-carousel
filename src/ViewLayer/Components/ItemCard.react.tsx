
import React from 'react'
import './ItemCard.less'

interface Props {
  handleEvents?: Function,
  name?: string,
  alt?: string,
  width?: number,
  href?: string,
  height?: number,
  high?: number,
  low?: number,
}

const defaultProps: Props = {}

const TemplatePureFunctional: React.SFC<Props> = (inputProps: Props): JSX.Element => {
  // ************ DEFAULT VALUES ************
  const props = { ...defaultProps, ...inputProps }


  // ************ LIFECYCLE METHODS ************


  // ************ FUNCTIONS ************


  // ************ EVENT HANDLERS ************
  const handleEvents: Function = (e: any, action: any): void => {

  }

  // ************ RENDER SECTION ************
  const {
    handleEvents: handleEventsProps, name, alt, width, href, height, high, low
  } = props

  return <div className='ItemCard'>
    <div className='ItemCard__name_wrapper'>
      <div className='ItemCard__name'>
        {name}
      </div>
    </div>
    <img
      className='ItemCard__images' src={href}
      width={width} height={height} alt={alt}
      onClick={e => handleEventsProps(e, {type: 'openModalImgSized'})}
    />
    <div className='ItemCard__priceRange'>
      <div className='ItemCard__priceRange_regular_high'>${high}-</div>
      <div className='ItemCard__priceRange_regular_low'>${low}</div>
    </div>
  </div>
}

export default TemplatePureFunctional
