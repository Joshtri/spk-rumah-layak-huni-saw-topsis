import { Card, Button } from "flowbite-react";
import { NavLink } from "react-router-dom";

export default function IconCards({ title, description, icon, path, buttonText }) {
  return (
    <Card
      className="max-w-md w-full"
      theme={{
        root: {
          base: "bg-white border border-gray-200 rounded-lg shadow transition-shadow duration-300 hover:shadow-md hover:shadow-stone-500 ",
        },
      }}
    >
      <div className="grid grid-cols-[auto_1fr] gap-6">
        {icon && <div className="flex items-center justify-center text-black">{icon}</div>}

        <div className="flex flex-col justify-center">
          {title && <h5 className="text-xl font-bold text-black">{title}</h5>}

          {description && <p className="text-black">{description}</p>}

          {path && (
            <div className="flex justify-end w-full">
              <NavLink to={path}>
                <Button className="bg-slate-800 text-white hover:bg-white hover:text-black hover:font-bold">
                  {buttonText}
                </Button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
