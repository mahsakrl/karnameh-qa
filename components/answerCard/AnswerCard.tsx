import React from "react";
import {useRouter} from "next/router";
import Image from "next/image";
import {HAPPY_FACE, SAD_FACE, SAD_RED_FACE} from "assets/images";
import styles from "components/answerCard/styles/answerCard.module.scss";
import Button from "components/common/button/Button";
import Avatar from "components/common/avatar/Avatar";
import axiosInstance from "utils/request/axiosInstance";
import generalText from "i18n/generalText";
import {Answer, Question} from "utils/types/commonTypes";
interface Props {
    question?: Question;
    answer: Answer;
    onUpdateAnswer: () => void;
}
const AnswerCard: React.FC<Props> = ({answer, question, onUpdateAnswer}) => {
    const router = useRouter();

    const onLike = () => {
        const [likedItem] = question?.answers?.filter(
            el => el.id === answer?.id
        );
        const otherItem = question?.answers?.filter(el => el.id !== answer?.id);
        const data = {
            ...question,
            answers: [
                {...likedItem, likeCount: likedItem?.likeCount + 1},
                ...otherItem,
            ],
        };

        axiosInstance.put(`/questions/${router?.query?.id}`, data).then(() => {
            onUpdateAnswer();
        });
    };
    const onDislike = () => {
        const [disLikedItem] = question?.answers?.filter(
            el => el.id === answer?.id
        );
        const otherItem = question?.answers?.filter(el => el.id !== answer?.id);
        const data = {
            ...question,
            answers: [
                {...disLikedItem, dislikeCount: disLikedItem?.dislikeCount + 1},
                ...otherItem,
            ],
        };

        axiosInstance.put(`/questions/${router?.query?.id}`, data).then(() => {
            onUpdateAnswer();
        });
    };

    return (
        <div className={styles["card"]}>
            <div className={styles["header"]}>
                <div className={styles["info"]}>
                    <div>
                        <Avatar shape="square" />
                    </div>
                    <div>{answer?.name}</div>
                </div>
                <div className={styles["date-time-count"]}>
                    <div className={styles["bordered-date-time"]}>
                        <span className={styles["date-label"]}>
                            {generalText.time}
                        </span>
                        {answer?.time}
                    </div>
                    <div className={styles["date-time"]}>
                        <span className={styles["date-label"]}>
                            {generalText.date}
                        </span>
                        {answer?.date}
                    </div>
                    <div className={styles["feedback-group"]}>
                        <div className={styles["feedback"]}>
                            <Image
                                alt="happy"
                                src={HAPPY_FACE}
                                width={16}
                                height={16}
                            />
                            <div className={styles["english-font"]}>
                                {answer?.likeCount}
                            </div>
                        </div>
                        <div className={styles["feedback"]}>
                            <Image
                                alt="sad"
                                src={SAD_FACE}
                                width={16}
                                height={16}
                            />
                            <div className={styles["english-font"]}>
                                {answer?.dislikeCount}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles["question"]}>{answer?.description}</div>
            <div className={styles["button"]}>
                <Button
                    icon={HAPPY_FACE}
                    variant="outline"
                    className={styles["happy"]}
                    onClick={onLike}
                >
                    {generalText.goodAnswer}
                </Button>

                <Button
                    icon={SAD_RED_FACE}
                    variant="outline"
                    className={styles["sad"]}
                    onClick={onDislike}
                >
                    {generalText.badAnswer}
                </Button>
            </div>
        </div>
    );
};
export default AnswerCard;
