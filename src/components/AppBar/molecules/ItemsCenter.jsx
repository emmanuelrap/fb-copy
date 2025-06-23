import { Box, Button } from "@mui/material";
import React, { useState } from "react";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import StoreIcon from "@mui/icons-material/Store";

import HomeIcon from "@mui/icons-material/Home";

const ItemsCenter = () => {
	const [value, setValue] = useState("1");

	const handleChange = (event, newValue) => {
		console.log("Presionando....", newValue);
		setValue(newValue);
	};

	return (
		<Box sx={{ display: "flex", flex: 1, justifyContent: "center" }}>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<TabList onChange={handleChange} aria-label='lab API tabs example'>
						<Tab icon={<HomeIcon sx={{ fontSize: 32 }} />} value='1' />
						<Tab icon={<OndemandVideoIcon sx={{ fontSize: 32 }} />} value='2' />
						<Tab icon={<StoreIcon sx={{ fontSize: 32 }} />} value='3' />
					</TabList>
				</Box>
			</TabContext>
		</Box>
	);
};

export default ItemsCenter;
