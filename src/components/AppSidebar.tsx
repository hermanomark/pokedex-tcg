import { Sparkles, Database, BookOpen, Home } from "lucide-react"
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import pokeballLogo from "@/assets/pokeball.svg";

interface SidebarItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "TCG Cards",
    url: "/cards",
    icon: Sparkles,
  },
  {
    title: "Sets",
    url: "/sets",
    icon: Database,
  },
  {
    title: "Series",
    url: "/series",
    icon: BookOpen,
  }
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel><img className="dark:filter dark:brightness-0 dark:invert" src={pokeballLogo} alt="Pokedex TCG" width={24} height={24} /> &nbsp; Pokedex TCG</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar;