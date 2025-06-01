import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Label } from "@radix-ui/react-label";

// Sample data
const data = {
  navMain: [
    {
      title: "SpaceOMID",
      url: "#",
      items: [
        {
          title: "login",
          url: "/login",
        },
        {
          title: "userlist",
          url: "/users",
        },
        {
          title: "create user",
          url: "/users/create",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>SpaceOMID</SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((menuItem) => (
                  <SidebarMenuItem key={menuItem.title}>
                    {menuItem.title === "login" ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <SidebarMenuButton>
                            {menuItem.title}
                          </SidebarMenuButton>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Login</DialogTitle>
                            <DialogDescription>
                              Please enter your login details below.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4">
                            <div className="grid gap-3">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                              />
                            </div>
                            <div className="grid gap-3">
                              <Label htmlFor="password">Password</Label>
                              <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Login</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <SidebarMenuButton asChild>
                        <a href={menuItem.url}>{menuItem.title}</a>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <footer>
        <div className="p-4 h-auto w-auto">
          <Image
            src="https://spaceomid.com/assets/images/common/logo.svg"
            width={400}
            height={400}
            alt="logo"
          />
        </div>
      </footer>
    </Sidebar>
  );
}
