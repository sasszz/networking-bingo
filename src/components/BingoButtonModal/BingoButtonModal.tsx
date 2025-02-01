import { useState } from "react";
import { EmailAutoComplete } from "../EmailAutoComplete";
import styles from "./BingoButtonModal.module.scss";

interface BingoButtonModalProps {
  label: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const BingoButtonModal = ({
  label,
  onClose,
  onSuccess,
}: BingoButtonModalProps) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) {
      setError(true);
      return;
    }
    setError(false);
    onSuccess();
    onClose();
  };

  return (
    <div className={styles.opacityBackground}>
      <div className={styles.main}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <h2>{label}</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Email*
            <EmailAutoComplete
              value={email}
              onChange={(value) => {
                setEmail(value);
                if (value.trim()) setError(false);
              }}
            />
          </label>
          {error && <p className={styles.error}>Email is required.</p>}
          <label className={styles.label}>
            Name
            <input
              className={styles.input}
              type="text"
              placeholder={`Enter a name...`}
            />
          </label>
          <label className={styles.label}>
            Company
            <input
              className={styles.input}
              type="text"
              placeholder={`Enter a company...`}
            />
          </label>
          <input
            className={`${styles.submit} ${error ? styles.disabled : ""}`}
            type="submit"
            value="Submit"
            disabled={error}
          />
        </form>
      </div>
    </div>
  );
};
