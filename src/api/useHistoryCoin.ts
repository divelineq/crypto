import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type History = {
	name: string;
	symbol: string;
	price_history: [number, number][];
};

export const useHistoryCoin = (currency: string) => {
  return useQuery<History>({
    queryKey: ['history', currency],
    queryFn: async () => {
      const res = await axios.get(`https://production-api.mobula.io/api/1/market/history?asset=${currency}&from=1697648158`);
      return res.data.data
    }
  })
}



