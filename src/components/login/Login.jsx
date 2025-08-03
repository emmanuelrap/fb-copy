import React, { useState } from "react";
import { Box, TextField, Typography, Button, Paper, Divider, Grid, InputAdornment, IconButton } from "@mui/material";
import { authUser, createUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/slices/userSlice";
import { toggleReloadUsers } from "../../redux/slices/appSlice";
import AddIcon from "@mui/icons-material/Add";

export default function LoginPage() {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [isRegistering, setIsRegistering] = useState(false);
	const [form, setForm] = useState({
		full_name: "",
		email: "",
		password: "",
		password2: "",
	});
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const addGmail = () => {
		if (!form.email.includes("@gmail.com")) {
			setForm((prev) => ({
				...prev,
				email: prev.email + "@gmail.com",
			}));
		}
	};

	const validate = () => {
		const newErrors = {};

		if (!form.email) newErrors.email = "El correo es requerido";
		if (!form.password) newErrors.password = "La contraseña es requerida";

		if (isRegistering) {
			if (!form.full_name) newErrors.name = "El nombre es requerido";
			if (!form.password2) {
				newErrors.password2 = "Confirma tu contraseña";
			} else if (form.password !== form.password2) {
				newErrors.password2 = "Las contraseñas no coinciden";
			}
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		if (e) e.preventDefault();
		setLoading(true);
		console.log("handleSubmit", isRegistering);

		if (!validate()) {
			setLoading(false);
			return;
		}

		try {
			// Simular mínimo 2 segundos de espera
			await new Promise((resolve) => setTimeout(resolve, 1000));

			if (isRegistering) {
				console.log("Registrando:", form);
				await createUser({
					username: form.full_name,
					email: form.email,
					password: form.password,
					full_name: form.full_name,
					avatar_url: "",
					cover_photo_url: "",
				});
				console.log("Registro Exitoso");
				Swal.fire("Registro Completado", "Ya puedes acceder con tu correo y contraseña", "success");
				setIsRegistering(false);
			} else {
				console.log("Iniciando sesión con:", {
					email: form.email,
					password: form.password,
				});
				const result = await authUser({
					email: form.email,
					password: form.password,
					lastconnection: new Date().toISOString(), // UTC
				});

				localStorage.setItem("user", JSON.stringify(result.user));

				//obtener usuarios para el chat
				//dispatch(fetchUsers());
				dispatch(toggleReloadUsers());

				navigate("/home");

				console.log("Inicio de sesión exitoso");
			}
		} catch (err) {
			console.error("Error:", err);
			Swal.fire("Error", "Revisa tus datos, algo salió mal", "error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Grid container sx={{ height: "100vh", backgroundColor: "#f0f2f5" }}>
			{/* Lado izquierdo */}
			<Grid
				item
				xs={12}
				md={6}
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					pl: { xs: 2, md: 12 },
					pr: { xs: 2, md: 6 },
				}}
			>
				<Typography
					variant='h2'
					sx={{
						color: "#1877f2",
						fontWeight: "bold",
						fontSize: { xs: "2.5rem", md: "4rem" },
					}}
				>
					SocialApp
				</Typography>
				<Typography
					variant='h5'
					sx={{
						mt: 2,
						fontWeight: 400,
						fontSize: { xs: "1.1rem", md: "1.5rem" },
						maxWidth: 500,
					}}
				>
					Clon de FB para practicar diseños, base de datos relacionales, redux, MUI, React, jsx, prisma, cloudinary, node, express...
				</Typography>
				<br />

				<Typography variant='h6' sx={{ textAlign: "center" }}>
					<strong>Ing. Carlos Zambrano</strong>
				</Typography>
			</Grid>

			{/* Lado derecho */}
			<Grid
				item
				xs={12}
				md={6}
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					py: 4,
				}}
			>
				<Paper
					elevation={4}
					sx={{
						width: "100%",
						maxWidth: 400,
						p: 4,
						borderRadius: 3,
						backgroundColor: "white",
					}}
				>
					<Typography variant='h5' sx={{ textAlign: "center", fontWeight: "bold" }}>
						{isRegistering ? "Crear cuenta nueva" : "Iniciar sesión"}
					</Typography>

					<Box component='form' noValidate autoComplete='off' sx={{ mt: 3 }} onSubmit={handleSubmit}>
						{isRegistering && (
							<TextField label='Nombre completo' name='full_name' value={form.full_name} onChange={handleChange} fullWidth margin='normal' error={!!errors.name} helperText={errors.name} />
						)}

						<TextField
							label='Correo electrónico'
							name='email'
							type='email'
							value={form.email}
							onChange={handleChange}
							fullWidth
							margin='normal'
							error={!!errors.email}
							helperText={errors.email}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<Button variant='outlined' onClick={addGmail} edge='end' aria-label='add gmail' sx={{ textTransform: "none" }}>
											@gmail.com
										</Button>
									</InputAdornment>
								),
							}}
						/>

						<TextField
							label='Contraseña'
							name='password'
							type='password'
							value={form.password}
							onChange={handleChange}
							fullWidth
							margin='normal'
							error={!!errors.password}
							helperText={errors.password}
						/>

						{isRegistering && (
							<>
								<TextField
									label='Confirmar contraseña'
									name='password2'
									type='password'
									value={form.password2}
									onChange={handleChange}
									fullWidth
									margin='normal'
									error={!!errors.password2}
									helperText={errors.password2}
								/>
							</>
						)}

						<Button
							variant='contained'
							fullWidth
							loading={loading}
							sx={{
								mt: 3,
								py: 1.5,
								fontSize: "1rem",
								fontWeight: "bold",
								backgroundColor: "#1877f2",
								"&:hover": {
									backgroundColor: "#166fe5",
								},
							}}
							type='submit'
						>
							<Typography>{isRegistering ? "Registrarte" : "Iniciar sesión"}</Typography>
						</Button>

						{!isRegistering && (
							<Typography
								variant='body2'
								sx={{
									mt: 2,
									color: "#1877f2",
									cursor: "pointer",
									textAlign: "center",
								}}
							>
								¿Olvidaste tu contraseña?
							</Typography>
						)}

						<Divider sx={{ my: 3 }} />

						<Button
							variant='outlined'
							fullWidth
							onClick={() => setIsRegistering(!isRegistering)}
							sx={{
								textTransform: "none",
								fontWeight: "bold",
								py: 1.2,
							}}
						>
							<Typography>{isRegistering ? "¿Ya tienes cuenta? Inicia sesión" : "Crear cuenta nueva"}</Typography>
						</Button>
					</Box>
				</Paper>
			</Grid>
		</Grid>
	);
}
