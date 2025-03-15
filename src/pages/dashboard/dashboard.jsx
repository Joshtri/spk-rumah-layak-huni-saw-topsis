import LayoutRoot from "../layout";
import StatCard from "@/components/dashboard/statCard";

export default function DashboardPage() {
  return (
    <LayoutRoot>
      <div className=" grid grid-rows-[auto,1fr] gap-10 h-full">
        {/* greetings */}
        <div className="flex justify-center items-center h-full text-center">
          <h1 className="text-6xl font-bold">Selamat Datang!</h1>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 h-full lg:mx-32">
          <StatCard
            title="Kriteria"
            navTo="/kriteria"
            navText="Selengkapnya"
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>
                <p className="text-black">Kriteria {index + 1}</p>
              </div>
            ))}
          </StatCard>

          <StatCard
            title="Ranking"
            navTo="/ranking"
            navText="Selengkapnya"
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>
                <p className="text-black">
                  {index + 1}. Alternatif {5 - index}
                </p>
              </div>
            ))}
          </StatCard>
        </div>
      </div>
    </LayoutRoot>
  );
}
