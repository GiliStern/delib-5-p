import { Statement, StatementType } from "delib-npm";
import { FC, useState } from "react";
import MassQuestionCard from "./components/massQuestion/MassQuestionCard";
import styles from "./MassQuestions.module.scss";
import StatementEvaluationNav from "../options/components/StatementEvaluationNav";
import NewSetStatementSimple from "../set/NewStatementSimple";
import Modal from "../../../../components/modal/Modal";
import { isAuthorized } from "../../../../../functions/general/helpers";
import { useAppSelector } from "../../../../../functions/hooks/reduxHooks";
import { statementSubscriptionSelector } from "../../../../../model/statements/statementsSlice";
import Text from "../../../../components/text/Text";


interface Props {
    statement: Statement;
    subStatements: Statement[];
}

const MassQuestions: FC<Props> = ({ statement, subStatements }) => {
    const statementSubscriptions = useAppSelector(
        statementSubscriptionSelector(statement.statementId)
    );

    const [showThankYou, setShowThankYou] = useState<boolean>(false);
    const [answerd, setAnswerd] = useState<boolean[]>([]);
    const [showModal, setShowModal] = useState(false);

    const questions = subStatements.filter(
        (sub) => sub.statementType === StatementType.question
    );

    const _isAutorized = isAuthorized(statement, statementSubscriptions);
  

    return (
        <>
        <div className="page__main">
            <div className="wrapper">
                {!showThankYou ? (
                    <>
                        {statement.imagesURL?.main ? (
                            <div
                                className={styles.image}
                                style={{
                                    backgroundImage: `url(${statement.imagesURL.main})`,
                                }}
                                // style={{backgroundColor: 'red'}}
                            ></div>
                        ) : null}
                        <Text
                            text={statement.statement}
                            onlyDescription={true}
                        />
                        {questions.map((question, index: number) => (
                            <MassQuestionCard
                                key={question.statementId}
                                statement={question}
                                index={index}
                                setAnswerd={setAnswerd}
                            />
                        ))}
                        <div className="btns">
                            {answerd.filter((a) => a).length ===
                                questions.length && (
                                <div
                                    className="btn"
                                    onClick={() => setShowThankYou(true)}
                                >
                                    <span>שליחה</span>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className={styles.thankyou}>
                        <h2>תודה על התשובות</h2>
                        <div
                            className="btn"
                            onClick={() => setShowThankYou(false)}
                        >
                            <span>עריכה חדשה</span>
                        </div>
                    </div>
                )}
            </div>
           
        </div>
        {!showThankYou && _isAutorized ? (
                <div className="page__main__bottom">
                    <StatementEvaluationNav
                        setShowModal={setShowModal}
                        statement={statement}
                        showNav={false}
                    />
                    {showModal && (
                        <Modal>
                            <NewSetStatementSimple
                                parentStatement={statement}
                                isOption={false}
                                setShowModal={setShowModal}
                            />
                        </Modal>
                    )}
                </div>
            ) : null}
            </>
    );
};

export default MassQuestions;
