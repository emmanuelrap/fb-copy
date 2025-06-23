import * as React from "react";
import AccountButtons from "./atoms/AccountButtons";
import { Box } from "@mui/material";

const ItemsRight = () => {
	return (
		<Box sx={{ display: "flex", flex: 1, justifyContent: "right", alignItems: "center", direction: "column" }}>
			<AccountButtons />
		</Box>
	);
};

export default ItemsRight;
