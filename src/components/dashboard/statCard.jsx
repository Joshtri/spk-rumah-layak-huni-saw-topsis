import { Card, Button } from "flowbite-react";
import { NavLink } from "react-router-dom";

export default function StatCard({ children, title, navTo, navText }) {
  return (
    <Card
      className="w-full h-[20rem]"
      theme={{
        root: {
          base: "bg-white border border-gray-200 rounded-lg shadow transition-shadow duration-300 hover:shadow-md hover:shadow-stone-500 ",
        },
      }}
    >
      {title && <h5 className="text-xl font-bold text-black">{title}</h5>}

      {children}

      {navTo && (
        <div className="mt-auto flex justify-end w-full">
          <NavLink to={navTo}>
            <Button className="bg-slate-800 text-white hover:bg-white hover:text-black hover:font-bold">
              {navText}
            </Button>
          </NavLink>
        </div>
      )}
    </Card>
  );
}
