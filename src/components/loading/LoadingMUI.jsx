import React from "react";
import AppBar from "../AppBar/AppBar";
import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingMUI = ({ text }) => {
	return (
		<Box>
			<AppBar pageSelected={null} onlyHomeIcon={true} />
			<Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' minHeight='100vh'>
				<CircularProgress />
				<Typography variant='h6' sx={{ mt: 2 }}>
					{text}
				</Typography>
			</Box>
		</Box>
	);
};

export default LoadingMUI;
