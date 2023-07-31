/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	reactStrictMode: false,
	images: {
		domains: ["flatshare.ribiax.com"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "flatshare.ribiax.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

module.exports = nextConfig;
