import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import GrupsList from "./molecules/GrupsList";
import ChatList from "./molecules/ChatList";
import Posts from "./molecules/Posts";

const Inicio = () => {
	return (
		<Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
			<Box sx={{ display: { xs: "none", lg: "flex" }, flex: 3 }}>
				<GrupsList />
			</Box>

			<Box sx={{ display: "flex", flex: 6, background: "#55c" }}>
				<Posts />
			</Box>

			<Box sx={{ display: { xs: "none", md: "flex" }, flex: 3 }}>
				<ChatList />
			</Box>
		</Box>
	);
};

export default Inicio;
