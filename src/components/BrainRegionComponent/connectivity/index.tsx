import React, { useState, useEffect, useRef } from "react";

import { Box, Typography, Container } from "@material-ui/core";
import { CheckBoxElement } from "../../../utils/types";

import { BgCollapseTable } from "../../Base/BgTable";
import Checkboxes from "../../Base/Checkboxes";

import { getConnectionId, sortRegionConnections, getFilteredConnections } from "./utils";
import { ConnectivityDialog } from "./ConnectivityDialog";
import { connectivityCheckboxes, relationTypeCheckboxes, connectivityTableHeaders, RegionConnectivity, BrainRegionConnectionsProps, TableOrders } from "./types";



const BrainRegionConnectionsContainer: React.FC<BrainRegionConnectionsProps> = ({ connectivity }) => {
	const [checkboxState, setCheckboxState] = useState<CheckBoxElement[]>(connectivityCheckboxes);
	const [relationTypeCheckboxState, setRelationTypeCheckboxState] = useState<CheckBoxElement[]>(relationTypeCheckboxes);
	const [allConnections, setAllConnections] = useState<RegionConnectivity[]>([]);
	const [visibleConnections, setVisibleConnections] = useState<RegionConnectivity[]>([]);

	const [order, setOrder] = useState<"asc" | "desc">("asc");
	const [orderBy, setOrderBy] = useState<TableOrders>("direction");

	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const [selectedConnection, setSelectedConnection] = useState<RegionConnectivity>()

	const loading = useRef(true);

	useEffect(() => {
		const sorted = sortRegionConnections(connectivity, order, orderBy);
		setVisibleConnections(sorted);
		setAllConnections(sorted);
		loading.current = false;

	}, [connectivity, order, orderBy]);


	if (!loading.current && !allConnections.length) {
		return <Typography component="p" variant="subtitle1">
			There are no connectivity information for this region
		</Typography>;
	};

	const handleSortRequest = (newOrderBy: TableOrders) => () => {
		const newOrder = orderBy === newOrderBy && order === "asc" ? "desc" : "asc";

		setOrder(newOrder);
		setOrderBy(newOrderBy);

		setVisibleConnections(sortRegionConnections(visibleConnections, newOrder, newOrderBy));
	};

	const updateCheckboxes = (checkBoxId: number, checkBoxes: CheckBoxElement[]) => {
		return checkBoxes.map(box => {
			if (box.id === checkBoxId) {
				box.selected = !box.selected;
			}
			return box;
		});
	}

	const handleCheckboxChange = (checkBoxId: number) => () => {
		const updatedCheckboxes = updateCheckboxes(checkBoxId, connectivityCheckboxes);
		setCheckboxState(updatedCheckboxes);

		const updatedVisibleConnection = getFilteredConnections(allConnections, updatedCheckboxes, relationTypeCheckboxState);
		setVisibleConnections(updatedVisibleConnection);
	};

	const handleRelationCheckboxChange = (checkBoxId: number) => () => {
		const updatedCheckboxes = updateCheckboxes(checkBoxId, relationTypeCheckboxes);
		setRelationTypeCheckboxState(updatedCheckboxes);

		const updatedVisibleConnection = getFilteredConnections(allConnections, checkboxState, updatedCheckboxes);
		setVisibleConnections(updatedVisibleConnection);
	};

	const handleRowClick = (rowId: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
		setSelectedConnection(allConnections.filter(c => getConnectionId(c) === rowId)[0]);
		setDialogOpen(true);
	}

	const rows = visibleConnections.map(connection => {
		return {
			id: getConnectionId(connection),
			link: getConnectionId(connection),
			title: "Click to see how the relationship was derived",
			cells: [
				{ text: connection.direction },
				{ text: connection.connectedRegion.name },
				{ text: connection.strength },
				{ text: connection.technique },
			]
		};
	});

	return (
		<Container maxWidth="md">
			<Box mt={2} display="flex" justifyContent="center" flexDirection="column">
				<Checkboxes
					legend="Relation direction:"
					elements={checkboxState}
					handleChange={handleCheckboxChange}
				/>
				<Checkboxes
					legend="Relation types:"
					elements={relationTypeCheckboxState}
					handleChange={handleRelationCheckboxChange}
				/>
			</Box>
			<Box mt={2}>
				<BgCollapseTable
					orderBy={orderBy}
					order={order}
					handleSortRequest={handleSortRequest}
					headers={connectivityTableHeaders}
					rows={rows}
					onClick={handleRowClick}
				/>
			</Box>
			{selectedConnection &&
				<ConnectivityDialog open={dialogOpen} onClose={() => setDialogOpen(false)} selectedConnection={selectedConnection} />
			}
		</Container>

	);
};

export default BrainRegionConnectionsContainer;