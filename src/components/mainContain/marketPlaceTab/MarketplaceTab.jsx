import React from "react";
import { Card, CardMedia, CardContent, Typography, Grid, Button, Box, CardActions, Paper } from "@mui/material";
import LeftSection from "./molecules/LeftSection";

// 📦 Productos de ejemplo
const products = [
	{
		id: 1,
		title: "Laptop Lenovo",
		price: "$450",
		image: "https://www.costco.com.mx/medias/sys_master/products/h67/hbf/188081224646686.jpg",
	},
	{
		id: 2,
		title: "Silla ergonómica",
		price: "$120",
		image: "https://www.costco.com.mx/medias/sys_master/products/h67/hbf/188081224646686.jpg",
	},
	{
		id: 3,
		title: "Smartphone Samsung",
		price: "$350",
		image: "https://www.costco.com.mx/medias/sys_master/products/h67/hbf/188081224646686.jpg",
	},
	{
		id: 4,
		title: "Zapatillas deportivas",
		price: "$90",
		image: "https://www.costco.com.mx/medias/sys_master/products/h67/hbf/188081224646686.jpg",
	},
	{
		id: 5,
		title: "Auriculares inalámbricos",
		price: "$60",
		image: "https://www.costco.com.mx/medias/sys_master/products/h67/hbf/188081224646686.jpg",
	},
	{
		id: 6,
		title: "Monitor LG 24''",
		price: "$180",
		image: "https://www.costco.com.mx/medias/sys_master/products/h67/hbf/188081224646686.jpg",
	},
	{
		id: 7,
		title: "Zapatillas deportivas",
		price: "$90",
		image: "https://www.costco.com.mx/medias/sys_master/products/h67/hbf/188081224646686.jpg",
	},
	{
		id: 8,
		title: "Auriculares inalámbricos",
		price: "$60",
		image: "https://www.costco.com.mx/medias/sys_master/products/h67/hbf/188081224646686.jpg",
	},
	{
		id: 9,
		title: "Monitor LG 24''",
		price: "$180",
		image: "https://www.costco.com.mx/medias/sys_master/products/h67/hbf/188081224646686.jpg",
	},
];

const MarketPlaceTab = () => {
	return (
		<Paper elevation={3} sx={{ borderRadius: 4 }}>
			<Box sx={{ display: "flex" }}>
				<Box sx={{ display: { xs: "none", lg: "flex" }, flex: 2 }}>
					<LeftSection />
				</Box>
				<Box sx={{ display: "flex", flex: 6, flexDirection: "column", p: 2 }}>
					<Typography variant='h5' fontWeight='bold' gutterBottom>
						Sugerencias de hoy
					</Typography>

					<Grid container spacing={2} justifyContent='center'>
						{products.map((product) => (
							<Grid
								item
								key={product.id}
								xs={12} // 1 item por fila en xs (celular)
								sm={6} // 2 items por fila en (tablet)
								md='auto' // ancho automático en md y superior
								sx={{ flexGrow: 1, flexBasis: "16rem" }} // ancho base, crece para llenar espacio
							>
								<Card
									sx={{
										borderRadius: 2,
										transition: "0.3s",
										"&:hover": {
											boxShadow: 6,
										},
										minWidth: "15rem",
										maxWidth: "20rem",
										margin: "auto", // centra el card dentro del grid item
									}}
								>
									<CardMedia component='img' height='180' image={product.image} alt={product.title} />
									<CardContent>
										<Typography variant='subtitle1' fontWeight='600'>
											{product.title}
										</Typography>
										<Typography variant='body2' color='text.secondary'>
											{product.price}
										</Typography>
									</CardContent>
									<CardActions>
										<Button size='small' sx={{ textTransform: "none" }}>
											Ver más
										</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
				</Box>
			</Box>
		</Paper>
	);
};

export default MarketPlaceTab;
