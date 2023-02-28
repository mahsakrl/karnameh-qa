import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import QuestionCard from "components/questionCard/QuestionCard";
import AnswerCard from "components/answerCard/AnswerCard";
import SubmitAnswerForm from "components/submitAnswerForm/SubmitAnswerForm";
import styles from "components/questionDetails/styles/questionDetails.module.scss";
import {
    GET_QUESTION_BY_ID_FAIL,
    GET_QUESTION_BY_ID_REQUEST,
    GET_QUESTION_BY_ID_SUCCESS,
} from "store/actionTypes";
import generalText from "i18n/generalText";
import LoginLayout from "layouts/loginLayout/LoginLayout";
import axiosInstance from "utils/request/axiosInstance";
import {Question} from "utils/types/commonTypes";

const QuestionDetails = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {query} = router;
    const [question, setQuestion] = useState<Question>();
    useEffect(() => {
        onGetQuestionById();
    }, [query]);
    const onGetQuestionById = () => {
        dispatch({type: GET_QUESTION_BY_ID_REQUEST});

        axiosInstance
            .get(`/questions?id=${router?.query?.id}`)
            .then(res => {
                setQuestion(res.data[0]);
                dispatch({
                    type: GET_QUESTION_BY_ID_SUCCESS,
                    payload: res.data[0],
                });
            })
            .catch(err => {
                dispatch({type: GET_QUESTION_BY_ID_FAIL, payload: err});
            });
    };

    return (
        <LoginLayout title={generalText.questionDetails}>
            {question && <QuestionCard isShowDetail question={question} />}
            <div className={styles["title"]}>{generalText.answers}</div>
            {!question?.answers?.length ? (
                <div>{generalText.noAnswer}</div>
            ) : (
                question?.answers.map(answer => (
                    <div key={answer.id}>
                        <AnswerCard
                            answer={answer}
                            question={question}
                            onUpdateAnswer={onGetQuestionById}
                        />
                    </div>
                ))
            )}

            <div className={styles["title"]}>
                {generalText.submitYourAnswer}
            </div>

            <SubmitAnswerForm
                onUpdateAnswer={onGetQuestionById}
                question={question}
            />
        </LoginLayout>
    );
};
export default QuestionDetails;
