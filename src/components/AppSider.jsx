import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Card, Layout, List, Statistic, Tag, Typography } from 'antd'
import { useContext } from 'react'
import CryptoContext from '../context/crtypto_context'
import { capitalize } from '../utils'

const siderStyle = {
	padding: '1rem',
}

export const AppSider = () => {
	const { assets } = useContext(CryptoContext)

	return (
		<Layout.Sider width='25%' style={siderStyle}>
			{assets.map(item => (
				<Card key={item.id} style={{ marginBottom: '1rem' }}>
					<Statistic
						title={capitalize(item.id)}
						value={item.totalAmount}
						precision={2}
						valueStyle={{
							color: item.grow ? '#3f8600' : '#cf1322',
						}}
						prefix={item.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
						suffix='$'
					/>
					<List
						size='small'
						dataSource={[
							{
								title: 'Total Profit',
								value: +item.totalProfit,
								withTag: true,
							},
							{ title: 'Asset Amount', value: item.amount, isPlain: true },
							//{ title: 'Difference', value: +item.growPercent },
						]}
						renderItem={itemList => (
							<List.Item>
								<span>{itemList.title}</span>
								{itemList.withTag && (
									<Tag color={item.grow ? 'green' : 'red'}>
										{item.growPercent}%
									</Tag>
								)}
								{itemList.isPlain && itemList.value}
								{!itemList.isPlain && (
									<Typography.Text type={itemList.grow ? 'success' : 'danger'}>
										{itemList.value.toFixed(2)}$
									</Typography.Text>
								)}
							</List.Item>
						)}
					/>
				</Card>
			))}
		</Layout.Sider>
	)
}
