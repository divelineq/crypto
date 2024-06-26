import React from 'react'
import { AppLayout } from './components/AppLayout'
import { CryptoContextProvider } from './context/crtypto_context'

const App = () => (
	<CryptoContextProvider>
		<AppLayout />
	</CryptoContextProvider>
)
export default App
