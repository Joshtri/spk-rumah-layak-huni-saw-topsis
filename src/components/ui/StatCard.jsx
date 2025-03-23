import { Button, Card } from "flowbite-react";
import { NavLink } from "react-router-dom";

export default function StatCard({ children, title, navTo, navText, icon }) {
  return (
    <Card
      className="w-full h-[15rem] flex flex-col border border-gray-300 rounded-lg shadow-lg transition-all duration-300 
      hover:shadow-xl hover:scale-105 hover:border-gray-400"
    >
      <div className="flex flex-col h-full relative">
        {" "}
        {/* Added relative here */}
        {/* Header with fixed height */}
        <div className="h-16 flex items-center gap-3">
          {icon && <div className="text-4xl text-gray-700">{icon}</div>}
          {title && <h5 className="text-2xl font-semibold text-gray-900 line-clamp-2">{title}</h5>}
        </div>
        {/* Content area with fixed position relative to button */}
        <div className="flex-1 flex items-center justify-center pb-12">
          <div className="text-lg text-gray-700">{children}</div>
        </div>
        {/* Navigation button with absolute positioning */}
        {navTo && (
          <div className="absolute bottom-0 right-0">
            <NavLink to={navTo}>
              <Button className="bg-blue-600 text-white hover:bg-blue-800 hover:shadow-md transition-all">
                {navText}
              </Button>
            </NavLink>
          </div>
        )}
      </div>
    </Card>
  );
}
