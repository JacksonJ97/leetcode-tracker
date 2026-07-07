export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex min-h-screen">
      <div className="bg-surface border-border hidden flex-1 shrink-0 border-r p-4 xl:block">
        Image
      </div>
      <div className="flex flex-1 shrink basis-1/4 items-center justify-center p-4">
        {children}
      </div>
    </main>
  );
}
