const Avatar = ({ size = 40 }: { size?: number }) => {
  return (
    <div
      style={{
        width: size,
        height: size
      }}
      className="rounded-full itam-gradient"
    />
  );
};

export default Avatar;
