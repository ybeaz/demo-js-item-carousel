import React, { useState } from 'react'

import * as Interface from '../../Shared/interfaces'
import { CommonContainer } from '../Containers/CommonContainer.react'

import './NavTop.less'

interface Props {
  readonly reduxState: any,
  readonly handleActions: Function,
}

const defaultProps: Props = {
  reduxState: {},
  handleActions: (): void => {},
}

const NavTop: React.SFC<Props> = (inputProps: Props): JSX.Element => {
  // ************ DEFAULT VALUES ************
  const props: Props = { ...defaultProps, ...inputProps }

  // ************ LIFECYCLE METHODS ************
  const [login, setLogin] = useState('')
  const [pass, setPass] = useState('')

  // ************ FUNCTIONS ************

  // ************ EVENT HANDLERS ************
  const handleEvents: Function = (
    val: string, action: Interface.Action = { type: 'any' }): void => {
    const { handleActions } = props

    switch (action.type) {

      case 'onSubmit':
      {
        // console.info('NavTop [E] onSubmit', { login, pass, action })
        handleActions({}, { type: 'GET_LOGIN_RES', data: { login, pass } })
      }
      break

      case 'onPassInput':
      {
        setPass(val)
      }
      break

      case 'onLoginInput':
      {
        setLogin(val)
      }
      break

      default: {
        console.info(`NavTop->handleEvents unexpected action type: ${action.type}`, { action })
      }
    }
  }

  // ************ RENDER SECTION ************
  const actionOnclick: Interface.Action = { type: 'action1'}
  const { reduxState } = props
  const { indexCollection } = reduxState
  const { loginRes } = indexCollection
  // console.info('NavTop [R]', { loginRes, props })

  return <div className='NavTop'>
    {loginRes === true ? <i className='NavTop__iShield fas fa-user-shield' />
      : <i className='NavTop__iSecret fas fa-user-secret' />
    }
    {/* <a className='NavTop__loginLink' href='/'
      onClickCapture={e => handleEvents(e, actionOnclick)}>
      Login
    </a> */}
    <input
      className='NavTop__inputLogin' type='text' placeholder='Login...'
      onChange={e => handleEvents(e.currentTarget.value, { type: 'onLoginInput' })}
      value={login}
    />
    <input
      className='NavTop__inputPass' type='text' placeholder='Password...'
      onChange={e => handleEvents(e.currentTarget.value, { type: 'onPassInput' })}
      value={pass}
    />
    <button className='NavTop__submit'
      onClick={e => handleEvents('', { type: 'onSubmit' })}
    >Submit</button>
  </div>
}

export default CommonContainer(NavTop)
