import MainLayout from "@/components/Layout/MainLayout";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout>{children}</MainLayout>;
}
