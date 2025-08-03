import { Paper } from "@mui/material";
import React from "react";
import ItemsLeft from "./molecules/ItemsLeft";

const AppBarMobile = () => {
	return (
		<Paper elevation={3} className='AppBar'>
			<ItemsLeft />
		</Paper>
	);
};

export default AppBarMobile;
