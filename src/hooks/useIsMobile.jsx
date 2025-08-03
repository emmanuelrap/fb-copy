import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 768) {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkScreen = () => {
			setIsMobile(window.innerWidth <= breakpoint);
		};

		checkScreen(); // ejecutar al inicio

		window.addEventListener("resize", checkScreen);
		return () => window.removeEventListener("resize", checkScreen);
	}, [breakpoint]);

	return isMobile;
}
