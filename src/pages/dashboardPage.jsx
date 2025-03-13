import LayoutRoot from "./layout";
import IconCards from "../components/iconCards";
import { Home } from "lucide-react";

export default function DashboardPage() {
  return (
    <LayoutRoot>
      <div className=" grid grid-rows-[auto,1fr] gap-10 h-full">
        {/* greetings */}
        <div className="flex justify-center items-center h-full text-center">
          <h1 className="text-6xl font-bold">Selamat Datang!</h1>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
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
