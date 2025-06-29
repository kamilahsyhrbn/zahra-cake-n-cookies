export const TitleDesc = ({ title, desc }) => {
  return (
    <div className="my-5 flex flex-col gap-3 justify-center items-center text-center">
      <h4 className="font-semibold text-2xl">{title}</h4>
      <p className="text-sm">{desc}</p>
    </div>
  );
};
