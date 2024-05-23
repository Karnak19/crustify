/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [{ hostname: "*.supabase.co" }, { hostname: "images.unsplash.com" }],
	},
};

export default nextConfig;
