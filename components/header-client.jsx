"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Heart, CarFront, LayoutDashboard, ArrowLeft, Menu} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Badge } from "./ui/badge";

function HeaderClient({ isAdminPage, isAdmin }) {
	const [menuOpen, setMenuOpen] = useState(false);

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/cars', label: 'Cars' },
		{ href: '/about-us', label: 'About Us' },
		{ href: '/contact-us', label: 'Contact' },
	];

	return (
		<header className="fixed top-0 w-full bg-gradient-to-br from-[#2af598] to-[#009efd] backdrop-blur-md z-50 border-b">
			<nav className="mx-auto px-4 py-4 flex items-center justify-between">
				<Link href={isAdminPage ? "/admin" : "/"} className="flex items-center">
					<Image
						src={"/logo.png"}
						alt="Veylo"
						width={200}
						height={60}
						className="h-12 w-auto object-contain"
					/>
				</Link>

				{/* Desktop Navigation Links */}
				<div className="hidden md:flex  cursor-pointer items-center space-x-6">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="text-gray-100 hover:text-black font-medium"
						>
							{link.label}
						</Link>
					))}
				</div>

				{/*Mobile Menu Button*/} 

				<div className="md:hidden flex items-center">
					<button
						aria-label="Open menu"
						onClick={() => setMenuOpen((open) => !open)}
						className="p-2 rounded hover:bg-gray-100 focus:outline-none"
						type="button"
					>
						<Menu size={28} />
					</button>
				</div>

				{/* User/Account Buttons */}
				<div className="hidden md:flex items-center space-x-4 ml-6">
					{isAdminPage ? (
						<Link href="/">
							<Button variant="outline" className="flex cursor-pointer items-center gap-2">
								<ArrowLeft size={18} />
								<span>Back to Home</span>
							</Button>
						</Link>
					) : (
						<SignedIn>
							{!isAdmin && (
								<Link href="/reservations">
									<Button variant="outline">
										<CarFront size={18} />
										<span className="hidden cursor-pointer md:inline">Test Drives</span>
									</Button>
								</Link>
							)}
							<Link href="/saved-cars">
								<Button>
									<Heart size={18} />
									<span className="hidden cursor-pointer md:inline">Wishlist</span>
								</Button>
							</Link>
							{isAdmin && (
								<Link href="/admin">
									<Button variant="outline">
										<LayoutDashboard size={18} />
										<span className="hidden cursor-pointer md:inline">Dashboard</span>
									</Button>
								</Link>
							)}
						</SignedIn>
					)}
					<SignedOut>
						{!isAdminPage && (
							<SignInButton forceRedirectUrl="/">
								<Button variant="outline">Sign In</Button>
							</SignInButton>
						)}
					</SignedOut>
					<SignedIn>
						<UserButton
							appearance={{
								elements: {
									avatarBox: "h-10 w-10",
								},
							}}
						/>
					</SignedIn>
				</div>
			</nav>

			{/* Mobile Menu Drawer */}
			{menuOpen && (
				<div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-50 animate-fade-in">
					<div className="flex flex-col px-6 py-4 space-y-4">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="text-gray-700 hover:text-blue-700 font-medium text-lg"
								onClick={() => setMenuOpen(false)}
							>
								{link.label}
							</Link>
						))}
						<div className="flex flex-col space-y-2 mt-4">
							{isAdminPage ? (
								<Link href="/">
									<Button variant="outline" className="flex items-center gap-2 w-full">
										<ArrowLeft size={18} />
										<span>Back to Home</span>
									</Button>
								</Link>
							) : (
								<SignedIn>
									{!isAdmin && (
										<Link href="/reservations">
											<Button variant="outline" className="w-full">
												<CarFront size={18} />
												<span>Test Drives</span>
											</Button>
										</Link>
									)}
									<Link href="/saved-cars">
										<Button className="w-full">
											<Heart size={18} />
											<span>Wishlist</span>
										</Button>
									</Link>
									{isAdmin && (
										<Link href="/admin">
											<Button variant="outline" className="w-full">
												<LayoutDashboard size={18} />
												<span>Dashboard</span>
											</Button>
										</Link>
									)}
								</SignedIn>
							)}
							<SignedOut>
								{!isAdminPage && (
									<SignInButton forceRedirectUrl="/">
										<Button variant="outline" className="w-full">Sign In</Button>
									</SignInButton>
								)}
							</SignedOut>
							<SignedIn>
								<div className="flex justify-center mt-2">
									<UserButton
										appearance={{
											elements: {
												avatarBox: "h-10 w-10",
											},
										}}
									/>
								</div>
							</SignedIn>
						</div>
					</div>
				</div>
			)}
		</header>
	);
}

export default HeaderClient;