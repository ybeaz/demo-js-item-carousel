import React from 'react'


interface Props {
  readonly sid?: string,
}

export const Spinner: React.SFC<Props> = (props: Props): JSX.Element => {
  const { sid } = props

  return (
    <div className={`Spinner Spinner_${sid}`}>
      <img
        src='https://userto.com/img/spinner.gif'
        alt='Loading'
      />
    </div>
  )
}
