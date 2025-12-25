export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "dev/**"
    ]
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"] ,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },
    rules: {
      // Add project-specific rules here as needed
    }
  }
];
