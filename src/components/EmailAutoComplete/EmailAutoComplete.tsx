import { Email, domains } from "@smastrom/react-email-autocomplete";

import styles from "./EmailAutoComplete.module.scss";

interface EmailAutoCompleteProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  error: boolean;
}

export const EmailAutoComplete = ({
  value,
  onChange,
  disabled,
  error,
}: EmailAutoCompleteProps) => {
  const baseList = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "icloud.com",
  ];

  return (
    <Email
      placeholder={`Enter an email...`}
      classNames={{
        wrapper: styles.wrapper,
        input: error ? styles.error : styles.noError,
        dropdown: styles.dropdown,
        suggestion: styles.suggestion,
        domain: styles.domain,
        username: "font-bold",
      }}
      baseList={baseList}
      refineList={domains}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};
