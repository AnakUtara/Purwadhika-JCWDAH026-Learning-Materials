import tseslint from "typescript-eslint";
import securityPlugin from "eslint-plugin-security";
import noSecretsPlugin from "eslint-plugin-no-secrets";

export default tseslint.config(
	...tseslint.configs.recommended,
	securityPlugin.configs.recommended,
	{
		files: ["**/*.ts", "**/*.js"],
		plugins: {
			"no-secrets": noSecretsPlugin,
		},
		rules: {
			// Flags eval usage
			"security/detect-eval-with-expression": "error",

			// Flags high-entropy strings (hardcoded API keys/passwords)
			"no-secrets/no-secrets": ["error", { tolerance: 4.2 }],
		},
	},
);
