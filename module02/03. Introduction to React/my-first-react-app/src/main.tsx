import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router";
import About from "./pages/About";
import Layout from "./components/layout/layout";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<App />} />
					<Route path="about" element={<About />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
