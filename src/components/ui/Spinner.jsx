import { Spinner } from "flowbite-react";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-4">
      <Spinner aria-label="Loading..." size="lg" />
    </div>
  );
}