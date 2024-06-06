
import BreadCrumbs from "./_components/bread-crumbs";
export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    slug: string;
    catagory: string;
  };
}) {
  return (
    <section>
      {/* <div className="spacing-component-max-width px-2 pt-10 ">
        <BreadCrumbs  />
      </div> */}

      {children}
    </section>
  );
}
