const TitleInfo = ({
  title,
  info,
  subInfo
}: {
  title: string;
  info?: string | number | null;
  subInfo?: string | number | null;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <h4 className="text-text-secondary">{title}</h4>
      <p className="text-text-primary text-lg font-bold">
        {info ?? "-"}
        {subInfo && <span className="text-text-secondary"> {subInfo}</span>}
      </p>
    </div>
  );
};

export default TitleInfo;
