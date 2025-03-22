import { Pagination } from "flowbite-react";

export default function Paginations({ currentPage, onPageChange, totalPages }) {
  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        previousLabel=""
        nextLabel=""
        showIcons={true}
      />
    </div>
  );
}
