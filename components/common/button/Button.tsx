import React, {ButtonHTMLAttributes, CSSProperties} from "react";
import Image from "next/image";
import styles from "components/common/button/styles/button.module.scss";

export interface ButtonProps {
    type?: ButtonHTMLAttributes<HTMLInputElement>["type"];
    disabled?: boolean;
    loading?: boolean;
    className?: CSSProperties;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    icon?: string;
    iconPosition?: "left" | "right";
    variant?: "default" | "text" | "outline";
    children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    type = "button",
    onClick,
    children,
    className,
    disabled = false,
    loading = false,
    icon,
    iconPosition = "right",
    variant = "default",
    ...props
}) => {
    return (
        <button
            type={type}
            onClick={onClick && onClick}
            className={`${styles["button"]} ${className}
            ${styles[variant]}
            ${loading && styles["loading"]}
            ${disabled && styles["disabled"]}
    `}
            disabled={disabled}
            {...props}
        >
            {loading ? (
                <div className={styles["loading"]}>...</div>
            ) : (
                <div
                    className={`${styles["content"]} ${
                        loading && styles["content-loading"]
                    } ${styles[iconPosition]}`}
                >
                    {icon && (
                        <Image alt="icon" width={20} height={20} src={icon} />
                    )}
                    {children}
                </div>
            )}
        </button>
    );
};

export default Button;
