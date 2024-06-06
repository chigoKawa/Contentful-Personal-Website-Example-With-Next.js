import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import BreadCrumbs from "../_components/bread-crumbs";
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
  return (
    <section>
      <div className="spacing-component-max-width px-2 pt-10 ">
        <BreadCrumbs />
      </div>
      {children}
    </section>
  );
}
