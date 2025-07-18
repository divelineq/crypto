import { type OneCoinType, type QuerySortBy, historyApi } from "@api";
import { coinApi } from "../../api/coins/api";
import type {
	CoinsService,
	SortedCoinsServiceResponse,
	SortedCoinsWithHistoryServiceResponse,
} from "./types";

export const coinService = {
	async getCoins(signal: AbortSignal, fields: string): Promise<CoinsService> {
		const data = await coinApi.getMany(signal, fields);

		return {
			total: data.length,
			data,
		};
	},

	async getCoin(signal: AbortSignal, coin: string): Promise<OneCoinType> {
		return await coinApi.getOne(coin, signal);
	},

	async getSortedCoins(
		signal: AbortSignal,
		limit: number,
		offset: number,
		sortBy?: QuerySortBy,
	): Promise<SortedCoinsServiceResponse> {
		const [total, data] = await Promise.all([
			coinApi.getMany(signal, "id").then((res) => res.length),
			coinApi.getSortedCoins(signal, limit, offset, sortBy),
		]);

		return { total, data };
	},

	async getSortedCoinsWithHistory(
		signal: AbortSignal,
		limit: number,
		offset: number,
		period: string,
		from: number,
		to: number,
		sortBy?: QuerySortBy,
	): Promise<SortedCoinsWithHistoryServiceResponse> {
		const coins = await coinService.getSortedCoins(
			signal,
			limit,
			offset,
			sortBy,
		);

		const coinsWithHistory = await Promise.all(
			coins.data.map(async (coin) => {
				const res = await historyApi.getHistory(
					period,
					signal,
					coin.id,
					from,
					to,
				);

				return {
					...coin,
					history: res.price_history.map((item) => item?.[1]),
				};
			}),
		);

		return { data: coinsWithHistory, total: coins.total };
	},
};
