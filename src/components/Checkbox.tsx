import { InputHTMLAttributes } from 'react';
import { useField, useFormikContext } from 'formik';

export const Checkbox = ({ label, name, ...props }: Props) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <div className="form-checkbox">
      <label>
        <input
          name={name}
          type="checkbox"
          checked={field.value}
          onChange={(ev) => setFieldValue(name, ev.target.checked)}
          {...props}
        />
        <span>{label}</span>
      </label>
      {meta.error && meta.touched && <p className="form-input__error">{meta.error}</p>}
    </div>
  );
};

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}
