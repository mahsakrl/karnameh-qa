import React, {useState} from "react";
import {ARROW_DOWN, PLUS} from "assets/images";
import styles from "components/header/styles/header.module.scss";
import Button from "components/common/button/Button";
import Avatar from "components/common/avatar/Avatar";
import Modal from "components/common/modal/Modal";
import QuestionForm from "components/questionForm/QuestionForm";
import generalText from "i18n/generalText";
import {SAMPLE_USER} from "utils/constants";
interface Props {
    title: string;
    updateQuestions: () => void;
}
const Header: React.FC<Props> = ({title, updateQuestions}) => {
    const [open, setOpen] = useState<boolean>(false);
    const onClose = () => {
        setOpen(false);
    };
    const header = () => {
        return <div>{generalText.createQuestion}</div>;
    };
    const onUpdateQuestions = () => {
        updateQuestions();
    };
    return (
        <header className={styles["header"]}>
            <div className={styles["title"]}>{title}</div>

            <div className={styles["info"]}>
                <Button icon={PLUS} onClick={() => setOpen(true)}>
                    {generalText.newQuestion}
                </Button>

                <div className={styles["profile"]}>
                    <Button
                        icon={ARROW_DOWN}
                        iconPosition="left"
                        variant="text"
                    >
                        {SAMPLE_USER}
                        <Avatar />
                    </Button>
                </div>
            </div>
            <Modal open={open} onClose={onClose} headerContent={header}>
                <QuestionForm
                    onClose={onClose}
                    onUpdateQuestions={onUpdateQuestions}
                />
            </Modal>
        </header>
    );
};
export default Header;
