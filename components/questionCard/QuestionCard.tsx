import React from "react";
import Image from "next/image";
import {useRouter} from "next/router";
import {COMMENT} from "assets/images";
import styles from "components/questionCard/styles/questionCard.module.scss";
import Avatar from "components/common/avatar/Avatar";
import Button from "components/common/button/Button";
import generalText from "i18n/generalText";
import {Question} from "utils/types/commonTypes";
interface Props {
    isShowDetail?: boolean;
    question: Question;
}
const QuestionCard: React.FC<Props> = ({isShowDetail = false, question}) => {
    const router = useRouter();
    const onGotoDetails = () => {
        router.push(`details/${question.id}`);
    };
    return (
        <div
            className={styles["card"]}
            onClick={isShowDetail ? () => {} : onGotoDetails}
        >
            <div className={styles["header"]}>
                <div className={styles["info"]}>
                    <div>
                        <Avatar shape="square" />
                    </div>
                    <div>{question?.title}</div>
                </div>
                <div className={styles["date-time-count"]}>
                    <div className={styles["date-time"]}>
                        <span className={styles["date-label"]}>
                            {generalText.time}
                        </span>
                        {question?.time}
                    </div>

                    <div className={styles["date-time"]}>
                        <span className={styles["date-label"]}>
                            {generalText.date}
                        </span>
                        {question?.date}
                    </div>
                    <div className={styles["comment"]}>
                        <Image
                            alt="count"
                            src={COMMENT}
                            width={20}
                            height={20}
                        />
                        <div className={styles["english-font"]}>
                            {question?.answers?.length}
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`${styles["question"]} ${
                    !isShowDetail && styles["clip"]
                }`}
            >
                {question?.description}
            </div>

            {!isShowDetail && (
                <div className={styles["button"]}>
                    <Button variant="outline" className={styles["border"]}>
                        <span>{generalText.showDetails}</span>
                    </Button>
                </div>
            )}
        </div>
    );
};
export default QuestionCard;
