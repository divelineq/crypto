import { Button, Layout, Modal, Select, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useCrypto } from './../utils'
import { InfoModal } from './InfoModal'

const headerStyle = {
	textAlign: 'center',
	color: '#fff',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: "'center",
}

export const AppHeader = () => {
	const [select, setSelect] = useState(false)
	const [modal, setModal] = useState(false)
	const [coin, setCoin] = useState(null)
	const { crypto } = useCrypto()

	useEffect(() => {
		const keypress = e => {
			if (e.key === '/') {
				setSelect(prev => !prev)
			}
		}
		document.addEventListener('keypress', keypress)
		return document.removeEventListener('keypress', keypress)
	}, [])

	const handleSelect = value => {
		setCoin(crypto.find(c => c.id === value))
		setModal(true)
	}

	return (
		<Layout.Header style={headerStyle}>
			<Select
				onSelect={handleSelect}
				onClick={() => setSelect(prev => !prev)}
				style={{
					width: 250,
					height: 30,
				}}
				placeholder='Select coin'
				options={crypto.map(coin => ({
					label: coin.name,
					value: coin.id,
					icon: coin.icon,
				}))}
				optionRender={option => (
					<Space>
						<img
							style={{ width: 20 }}
							src={option.data.icon}
							alt={option.data.label}
						/>
						{option.data.label}
					</Space>
				)}
			/>
			<Button type='primary'>Add coin</Button>
			<Modal open={modal} onCancel={() => setModal(false)} footer={null}>
				<InfoModal coin={coin} />
			</Modal>
		</Layout.Header>
	)
}
