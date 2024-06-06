export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    slug: string;
    category: string;
  };
}) {
  return <section>{children}</section>;
}
