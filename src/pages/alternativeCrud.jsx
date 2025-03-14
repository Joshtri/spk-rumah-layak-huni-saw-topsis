import LayoutRoot from "./layout";
import AlternativeTable from "../components/alternatifTable";

export default function AlternativeCrudPage() {
  return (
    <LayoutRoot>
      <div className="grid grid-rows-[auto_1fr] h-full gap-4">
        <div className="flex justify-end">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Tambah Alternatif
          </button>
        </div>

        <AlternativeTable />
      </div>
    </LayoutRoot>
  );
}
