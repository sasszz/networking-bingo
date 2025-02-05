import { useState } from "react";
import { EmailAutoComplete } from "../EmailAutoComplete";
import styles from "./BingoButtonModal.module.scss";
import { LinkedInButton } from "../LinkedInButton";

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
  const [linkedIn, setLinkedIn] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // if (!email.trim()) {
    //   setError(true);
    //   return;
    // }
    setError(false);
    setIsSubmitted(true);
    onSuccess();
  };

  const handleEdit = () => setIsSubmitted(false);

  return (
    <div className={styles.opacityBackground}>
      <div className={styles.main}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <h2>{label}</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            linkedin.com/in/
            <input
              className={styles.input}
              type="text"
              placeholder="username"
              value={linkedIn}
              onChange={(e) => setLinkedIn(e.target.value)}
              disabled={isSubmitted}
            />
          </label>
          <LinkedInButton username={linkedIn} disabled={!isSubmitted} />
          <label className={styles.label}>
            Email
            <EmailAutoComplete
              value={email}
              onChange={(value) => {
                setEmail(value);
                if (value.trim()) setError(false);
              }}
              disabled={isSubmitted}
            />
          </label>
          <label className={styles.label}>
            Name
            <input
              className={styles.input}
              type="text"
              placeholder="Enter a name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitted}
            />
          </label>
          <label className={styles.label}>
            Company
            <input
              className={styles.input}
              type="text"
              placeholder="Enter a company..."
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              disabled={isSubmitted}
            />
          </label>
          {!isSubmitted ? (
            <input
              className={`${styles.submit} ${error ? styles.disabled : ""}`}
              type="submit"
              value="Submit"
              disabled={error}
            />
          ) : (
            <button
              className={styles.submit}
              type="button"
              onClick={handleEdit}
            >
              Edit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
