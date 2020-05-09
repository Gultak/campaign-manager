import { useState } from "react";

export function useForm(callback) {
  const [data, setData] = useState({});

  function handleSubmit(event) {
    event && event.preventDefault();
    callback();
  }

  function handleInputChange(event) {
    event.persist();
    setData(data => ({ ...data, [event.target.name]: event.target.value }));
  }

  return { handleSubmit, handleInputChange, data, setData };
}
