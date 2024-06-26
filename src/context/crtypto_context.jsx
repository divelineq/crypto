import { createContext, useEffect, useState } from 'react'
import { fetchCryptoAssets, fetchCryptoData } from '../api'
import { percentDifference } from '../utils'

export const CryptoContext = createContext({
	assets: [],
	crypto: [],
	loading: false,
})

export function CryptoContextProvider({ children }) {
	const [loading, setLoading] = useState(false)
	const [crypto, setCrypto] = useState([])
	const [assets, setAssets] = useState([])

	useEffect(() => {
		async function preload() {
			setLoading(true)
			const assets = await fetchCryptoAssets()
			const { result } = await fetchCryptoData()
			setAssets(
				assets.map(asset => {
					const coin = result.find(c => c.id === asset.id) //конкретная монета
					return {
						grow: asset.price < coin.price, // up down coin
						growPercent: percentDifference(asset.price, coin.price), // %
						totalAmount: asset.amount * coin.price, //coin === $
						totalProfit: asset.amount * coin.price - asset.amount * asset.price, //profit

						...asset,
					}
				})
			)
			setCrypto(result)
			setLoading(false)
		}
		preload()
	}, [])

	return (
		<CryptoContext.Provider value={{ loading, crypto, assets }}>
			{children}
		</CryptoContext.Provider>
	)
}
export default CryptoContext
