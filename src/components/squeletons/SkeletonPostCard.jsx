import React from "react";
import { Card, CardHeader, CardContent, CardMedia, CardActions, Avatar, Box, Typography, Skeleton, Button } from "@mui/material";

const SkeletonPostCard = () => {
	return (
		<Card sx={{ margin: "1rem auto", borderRadius: 5, boxShadow: 5, mx: "1.5rem" }}>
			<CardHeader
				avatar={
					<Skeleton variant='circular'>
						<Avatar />
					</Skeleton>
				}
				title={<Skeleton width='40%' />}
				subheader={<Skeleton width='30%' />}
				action={<Skeleton variant='circular' width={30} height={30} />}
			/>

			<CardContent>
				<Skeleton variant='text' width='90%' />
				<Skeleton variant='text' width='80%' />
				<Skeleton variant='text' width='95%' />
			</CardContent>

			<CardMedia>
				<Skeleton variant='rectangular' height={250} sx={{ borderRadius: 2 }} />
			</CardMedia>

			<Box sx={{ px: 2, py: 1 }}>
				<Skeleton width='40%' />
			</Box>

			<CardActions disableSpacing sx={{ borderTop: "1px solid #eee", justifyContent: "space-around" }}>
				<Skeleton variant='rectangular' width='25%' height={40} sx={{ borderRadius: 3 }} />
				<Skeleton variant='rectangular' width='25%' height={40} sx={{ borderRadius: 3 }} />
				<Skeleton variant='rectangular' width='25%' height={40} sx={{ borderRadius: 3 }} />
			</CardActions>
		</Card>
	);
};

export default SkeletonPostCard;
