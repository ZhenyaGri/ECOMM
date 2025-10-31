import { useState } from 'react';

export type SortOption =
  | 'featured'
  | 'name.en asc'
  | 'name.en desc'
  | 'price asc'
  | 'price desc';

interface SortingSelectProps {
  className?: string;
  onChange?: (value: SortOption) => void;
}

export const SortingSelect = ({
  className,
  onChange,
}: SortingSelectProps): React.ReactNode => {
  const [selectedValue, setSelectedValue] = useState<SortOption>('featured');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = e.target.value as SortOption;
    setSelectedValue(value);
    onChange?.(value);
  };

  return (
    <div className={`facet-sorting ${className || ''}`}>
      <select
        name="sorting"
        id="sorting"
        value={selectedValue}
        onChange={handleChange}
      >
        <option value="featured">Featured</option>
        <option value="name.en asc">Alphabetically, A-Z</option>
        <option value="name.en desc">Alphabetically, Z-A</option>
        <option value="price asc">Price, low to high</option>
        <option value="price desc">Price, high to low</option>
      </select>
    </div>
  );
};
