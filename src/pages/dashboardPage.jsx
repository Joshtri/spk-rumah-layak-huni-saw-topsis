import LayoutRoot from "./layout";
import IconCards from "../components/iconCards";
import { Home } from "lucide-react";

export default function DashboardPage() {
  return (
    <LayoutRoot>
      <div className="border-2 border-green-500 grid grid-rows-[auto,1fr] gap-6 h-full">
        {/* greetings */}
        <div className="border-red-500 border-2 flex justify-center items-center h-full">
          <h1 className="text-6xl font-bold">Selamat Datang!</h1>
        </div>

        {/* cards */}
        <div className="border-blue-500 border-2 grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
          <IconCards
            title={"Hello"}
            description={"This is a card that contains title, desc, and icon"}
            icon={<Home />}
          />
          <IconCards
            title={"Hello"}
            description={"This is a card that contains title, desc, and icon"}
            icon={<Home />}
          />
          <IconCards
            title={"Hello"}
            description={"This is a card that contains title, desc, and icon"}
            icon={<Home />}
          />
        </div>
      </div>
    </LayoutRoot>
  );
}
