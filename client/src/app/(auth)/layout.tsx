export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex min-h-screen">
      <div className="bg-surface border-border hidden border-r p-4 xl:block xl:flex-1">
        Image
      </div>
      <div className="flex-1 p-4">{children}</div>
    </main>
  );
}
