import React, {useState} from "react";
import {useRouter} from "next/router";
import Button from "components/common/button/Button";
import TextArea from "components/common/textarea/Textarea";
import styles from "components/submitAnswerForm/styles/submitAnswerform.module.scss";
import {SAMPLE_AVATAR, SAMPLE_USER} from "utils/constants";
import generalText from "i18n/generalText";
import axiosInstance from "utils/request/axiosInstance";
import {Question} from "utils/types/commonTypes";
import {getCurrentIranTime} from "utils/jsFunctions/time";
import {getCurrentIranDate} from "utils/jsFunctions/date";
interface Props {
    onUpdateAnswer: () => void;
    question: Question;
}

const SubmitAnswerForm: React.FC<Props> = ({onUpdateAnswer, question}) => {
    const router = useRouter();
    const [showError, setShowError] = useState<boolean>(false);
    const onSendAnswer = () => {
        if (!description) {
            setShowError(true);
        } else {
            onEditQuestionById();
        }
    };
    const onEditQuestionById = () => {
        const data = {
            ...question,
            answers: [
                ...question.answers,
                {
                    avatar: SAMPLE_AVATAR,
                    name: SAMPLE_USER,
                    description,
                    time: getCurrentIranTime(),
                    date: getCurrentIranDate(),
                    likeCount: 0,
                    dislikeCount: 0,
                },
            ],
        };
        axiosInstance
            .put(`/questions/${router?.query?.id}`, data)
            .then(() => {
                onUpdateAnswer();
                setDescription("");
            })
            .catch(() => {
                setShowError(true);
            });
    };
    const [description, setDescription] = useState<string>("");
    const onChangeDescription = value => {
        setDescription(value);
    };
    return (
        <form className={styles["form"]}>
            <TextArea
                label={generalText.writeYourAnswer}
                placeholder={generalText.answerText}
                error={
                    (!description.trim() && showError && generalText.hint) || ""
                }
                initialValue={description}
                onChange={onChangeDescription}
            />
            <Button className={styles["submit"]} onClick={onSendAnswer}>
                {generalText.sendAnswer}
            </Button>
        </form>
    );
};
export default SubmitAnswerForm;
