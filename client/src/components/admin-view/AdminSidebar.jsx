import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, ChartColumnStacked, ChartNoAxesCombined, LayoutDashboard, ShoppingBasket,  } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const AdminSidebar = ({open, setOpen }) => {
  const navigate = useNavigate();

  const adminSidebarMenuItems = [
    { id: "dashboard", label: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard /> },
    { id: "products", label: "Products", path: "/admin/products", icon: <ShoppingBasket /> },
    { id: "category", label: "Category", path: "/admin/category", icon: <ChartColumnStacked /> },
    { id: "orders", label: "Orders", path: "/admin/orders", icon: <BadgeCheck /> },

  ];

  const MenuItems = () => (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSidebarMenuItems.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            navigate(item.path)
            setOpen(false)
          }}
          className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-700 hover:text-white cursor-pointer"
        >
          {item.icon}
          <span>{item.label}</span>
        </div>
      ))}
    </nav>
  );

  return (
    <Fragment>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-60 bg-white">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex items-center gap-2">
                <ChartNoAxesCombined className="h-5 w-5" />
                <span>Admin Panel</span>
              </SheetTitle>
            </SheetHeader>
            <MenuItems />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-60 flex-col border-r bg-background p-6">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center justify-center gap-2 cursor-pointer"
        >
          <ChartNoAxesCombined className="h-6 w-6 " />
          <h1 className="text-xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
};

export default React.memo(AdminSidebar);
