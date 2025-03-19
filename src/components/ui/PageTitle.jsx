const PageTitle = ({ title }) => {
  return (
    <div className="page-title mb-4">
      <h4 className="mb-2 text-xl font-semibold">{title}</h4>
      <div className="h-px bg-gray-800 w-full"></div>
    </div>
  );
};

export default PageTitle;
