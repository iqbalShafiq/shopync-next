"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "./badge";

export type Option = {
	value: string;
	label: string;
};

interface MultiComboboxProps {
	options: Option[];
	selected: Option[];
	onChangeAction: (selected: Option[]) => void;
	placeholder?: string;
	emptyText?: string;
	className?: string;
}

export function MultiCombobox({
	options,
	selected,
	onChangeAction,
	placeholder = "Select items...",
	emptyText = "No item found.",
	className,
}: MultiComboboxProps) {
	const [open, setOpen] = React.useState(false);

	const handleSelect = (option: Option) => {
		if (selected.some((item) => item.value === option.value)) {
			onChangeAction(selected.filter((item) => item.value !== option.value));
		} else {
			onChangeAction([...selected, option]);
		}
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					aria-expanded={open}
					className={cn("justify-between", className)}
				>
					{selected.length === 0 ? (
						placeholder
					) : (
						<div className="flex flex-wrap gap-1">
							{selected.map((item) => (
								<Badge variant={"secondary"} key={item.value}>
									{item.label}
								</Badge>
							))}
						</div>
					)}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0">
				<Command>
					<CommandInput placeholder={placeholder} />
					<CommandList>
						<CommandEmpty>{emptyText}</CommandEmpty>
						<CommandGroup>
							{(options || []).map((option) => (
								<CommandItem
									key={option.value}
									onSelect={() => handleSelect(option)}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											selected.some((item) => item.value === option.value)
												? "opacity-100"
												: "opacity-0",
										)}
									/>
									{option.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
