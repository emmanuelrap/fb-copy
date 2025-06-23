import { Box } from "@mui/material";
import React from "react";
import GrupsList from "./molecules/GrupsList";
import ChatList from "./molecules/ChatList";
import Posts from "./molecules/Posts";

const Inicio = () => {
	return (
		<Box sx={{ display: "flex", direction: "row" }}>
			<Box sx={{ display: "flex", flex: 3 }}>
				<GrupsList />
			</Box>
			<Box sx={{ display: "flex", flex: 6, background: "#55c" }}>
				<Posts />
			</Box>
			<Box sx={{ display: "flex", flex: 3 }}>
				<ChatList />
			</Box>
		</Box>
	);
};

export default Inicio;
