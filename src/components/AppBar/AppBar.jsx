import React from "react";
import ItemsRight from "./molecules/ItemsRight";
import ItemsCenter from "./molecules/ItemsCenter";
import ItemsLeft from "./molecules/ItemsLeft";
import { Paper } from "@mui/material";
import "../../App.css";

const AppBar = () => {
	return (
		<Paper elevation={1} className='AppBar'>
			<ItemsLeft />
			<ItemsCenter />
			<ItemsRight />
		</Paper>
	);
};

export default AppBar;
