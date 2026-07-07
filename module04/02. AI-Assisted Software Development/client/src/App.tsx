import { Navigate, Route, Routes } from "react-router-dom";
import { ProductsPage } from "@/features/products/products-page";

function App() {
	return (
		<Routes>
			<Route path="/" element={<ProductsPage />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}

export default App;
