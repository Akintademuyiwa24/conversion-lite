//set up the reduxprovider
'use client'
import { Provider } from 'react-redux'
import store from './store'

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
// This file is used to wrap the application with Redux store