import React, {useRef, ReactNode} from "react";
import {createPortal} from "react-dom";
import Image from "next/image";
import {REMOVE} from "assets/images";
import styles from "components/common/modal/styles/modal.module.scss";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    headerContent?: () => JSX.Element;
    style?: React.CSSProperties;
    className?: string;
    children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    open,
    onClose,
    headerContent = () => {
        return <div></div>;
    },
    children,
    className,
    style,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const handleClickOutside: React.MouseEventHandler<
        HTMLDivElement
    > = event => {
        if (
            modalRef.current &&
            !modalRef.current.contains(event.target as Node)
        ) {
            onClose();
        }
    };

    return open ? (
        createPortal(
            <div className={styles["container"]} onClick={handleClickOutside}>
                <div
                    className={`${styles["modal"]} ${className}`}
                    style={style}
                    ref={modalRef}
                >
                    <div className={styles["header"]}>
                        {headerContent()}

                        <button className={styles["close"]} onClick={onClose}>
                            <Image
                                alt="remove"
                                width={20}
                                height={20}
                                className={styles["close-icon"]}
                                src={REMOVE}
                            />
                        </button>
                    </div>
                    <div className={styles["modal-content-container"]}>
                        {children}
                    </div>
                </div>
            </div>,
            document.body
        )
    ) : (
        <></>
    );
};

export default Modal;
