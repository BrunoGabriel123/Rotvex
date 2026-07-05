module.exports = {
  'frontend/src/**/*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  'backend/src/**/*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,yml,yaml}': ['prettier --write'],
  '*.{js,jsx,ts,tsx}': ['eslint --fix'],
};
