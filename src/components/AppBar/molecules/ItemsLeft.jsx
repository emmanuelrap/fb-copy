import React, { useState } from "react";
import { Box, Avatar, TextField, Autocomplete, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "../../../hooks/useIsMobile";

const recentSearches = ["Carlos Zambrano", "Recetas caceras", "Videos de risa"];

const ItemsLeft = () => {
	const isMobile = useIsMobile();
	const [focused, setFocused] = useState(false);

	const navigate = useNavigate();
	return (
		<Box
			sx={{
				display: "flex",
				flex: 1,
				justifyContent: "left",
				alignItems: "center",
			}}
		>
			<IconButton
				onClick={() => navigate("/home")}
				sx={{
					"&:hover": {
						backgroundColor: "transparent", // quita el círculo gris del hover
					},
				}}
			>
				<Avatar sx={{ width: 36, height: 36 }} alt='Mi perfil' src='/statics/images/icons/fb.png' />
			</IconButton>

			<Box sx={{ position: "relative", width: focused ? 250 : isMobile ? 65 : 250, transition: "width 0.3s ease" }}>
				<SearchIcon
					sx={{
						position: "absolute",
						top: "50%",
						left: 12,
						transform: "translateY(-50%)",
						color: "#666",
						fontSize: 20,
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
							fontSize: "0.75rem",
							marginTop: "0.2rem",
							marginLeft: "1.4rem",
						},
						"& .MuiOutlinedInput-notchedOutline": {
							// borderColor: "red", // Color del borde
							borderWidth: 0, // Grosor del borde
						},
					}}
					renderInput={(params) => <TextField {...params} label={isMobile ? "" : "Buscar en Facebook"} variant='outlined' onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />}
				/>
			</Box>
		</Box>
	);
};

export default ItemsLeft;
