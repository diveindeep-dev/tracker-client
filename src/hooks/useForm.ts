import { useState, ChangeEvent, useEffect } from 'react';

interface UseFormProps<T> {
  initialValue: T;
}

function useForm<T>({ initialValue }: UseFormProps<T>) {
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

  return { values, setValues, handleChange, error, setError, resetValues };
}

export default useForm;
