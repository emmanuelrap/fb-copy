import { Box } from "@mui/material";
import React, { useState } from "react";
import Inicio from "./inicio/Inicio";

const ComponenteA = () => <Inicio />;
const ComponenteB = () => <Box>Componente B</Box>;
const ComponenteC = () => <Box>Componente C</Box>;

const MainContain = () => {
	const [option, setOption] = useState("A");

	return (
		<Box className='MainContain'>
			{option === "A" && <ComponenteA />}
			{option === "B" && <ComponenteB />}
			{option === "C" && <ComponenteC />}
		</Box>
	);
};

export default MainContain;
