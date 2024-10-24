interface DropdownSelectProps {
    options: string[];
    defaultValue: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const DropdownSelect: React.FC<DropdownSelectProps> = ({ options, defaultValue, onChange }) => {
    return (
        <select defaultValue={defaultValue} onChange={onChange}>
            {options.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    );
};
