import "./DropdownSelect.css";

interface DropdownSelectProps {
    options: string[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const DropdownSelect: React.FC<DropdownSelectProps> = ({ options, value, onChange }) => {
    return (
        <select className="dropdown-select" value={value} onChange={onChange}>
            {options.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    );
};
