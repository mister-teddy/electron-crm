export default (initialValue, localStorageKey) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    let saved = localStorage.getItem(localStorageKey);
    if (saved) {
      saved = JSON.parse(saved);
      setValue(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};
