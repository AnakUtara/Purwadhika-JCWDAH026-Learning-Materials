import express, { type Request, type Response } from "express";

const app = express();
app.use(express.json());

// ⚠️ VULNERABILITY 1 (SAST): Hardcoded sensitive API key
const API_SECRET_KEY: string = "sk_live_998877665544332211_SUPER_SECRET";

interface CalculateRequestBody {
	formula: string;
}

// Safe public route
app.get("/", (req: Request, res: Response) => {
	res.send("Server is running safely!");
});

// ⚠️ VULNERABILITY 2 (SAST + DAST): Insecure eval execution
app.post(
	"/api/calculate",
	(req: Request<{}, {}, CalculateRequestBody>, res: Response) => {
		const { formula } = req.body;

		try {
			// Dangerous: evaluating user-supplied input as code
			const result = eval(formula);
			res.json({ result });
		} catch (err) {
			res.status(400).json({ error: "Invalid formula" });
		}
	},
);

const PORT: number = 8000;
app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
