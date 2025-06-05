export const handleBeforeInput = (regx, max) => (e) => {
  const inputValue = e.target.value + e.data;
  if (inputValue.length > max || !regx.test(e.data)) {
    e.preventDefault();
  }
};
