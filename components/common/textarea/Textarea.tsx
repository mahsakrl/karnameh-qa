import React, {useState, useEffect} from "react";
import styles from "components/common/textarea/styles/textarea.module.scss";

export interface TextAreaProps {
    placeholder?: string;
    className?: string;
    error?: string;
    onChange?: (e: string) => void;
    maxLength?: number;
    row?: number;
    onSubmit?: React.FormEventHandler<HTMLTextAreaElement>;
    initialValue?: string;
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
    size?: "fluid";
    label?: string;
    disabled?: boolean;
}

const TextArea: React.FC<TextAreaProps> = props => {
    const {
        maxLength,
        placeholder,
        onChange,
        className,
        error,
        initialValue = "",
        onFocus,
        onBlur,
        size = "fluid",
        label = "",
        disabled = false,
    } = props;
    const [value, setValue] = useState<string>("");

    useEffect(() => {
        setValue(initialValue || "");
        onChange?.(initialValue);
    }, [initialValue]);

    function onChangeText(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setValue(e.target.value);
        onChange?.(e.target.value);
    }

    return (
        <div className={styles["textarea-container"]}>
            {!!label && <p>{label}</p>}

            <textarea
                maxLength={maxLength}
                onChange={onChangeText}
                placeholder={placeholder}
                value={value}
                className={`${styles["textarea"]} ${className}  ${
                    !!size && styles[size]
                }`}
                onFocus={onFocus}
                onBlur={onBlur}
                disabled={disabled}
            ></textarea>
            {!!error && <div className={styles["error-text"]}>{error}</div>}
        </div>
    );
};

export default TextArea;
