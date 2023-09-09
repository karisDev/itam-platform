const TitleInfo = ({ title, info }: { title: string; info: string }) => {
  return (
    <div className="flex flex-col gap-1">
      <h4 className="text-text-secondary">{title}</h4>
      <p className="text-text-primary text-lg font-bold">{info}</p>
    </div>
  );
};

export default TitleInfo;
