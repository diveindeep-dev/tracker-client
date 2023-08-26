import { ChangeEvent, useEffect, useState } from 'react';

interface UseFormProps<T> {
  initialValue: T;
}

const useForm = <T>({ initialValue }: UseFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValue);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setTimeout(() => setError(''), 2000);
  }, [error]);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const resetValues = () => {
    setValues(initialValue);
  };

  return { values, setValues, error, setError, handleChange, resetValues };
};

export default useForm;
