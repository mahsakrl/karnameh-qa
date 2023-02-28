import React, {useState} from "react";
import Button from "components/common/button/Button";
import Input from "components/common/input/Input";
import TextArea from "components/common/textarea/Textarea";
import styles from "components/questionForm/styles/questionForm.module.scss";
import {SAMPLE_AVATAR} from "utils/constants";
import generalText from "i18n/generalText";
import axiosInstance from "utils/request/axiosInstance";
import {getCurrentIranTime} from "utils/jsFunctions/time";
import {getCurrentIranDate} from "utils/jsFunctions/date";
interface Props {
    onClose: () => void;
    onUpdateQuestions: () => void;
}
interface Form {
    id?: number;
    title: string;
    description: string;
}

const QuestionForm: React.FC<Props> = ({onClose, onUpdateQuestions}) => {
    const INIT_FORM = {title: "", description: ""};
    const [form, setForm] = useState<Form>({...INIT_FORM});
    const [showError, setShowError] = useState<boolean>(false);

    const onSubmit = () => {
        if (!form?.description || !form?.title) {
            setShowError(true);
        } else {
            setShowError(false);
            onClose();
            onCreateQuestion();
        }
    };
    const onCreateQuestion = () => {
        const data = {
            avatar: SAMPLE_AVATAR,
            time: getCurrentIranTime(),
            date: getCurrentIranDate(),
            answers: [],
            ...form,
        };
        axiosInstance
            .post("/questions", data)
            .then(() => {
                onUpdateQuestions();
            })
            .catch(() => {
                setShowError(true);
            });
    };
    const onReset = () => {
        onClose();
        setForm({title: "", description: ""});
    };
    const onChangeTitle = (value: string) => {
        setForm({...form, title: value});
    };
    const onChangeDescription = (value: string) => {
        setForm({...form, description: value});
    };

    return (
        <form>
            <Input
                initialValue={form.title}
                onChange={onChangeTitle}
                label={generalText.subject}
            />
            <TextArea
                label={generalText.questionText}
                initialValue={form.description}
                onChange={onChangeDescription}
                error={
                    (!form?.description.trim() &&
                        showError &&
                        generalText.hint) ||
                    ""
                }
            />
            <div className={styles["btn-group"]}>
                <Button onClick={onSubmit}>{generalText.createQuestion}</Button>
                <Button
                    onClick={onReset}
                    variant="text"
                    className={styles["text"]}
                >
                    {generalText.giveup}
                </Button>
            </div>
        </form>
    );
};
export default QuestionForm;
