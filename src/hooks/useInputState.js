import { useState } from "react";

export default (initialValue) => {
  const [state, setState] = useState(initialValue);
  const handleChange = (e) => setState(e.target.value);
  const reset = (resetValue = "") => setState(resetValue);
  return [state, handleChange, reset];
};
