import {
  Users,
  LayoutGrid,
  LucideIcon,
  List,
  Layers3,
  UserCog,
  BookOpen,
  Headset,
  MessageCircleQuestion,
  MessagesSquare,
  PlusCircle,
  BookOpenCheck,
  FileText,
  Bell,
  ScanSearch,
  MessageCircleWarning,
  Blocks,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname === "/dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Main",
      menus: [
        {
          href: "",
          label: "Category",
          active: pathname.includes("/dashboard/category"),
          icon: Layers3,
          submenus: [
            {
              href: "/dashboard/category/new",
              label: "New",
              active: pathname === "/dashboard/category/new",
              icon: PlusCircle,
            },
            {
              href: "/dashboard/category",
              label: "List",
              active: pathname === "/dashboard/category",
              icon: List,
            },
          ],
        },
        {
          href: "",
          label: "Service",
          active: pathname.includes("/dashboard/service"),
          icon: Blocks,
          submenus: [
            {
              href: "/dashboard/service/new",
              label: "New",
              active: pathname === "/dashboard/service/new",
              icon: PlusCircle,
            },
            {
              href: "/dashboard/service",
              label: "List",
              active: pathname === "/dashboard/service",
              icon: List,
            },
          ],
        },
      ],
    },
  ];
}
