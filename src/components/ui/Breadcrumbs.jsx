import { Breadcrumb, BreadcrumbItem } from "flowbite-react";

export default function Breadcrumbs({ pathArray }) {
  return (
    <Breadcrumb>
      {pathArray.map((item, index) => (
        <BreadcrumbItem key={index}>{item}</BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
