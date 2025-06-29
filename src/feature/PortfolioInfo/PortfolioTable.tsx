import type { PortfolioType } from "@api";
import { CopyableText, Table } from "@ui";
import { parseAsInteger, useQueryStates } from "nuqs";

type Props = {
	data: PortfolioType | undefined;
};

export const DEFAULT_PORTFOLIO_COLUMNS = [
	{
		accessorKey: "asset.name",
		header: () => <p className="text-left">Token Name</p>,
		cell: (props: any) => (
			<div className="flex gap-2 items-center">
				{!props.row.original.asset.logo ? (
					<p>{props.getValue()}</p>
				) : (
					<>
						<img
							src={props.row.original.asset.logo}
							alt=""
							className="w-8 h-8"
						/>
						<p>{props.getValue()}</p>
					</>
				)}
			</div>
		),
	},
	{
		accessorKey: "token_balance",
		header: () => <p className="text-center">Token Balance</p>,
		cell: (props: any) => {
			return <p>{props.getValue().toFixed(8)}</p>;
		},
	},
	{
		accessorKey: "price",
		header: () => <p className="text-center">Price</p>,
		cell: (props: any) => <p>{props.getValue().toFixed(2)}$</p>,
	},
	{
		accessorKey: "estimated_balance",
		header: () => <p className="text-center">USD Value</p>,
		cell: (props: any) => <p>{props.getValue().toFixed(2)}$</p>,
	},
	{
		accessorKey: "price_change_24h",
		header: () => <p className="text-center">24h Price Change</p>,
		cell: (props: any) => <p>{props.getValue().toFixed(2)}%</p>,
	},
	{
		accessorKey: "asset.contracts",
		header: () => <p className="text-center">Contract Address</p>,
		cell: (props: any) => CopyableText({ value: props.getValue() }),
		enableSorting: false,
	},
];

function PortfolioTable({ data }: Props) {
	const [pagination, setPagination] = useQueryStates(
		{
			pageIndex: parseAsInteger.withDefault(0),
			pageSize: parseAsInteger.withDefault(10),
		},
		{ history: "push" },
	);

	return (
		<Table
			pagination={pagination}
			onPaginationChange={setPagination}
			searchId="asset_name"
			defaultColumns={DEFAULT_PORTFOLIO_COLUMNS}
			data={data?.assets ?? []}
		/>
	);
}

export { PortfolioTable };
