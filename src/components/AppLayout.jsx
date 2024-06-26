import { Layout, Spin } from 'antd'
import React, { useContext } from 'react'
import CryptoContext from '../context/crtypto_context'
import { AppContent } from './AppContent'
import { AppHeader } from './AppHeader'
import { AppSider } from './AppSider'

const styleLayout = {
	backgroundColor: '#-2b2755',
}

export const AppLayout = () => {
	const { loading } = useContext(CryptoContext)
	if (loading) {
		return <Spin size='large' fullscreen />
	}
	return (
		<Layout>
			<AppHeader />
			<Layout style={styleLayout}>
				<AppSider />
				<AppContent />
			</Layout>
		</Layout>
	)
}
