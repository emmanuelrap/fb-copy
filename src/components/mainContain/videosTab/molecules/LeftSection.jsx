import * as React from "react";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, IconButton, Autocomplete, TextField, Paper } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import MovieIcon from "@mui/icons-material/Movie";
import ExploreIcon from "@mui/icons-material/Explore";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SearchIcon from "@mui/icons-material/Search";

const recentSearches = ["Carlos Zambrano", "Recetas caceras", "Videos de risa"];

const tabs = [
	{ icon: <HomeIcon />, label: "Inicio" },
	{ icon: <LiveTvIcon />, label: "En vivo" },
	{ icon: <MovieIcon />, label: "Reels" },
	{ icon: <ExploreIcon />, label: "Explorar" },
	{ icon: <BookmarkIcon />, label: "Guardados" },
];

const VideosTab = () => {
	const [selectedTab, setSelectedTab] = React.useState("Inicio");
	const [focused, setFocused] = React.useState(false);

	const handleSelect = (label) => {
		console.log("Seleccionado:", label);
		setSelectedTab(label);
	};

	return (
		<Paper
			sx={{
				position: "sticky",
				top: "3.5rem",
				width: "100%",
				height: "100vh",
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					px: "1rem",
					mb: 2,
				}}
			>
				<Typography sx={{ fontSize: 24, fontWeight: "bold" }}>Videos</Typography>
				<IconButton onClick={() => console.log("Settings...")}>
					<SettingsIcon />
				</IconButton>
			</Box>

			{/* BUSCADOR ---------------------*/}
			<Box sx={{ position: "relative", mx: "1rem", mb: "1rem" }}>
				<SearchIcon
					sx={{
						position: "absolute",
						top: "50%",
						left: 12,
						transform: "translateY(-50%)",
						color: "#666",
						fontSize: 22,
						pointerEvents: "none",
						zIndex: 1,
						opacity: focused ? 0 : 1,
						transition: "opacity 0.3s",
					}}
				/>
				<Autocomplete
					disablePortal
					options={recentSearches}
					size='small'
					sx={{
						"& .MuiOutlinedInput-root": {
							borderRadius: "32px",
							backgroundColor: "#f2f4f7",
							paddingLeft: "2.5rem",
						},
						"& .MuiInputLabel-root": {
							fontSize: "0.85rem",
						},
						"& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
							fontSize: "0.95rem",

							marginLeft: "1.75rem",
						},
						"& .MuiOutlinedInput-notchedOutline": {
							// borderColor: "red", // Color del borde
							borderWidth: 0, // Grosor del borde
						},
					}}
					renderInput={(params) => <TextField {...params} label='Buscar videos' variant='outlined' onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />}
				/>
			</Box>

			{/* MENU LIST ---------------------*/}
			<List>
				{tabs.map((tab) => {
					const isSelected = selectedTab === tab.label;
					return (
						<ListItem disablePadding key={tab.label}>
							<ListItemButton sx={{ py: 1.5 }} selected={isSelected} onClick={() => handleSelect(tab.label)}>
								<ListItemIcon>{tab.icon}</ListItemIcon>
								<ListItemText primary={<Typography sx={{ fontWeight: isSelected ? "bold" : "normal" }}>{tab.label}</Typography>} />
							</ListItemButton>
						</ListItem>
					);
				})}
			</List>
		</Paper>
	);
};

export default VideosTab;
