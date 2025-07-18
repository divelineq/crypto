import { Link } from "@tanstack/react-router";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	MoreHorizontalIcon,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { type Button, buttonVariants } from "../Button";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
	return (
		<nav
			// biome-ignore lint/a11y/noRedundantRoles: <explanation>
			role="navigation"
			aria-label="pagination"
			data-slot="pagination"
			className={cn("flex", className)}
			{...props}
		/>
	);
}

function PaginationContent({
	className,
	...props
}: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="pagination-content"
			className={cn("flex flex-row items-center gap-1", className)}
			{...props}
		/>
	);
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
	return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
	isActive?: boolean;
	to?: string;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
	React.ComponentProps<"a">;

function PaginationLink({
	className,
	isActive,
	to,
	size = "icon",
	onClick,
	...props
}: PaginationLinkProps) {
	return (
		<Link
			to={to}
			aria-current={isActive ? "page" : undefined}
			data-slot="pagination-link"
			data-active={isActive}
			className={cn(
				buttonVariants({
					variant: isActive ? "outline" : "ghost",
					size,
				}),
				className,
			)}
			onClick={(e) => {
				e.stopPropagation();
				e.preventDefault();
				onClick?.(e);
			}}
			{...props}
		/>
	);
}

function PaginationPrevious({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label="Go to previous page"
			size="default"
			className={cn("gap-1 px-2.5 sm:pl-2.5 cursor-pointer", className)}
			{...props}
		>
			<ChevronLeftIcon />
			<span className="hidden sm:block">Previous</span>
		</PaginationLink>
	);
}

function PaginationNext({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label="Go to next page"
			size="default"
			className={cn("gap-1 px-2.5 sm:pr-2.5 cursor-pointer", className)}
			{...props}
		>
			<span className="hidden sm:block">Next</span>
			<ChevronRightIcon />
		</PaginationLink>
	);
}

function PaginationEllipsis({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			aria-hidden
			data-slot="pagination-ellipsis"
			className={cn("flex size-9 items-center justify-center", className)}
			{...props}
		>
			<MoreHorizontalIcon className="size-4" />
			<span className="sr-only">More pages</span>
		</span>
	);
}

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
};
