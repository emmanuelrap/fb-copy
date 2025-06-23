import { Box } from "@mui/material";
import "./App.css";
import AppBar from "./components/AppBar/AppBar";
import MainContain from "./components/mainContain/MainContain";

function App() {
	return (
		<Box>
			<AppBar />
			<MainContain />
		</Box>
	);
}

export default App;
