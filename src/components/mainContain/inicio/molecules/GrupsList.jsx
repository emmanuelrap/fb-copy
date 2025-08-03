import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import Groups2Icon from "@mui/icons-material/Groups2";
import GroupIcon from "@mui/icons-material/Group";
import { Avatar, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const itemsDefault = [
	{ image: <PanoramaFishEyeIcon />, text: "Meta AI" },
	{ image: <GroupIcon />, text: "Amigos" },
	{ image: <Groups2Icon />, text: "Grupos" },
];

const myItems = [
	{ image: "/statics/images/avatars/perfil.jpg", text: "Balatro Fans" },
	{ image: "/statics/images/avatars/perfil.jpg", text: "Aberraciones Culinarias" },
	{ image: "/statics/images/avatars/perfil.jpg", text: "Indrive Conductores" },
];

const GrupsList = () => {
	const navigate = useNavigate();

	const handleClickPerfil = () => {
		navigate(`/perfil/${JSON.parse(localStorage.getItem("user") || "{}").id}`);
	};
	return (
		<Box
			sx={{
				position: "sticky",
				top: "4rem",
				right: 0,
				width: "100%",
				height: "100vh",
			}}
		>
			<nav aria-label='default items list'>
				<List>
					<ListItem disablePadding key={JSON.parse(localStorage.getItem("user") || "{}").full_name}>
						<ListItemButton onClick={handleClickPerfil}>
							<ListItemIcon>
								<Avatar src={JSON.parse(localStorage.getItem("user") || "{}").avatar_url} alt={JSON.parse(localStorage.getItem("user") || "{}").full_name} sx={{ width: 32, height: 32 }} />
							</ListItemIcon>
							<ListItemText primary={JSON.parse(localStorage.getItem("user") || "{}").full_name} />
						</ListItemButton>
					</ListItem>
					{itemsDefault.map((i) => {
						return (
							<ListItem disablePadding key={i.text}>
								<Tooltip title='no disponible aún'>
									<ListItemButton>
										{typeof i.image === "string" ? (
											<>
												<ListItemIcon>
													<Avatar src={i.image} alt={i.text} sx={{ width: 32, height: 32 }} />
												</ListItemIcon>
												<ListItemText primary={i.text} />
											</>
										) : (
											<>
												<ListItemIcon>{i.image}</ListItemIcon>
												<ListItemText primary={i.text} />{" "}
											</>
										)}
									</ListItemButton>
								</Tooltip>
							</ListItem>
						);
					})}
				</List>
			</nav>
			<Divider sx={{ mx: "1rem" }} />
			<Typography sx={{ marginLeft: "1rem", marginTop: "1rem", fontSize: 16, fontWeight: "bold", color: "#999" }}>Tus accesos directos</Typography>
			<nav aria-label='secondary mailbox folders'>
				<List>
					{myItems.map((i) => {
						return (
							<ListItem disablePadding key={i.text}>
								<Tooltip title='no disponible aún'>
									<ListItemButton>
										<ListItemIcon>
											<Avatar src={i.image} alt={i.text} sx={{ width: 32, height: 32, borderRadius: 2 }} />
										</ListItemIcon>
										<ListItemText primary={i.text} />
									</ListItemButton>
								</Tooltip>
							</ListItem>
						);
					})}
				</List>
			</nav>
		</Box>
	);
};

export default GrupsList;
