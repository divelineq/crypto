import { Layout } from 'antd'

export const AppContent = () => {
	const contentStyle = {
		textAlign: 'center',
		minHeight: 'calc(100vh - 60px)',
		color: '#fff',
		backgroundColor: '#0b2755',
	}

	return <Layout.Content style={contentStyle}>Content</Layout.Content>
}
