interface Props {
  label: string;
}

export const PageTtle = ({ label }: Props) => {
  return (
    <div className="flex flex-wrap items-center justify-start gap-4 border-b border-secondary pb-6">
      <h1 className="text-heading1">{label}</h1>
    </div>
  );
};
