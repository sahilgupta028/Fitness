import { FaFilter } from "react-icons/fa";

export const FilterSelect = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => (
  <div className="relative">
    <FaFilter className="absolute left-3 top-3 text-gray-400" />
    <select
      value={value}
      onChange={onChange}
      className="w-60 px-4 py-2 pl-10 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="">{`Filter by ${label}`}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);