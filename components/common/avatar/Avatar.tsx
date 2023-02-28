import React, {CSSProperties} from "react";
import Image from "next/image";
import styles from "components/common/avatar/styles/avatar.module.scss";
import {SAMPLE_AVATAR} from "utils/constants";

interface Props {
    src?: string;
    className?: CSSProperties;
    shape?: "round" | "square";
}

const Avatar: React.FC<Props> = ({
    src = SAMPLE_AVATAR,
    shape = "round",
    className,
}) => {
    return (
        <div className={`${styles["avatar-container"]} ${className}`}>
            <Image
                src={src}
                width={20}
                height={20}
                alt="avatar"
                className={`${styles["avatar"]} ${styles[shape]}`}
            />
        </div>
    );
};

export default Avatar;
