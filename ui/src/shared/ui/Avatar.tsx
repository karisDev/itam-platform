const Avatar = ({ size = 40 }: { size?: number }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size
      }}
      className="rounded-full itam-gradient"
    />
  );
};

export default Avatar;
