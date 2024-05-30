export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Next.js + NextUI",
	description: "Make beautiful websites regardless of your design experience.",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
 
   
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    }
	],
	navMenuItems: [
		{
			label: "Profile",
			href: "/profile",
		},
		{
			label: "Dashboard",
			href: "/dashboard",
		},
		{
			label: "Projects",
			href: "/projects",
		},
	
		{
			label: "Calendar",
			href: "/calendar",
		},
	
	
		{
			label: "Logout",
			href: "/logout",
		},
	],
	links: {
		github: "https://github.com/chigoKawa",
		twitter: "https://twitter.com/chigoriddim",
		discord: "https://discord.gg/chigoriddim",
    sponsor: "https://patreon.com/chigoriddim"
	},
};
