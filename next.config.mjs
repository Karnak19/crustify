/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [{ hostname: "*.supabase.co" }, { hostname: "images.unsplash.com" }, { hostname: "localhost" }],
	},
};

export default nextConfig;
