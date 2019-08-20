import React from 'react'

interface Props {
  sid?: string,
  classStyle?: string,
  children: any,
}
interface State {
}

const defaultProps: any = {
  sid: '',
  classStyle: '',
}

export const SectionWrapper: React.SFC<Props> = (props: Props) => {
  const propsPrivate: Props = { ...defaultProps, ...props }
  const { sid, classStyle, children } = propsPrivate

  return (
    <div className={`SectionWrapper ${classStyle}`}>

      <div className='SectionWrapper__colLeft' />
      <div className='SectionWrapper__colMain'>
        {children}
      </div>
      <div className='SectionWrapper__colRight' />

    </div>
  )
}
