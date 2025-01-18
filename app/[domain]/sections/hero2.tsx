"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function Hero2({
	name,
	logo,
}: {
	name: string | null;
	logo: string | null;
	subdomain: string;
}) {
	return (
		<section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
			<motion.div
				className="absolute inset-0 bg-gray-50 z-0"
				initial={{ scale: 1.1 }}
				animate={{ scale: 1 }}
				transition={{ duration: 10, ease: "easeOut" }}
			>
				<Image src={logo ? logo : ""} alt="Delicious pepperoni pizza" fill className="object-cover brightness-50" priority />
			</motion.div>
			<div className="relative z-20 text-center">
				<motion.h1
					className="text-5xl md:text-7xl font-bold mb-4 text-shadow-lg"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					{name}
				</motion.h1>
				<motion.p
					className="text-xl md:text-2xl mb-8 text-shadow"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
				>
					Experience pizza perfection in every bite
				</motion.p>
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
					<Link
						href="#pizza-carousel"
						className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 inline-block"
					>
						<motion.span className="inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							Menu
						</motion.span>
					</Link>
				</motion.div>
			</div>
			{/* //gives some rounded bottom form to the image   */}
			<motion.div
				className="absolute bottom-0 left-0 right-0 z-20"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 1 }}
			>
				<svg className="w-full h-auto" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
						fill="white"
					/>
				</svg>
			</motion.div>
		</section>
	);
}
