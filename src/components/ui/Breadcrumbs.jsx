import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { NavLink } from "react-router-dom";

export default function Breadcrumbs({ pathArray }) {
  return (
    <Breadcrumb>
      {pathArray.map((item, index) => (
        <BreadcrumbItem key={index}>
          {item.path !== null ? <NavLink to={item.path}>{item.label}</NavLink> : item.label}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
