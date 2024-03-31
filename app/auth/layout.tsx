import { Navbar } from "@/components/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex h-full">
        <section className="w-0 md:w-[35%] lg:w-[55%] transition-all  md:border-r-2 flex flex-col h-full flex-shrink"></section>
        <section className="h-full flex flex-grow justify-center items-center">
          {children}
        </section>
      </div>
    </div>
  );
}
