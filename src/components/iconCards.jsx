import { Card } from "flowbite-react";

export default function IconCards({ title, description, icon }) {
  return (
    <Card className="max-w-md w-full [&>div]:bg-amber-500">
      <div className="grid grid-cols-[auto_1fr] gap-4">
        {icon && <div className="flex items-center justify-center">{icon}</div>}

        <div className="flex flex-col justify-center">
          {title && <h5 className="text-xl font-bold">{title}</h5>}
          {description && <p className="text-gray-600">{description}</p>}
        </div>
      </div>
    </Card>
  );
}
