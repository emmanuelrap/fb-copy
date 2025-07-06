import React from "react";
import ItemsRight from "./molecules/ItemsRight";
import ItemsCenter from "./molecules/ItemsCenter";
import ItemsLeft from "./molecules/ItemsLeft";
import { Paper } from "@mui/material";
import "../../App.css";

const AppBar = ({ pageSelected, onlyHomeIcon }) => {
	return (
		<Paper elevation={3} className='AppBar'>
			<ItemsLeft />
			<ItemsCenter pageSelected={pageSelected} onlyHomeIcon={onlyHomeIcon} />
			<ItemsRight />
		</Paper>
	);
};

export default AppBar;
