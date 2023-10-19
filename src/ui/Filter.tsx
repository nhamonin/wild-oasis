import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

type FilterButtonProps = {
  $active?: boolean;
};

const FilterButton = styled.button<FilterButtonProps>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

FilterButton.defaultProps = {
  $active: false,
};

type Option<Value extends string> = {
  value: Value;
  label: string;
};

type FilterProps<OptionValues extends string> = {
  filterField: string;
  options: Option<OptionValues>[];
};

function Filter<OptionValues extends string>({ filterField, options }: FilterProps<OptionValues>) {
  const [searchParams, updateSearchParams] = useSearchParams();
  const currentFilterType = (searchParams.get(filterField) as OptionValues) || options[0].value;

  const handleClick = (filterType: OptionValues) => {
    searchParams.set(filterField, filterType);
    updateSearchParams(searchParams, { replace: true });
  };

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          $active={currentFilterType === option.value}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
