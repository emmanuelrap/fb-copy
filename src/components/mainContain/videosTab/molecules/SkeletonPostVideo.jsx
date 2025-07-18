import React from "react";
import { Card, CardHeader, CardContent, CardActions, Avatar, Skeleton, Box, Typography } from "@mui/material";

const SkeletonPostVideo = () => {
	return (
		<Card sx={{ width: "94%", margin: "1rem auto", borderRadius: 5, boxShadow: 5, mx: "1.5rem" }}>
			<CardHeader
				avatar={<Skeleton variant='circular' width={40} height={40} />}
				title={<Skeleton width='40%' />}
				subheader={<Skeleton width='30%' />}
				action={<Skeleton variant='circular' width={24} height={24} />}
			/>

			<CardContent>
				<Skeleton variant='text' width='80%' />
				<Skeleton variant='text' width='60%' />
			</CardContent>

			<Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
				<Skeleton variant='rectangular' width='90%' height={250} sx={{ borderRadius: 3 }} />
			</Box>

			<CardActions sx={{ justifyContent: "space-around", px: 2 }}>
				<Skeleton variant='rectangular' width='20%' height={30} sx={{ borderRadius: 2 }} />
				<Skeleton variant='rectangular' width='20%' height={30} sx={{ borderRadius: 2 }} />
				<Skeleton variant='rectangular' width='20%' height={30} sx={{ borderRadius: 2 }} />
			</CardActions>

			<Box sx={{ px: 2, pb: 2 }}>
				<Box sx={{ display: "flex", alignItems: "flex-start", mt: 1 }}>
					<Skeleton variant='circular' width={35} height={35} sx={{ mr: 1.5 }} />
					<Skeleton variant='rounded' width='70%' height={40} />
				</Box>
				<Box sx={{ display: "flex", alignItems: "flex-start", mt: 1 }}>
					<Skeleton variant='circular' width={35} height={35} sx={{ mr: 1.5 }} />
					<Skeleton variant='rounded' width='50%' height={40} />
				</Box>
			</Box>
		</Card>
	);
};

export default SkeletonPostVideo;
