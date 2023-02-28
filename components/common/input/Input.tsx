import React, {useState, useEffect, CSSProperties} from "react";
import styles from "components/common/input/styles/input.module.scss";
interface Props {
    onChange: (e: string) => void;
    initialValue?: string;
    label?: string;
    className?: CSSProperties;
}
const Input: React.FC<Props> = ({
    onChange,
    initialValue = "",
    label = "",
    className,
    ...props
}) => {
    const [value, setValue] = useState<string>("");
    useEffect(() => {
        setValue(initialValue || "");
        onChange?.(initialValue);
    }, [initialValue]);
    const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className={`${styles["input-container"]} ${className}`}>
            <label htmlFor="inputLabel" className={styles["label"]}>
                {label}
            </label>
            <input
                id="inputLabel"
                onChange={onChangeText}
                value={value}
                className={styles["input"]}
                autoComplete="off"
                {...props}
            />
             
        </div>
    );
};
export default Input;
