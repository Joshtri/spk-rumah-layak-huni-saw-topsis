import { Card } from "flowbite-react";

export default function IconCards({ title, description, icon }) {
  return (
    <Card
      className="max-w-md w-full"
      theme={{
        root: {
          base: "bg-white border border-gray-200 rounded-lg shadow transition-shadow duration-300 hover:shadow-md hover:shadow-stone-500 dark:bg-gray-800 dark:border-gray-700",
        },
      }}
    >
      <div className="grid grid-cols-[auto_1fr] gap-4">
        {icon && <div className="flex items-center justify-center text-white">{icon}</div>}

        <div className="flex flex-col justify-center">
          {title && <h5 className="text-xl font-bold text-white">{title}</h5>}
          {description && <p className="text-white">{description}</p>}
        </div>
      </div>
    </Card>
  );
}
