import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative overflow-clip">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
