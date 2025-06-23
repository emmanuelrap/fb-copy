import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import WidgetsIcon from "@mui/icons-material/Widgets";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { styled } from "@mui/material/styles";

const RoundToggleButton = styled(ToggleButton)(({ theme }) => ({
	width: 40,
	height: 40,
	borderRadius: "50%",
	padding: 0,
	border: `0px solid ${theme.palette.divider}`,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: "#e2e5e9",
	"&.Mui-selected": {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		"&:hover": {
			backgroundColor: theme.palette.primary.dark,
		},
	},
}));

export default function HorizontalToggleButtonsAccount() {
	const [selected, setSelected] = useState("center");

	const handleClick = (value) => {
		setSelected(value);
	};

	return (
		<div style={{ display: "flex", gap: "0.5rem" }}>
			<RoundToggleButton selected={selected === "center"} onChange={() => handleClick("center")} aria-label='widgets'>
				<WidgetsIcon />
			</RoundToggleButton>
			<RoundToggleButton selected={selected === "right"} onChange={() => handleClick("right")} aria-label='messages'>
				<MessageIcon />
			</RoundToggleButton>
			<RoundToggleButton selected={selected === "justify"} onChange={() => handleClick("justify")} aria-label='notifications'>
				<NotificationsIcon />
			</RoundToggleButton>
		</div>
	);
}
