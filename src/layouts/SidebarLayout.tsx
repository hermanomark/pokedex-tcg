import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/AppSidebar"
import ModeToggle from "@/components/ModeToggle";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="container min-h-screen">
        <SidebarTrigger className="cursor-pointer" />
        <ModeToggle />
        <div className="container mx-auto px-4 py-4">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}

export default SidebarLayout;