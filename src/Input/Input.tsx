import styles from "./Input.module.css";

type InputProps = {
  value: string;
  placeholder?: string;
  onChange: any;
};

export const Input = (props: InputProps) => {
  const { value, onChange, placeholder } = props;

  return (
    <input
      className={styles.input}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
