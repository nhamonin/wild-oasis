import { useSearchParams } from "react-router-dom";

import Select from "./Select";

type Option = {
  value: string;
  label: string;
};

type SortByProps = {
  options: Option[];
  value: string;
};

function SortBy({ options, value }: SortByProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = searchParams.get('sort_by') || value;

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;

    searchParams.set('sort_by', value);
    setSearchParams(searchParams);
  }

  return (
    <Select options={options} value={sortValue} onChange={handleChange} />
  );
}

export default SortBy;
