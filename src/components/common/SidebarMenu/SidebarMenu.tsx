import React from "react";
import Button from "../Button/Button";

interface MenuItem {
  label: string;
  onClick: () => void;
  active?: boolean;
  indent?: boolean;
  className?: string; // add this
}

interface SidebarMenuProps {
  items: MenuItem[];
  title?: string;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ items, title }) => {
  return (
    <aside className="w-64 bg-white shadow-lg p-4">
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className={item.indent ? "ml-4" : ""}>
            <Button
              variant="secondary"
              active={item.active}
              className={`w-full text-left ${item.className || ""}`}
              onClick={item.onClick}
            >
              {item.label}
            </Button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarMenu;
