import { BottomNavigation, BottomNavigationAction, Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import StoreIcon from "@mui/icons-material/Store";
import HomeIcon from "@mui/icons-material/Home";

import { useDispatch } from "react-redux";
import { setCurrentTab } from "../../../redux/slices/mainContainSlice";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "../../../hooks/useIsMobile";

const ItemsCenter = ({ pageSelected, onlyHomeIcon }) => {
	const navigate = useNavigate();
	const isMobile = useIsMobile();
	const [currentLocalStateTab, setCurrentLocalStateTab] = useState("A");

	const dispatch = useDispatch();

	const handleChange = (event, newValue) => {
		console.log("Presionando...", newValue);
		dispatch(setCurrentTab(newValue));
		setCurrentLocalStateTab(newValue);
	};

	const handleClickHome = () => {
		if (onlyHomeIcon) navigate("/");
	};

	useEffect(() => {
		setCurrentLocalStateTab(pageSelected);
	}, [pageSelected]);

	return (
		<Box sx={{ display: "flex", flex: 1, justifyContent: "center" }}>
			{isMobile ? (
				<BottomNavigation
					value={currentLocalStateTab}
					onChange={handleChange}
					sx={{
						position: "fixed",
						bottom: 0,
						left: 0,
						right: 0,
						zIndex: 1300,
					}}
				>
					<BottomNavigationAction label='Inicio' icon={<HomeIcon />} value='A' />
					<BottomNavigationAction label='Videos' icon={<OndemandVideoIcon />} value='B' />
					<BottomNavigationAction label='Tienda' icon={<StoreIcon />} value='C' />
				</BottomNavigation>
			) : (
				<TabContext>
					<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
						{onlyHomeIcon ? (
							<TabList onChange={handleChange} aria-label='lab API tabs example'>
								<Tab icon={<HomeIcon sx={{ fontSize: currentLocalStateTab == "A" ? 36 : 30, color: currentLocalStateTab == "A" && "primary.main" }} />} onClick={handleClickHome} value='A' />
							</TabList>
						) : (
							<TabList onChange={handleChange} aria-label='lab API tabs example'>
								<Tab icon={<HomeIcon sx={{ fontSize: currentLocalStateTab == "A" ? 36 : 30, color: currentLocalStateTab == "A" && "primary.main" }} />} onClick={handleClickHome} value='A' />
								<Tab icon={<OndemandVideoIcon sx={{ fontSize: currentLocalStateTab == "B" ? 36 : 30, color: currentLocalStateTab == "B" && "primary.main" }} />} value='B' />
								<Tab icon={<StoreIcon sx={{ fontSize: currentLocalStateTab == "C" ? 36 : 30, color: currentLocalStateTab == "C" && "primary.main" }} />} value='C' />
							</TabList>
						)}
					</Box>
				</TabContext>
			)}
		</Box>
	);
};

export default ItemsCenter;
