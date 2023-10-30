import styled from 'styled-components';

type StyledSelectProps = {
  type: 'white' | 'grey';
};

const StyledSelect = styled.select<StyledSelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === 'white' ? 'var(--color-grey-100)' : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

type Option<Value = string> = {
  value: Value;
  label: string;
};

type BaseSelectProps<T> = {
  options: Option<T>[];
  value: T;
  type?: 'white' | 'grey';
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

function Select<T extends string>(props: BaseSelectProps<T>): JSX.Element;

function Select({ options, value, type = 'grey', onChange }: BaseSelectProps<string>): JSX.Element {
  return (
    <StyledSelect value={value} type={type} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
