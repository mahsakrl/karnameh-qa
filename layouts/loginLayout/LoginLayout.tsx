import styles from "layouts/loginLayout/styles/loginLayout.module.scss";
import Header from "components/header/Header";
interface Props {
    title: string;
    children?: React.ReactNode;
    updateQuestions?: () => void;
}

const LoginLayout: React.FC<Props> = ({
    children = <></>,
    title,
    updateQuestions = () => {},
}) => {
    return (
        <div className={styles["layout"]}>
            <Header title={title} updateQuestions={updateQuestions} />
            <div className={styles["children-layout"]}>{children}</div>
        </div>
    );
};
export default LoginLayout;
