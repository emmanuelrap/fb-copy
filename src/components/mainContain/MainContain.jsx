import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Inicio from "./inicio/Inicio";

import VideosTab from "./videosTab/VideosTab";
import { useSelector } from "react-redux";
import MarketPlaceTab from "./marketPlaceTab/MarketplaceTab";
import AppBar from "../AppBar/AppBar";
import { useParams } from "react-router-dom";

const ComponenteA = ({ idSharedPost }) => <Inicio idSharedPost={idSharedPost} />;
const ComponenteB = () => <VideosTab />;
const ComponenteC = () => <MarketPlaceTab />;

const MainContain = () => {
	const { idSharedPost } = useParams();
	const option = useSelector((state) => state.mainContain.option);

	return (
		<Box>
			<AppBar pageSelected={"A"} onlyHomeIcon={false} />
			<Box className='MainContain'>
				{option === "A" && <ComponenteA idSharedPost={idSharedPost} />}
				{option === "B" && <ComponenteB />}
				{option === "C" && <ComponenteC />}
			</Box>
		</Box>
	);
};

export default MainContain;
