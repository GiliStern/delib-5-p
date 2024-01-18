import { FC, useEffect, useState } from "react";
import { createSelector } from "reselect";

// Third party imports
import { useNavigate, useParams } from "react-router-dom";
import { User, Role, Screen } from "delib-npm";

// firestore
import { getIsSubscribed } from "../../../functions/db/statements/getStatement";
import { listenToSubStatements } from "../../../functions/db/statements/listenToStatements";
import { listenToStatement } from "../../../functions/db/statements/listenToStatements";
import { listenToStatementSubSubscriptions } from "../../../functions/db/statements/listenToStatements";
import { listenToStatementSubscription } from "../../../functions/db/statements/listenToStatements";
import { updateSubscriberForStatementSubStatements } from "../../../functions/db/subscriptions/setSubscriptions";
import { setStatmentSubscriptionToDB } from "../../../functions/db/subscriptions/setSubscriptions";
import { listenToEvaluations } from "../../../functions/db/evaluation/getEvaluation";

// Redux Store
import {
    useAppDispatch,
    useAppSelector,
} from "../../../functions/hooks/reduxHooks";
import { statementSelector } from "../../../model/statements/statementsSlice";

import { userSelector } from "../../../model/users/userSlice";
import { useSelector } from "react-redux";

// Custom components
import ProfileImage from "../../components/profileImage/ProfileImage";
import StatementHeader from "./components/header/StatementHeader";
import AskPermisssion from "../../components/askPermission/AskPermisssion";
import SwitchScreens from "./components/SwitchScreens";

// Hooks & Providers
import { MapProvider } from "../../../functions/hooks/useMap";
import { statementTitleToDisplay } from "../../../functions/general/helpers";
import { availableScreen } from "./StatementCont";
import { RootState } from "../../../model/store";

const Statement: FC = () => {
    // Hooks
    const { statementId } = useParams();
    const page = useParams().page as Screen;

    const navigate = useNavigate();

    // const user = store.getState().user.user
    const user = useSelector(userSelector);

    // Use state
    const [talker, setTalker] = useState<User | null>(null);
    const [title, setTitle] = useState<string>("Group");
    const [showAskPermission, setShowAskPermission] = useState<boolean>(false);

    // Redux hooks
    const dispatch = useAppDispatch();
    const statement = useAppSelector(statementSelector(statementId));

    const subStatementsSelector = createSelector(
        (state: RootState) => state.statements.statements,
        (_state: RootState, statementId: string | undefined) => statementId,
        (statements, statementId) =>
            statements
                .filter((st) => st.parentId === statementId)
                .sort((a, b) => a.createdAt - b.createdAt),
    );

    const subStatements = useAppSelector((state: RootState) =>
        subStatementsSelector(state, statementId),
    );
    const screen = availableScreen(statement, page);

    //handlers
    function handleShowTalker(_talker: User | null) {
        if (!talker) {
            setTalker(_talker);
        } else {
            setTalker(null);
        }
    }

    //in case the url is of undefined screen, navigate to the first avilable screen
    useEffect(() => {
        if (screen && screen !== page) {
            navigate(`/statement/${statementId}/${screen}`);
        }
    }, [screen]);

    // Listen to statement changes.
    useEffect(() => {
        let unsubListenToStatement: () => void = () => {
            return;
        };
        let unsubSubStatements: () => void = () => {
            return;
        };
        let unsubStatementSubscription: () => void = () => {
            return;
        };
        let unsubEvaluations: () => void = () => {
            return;
        };
        let unsubSubSubscribedStatements: () => void = () => {
            return;
        };

        if (user && statementId) {
            unsubListenToStatement = listenToStatement(statementId, dispatch);
            unsubSubStatements = listenToSubStatements(statementId, dispatch);
            unsubEvaluations = listenToEvaluations(
                dispatch,
                statementId,
                user?.uid,
            );
            unsubSubSubscribedStatements = listenToStatementSubSubscriptions(
                statementId,
                user,
                dispatch,
            );
            unsubStatementSubscription = listenToStatementSubscription(
                statementId,
                user,
                dispatch,
            );
        }

        return () => {
            unsubListenToStatement();
            unsubSubStatements();
            unsubStatementSubscription();
            unsubSubSubscribedStatements();
            unsubEvaluations();
        };
    }, [user, statementId]);

    useEffect(() => {
        if (statement) {
            const { shortVersion } = statementTitleToDisplay(
                statement.statement,
                100,
            );

            setTitle(shortVersion);
            (async () => {
                const isSubscribed = await getIsSubscribed(statementId);

                // if isSubscribed is false, then subscribe
                if (!isSubscribed) {
                    // subscribe
                    setStatmentSubscriptionToDB(statement, Role.member);
                } else {
                    //update subscribed field
                    updateSubscriberForStatementSubStatements(statement);
                }
            })();
        }
    }, [statement]);

    return (
        <div className="page">
            {showAskPermission && (
                <AskPermisssion showFn={setShowAskPermission} />
            )}
            {talker && (
                <div
                    onClick={() => {
                        handleShowTalker(null);
                    }}
                >
                    <ProfileImage user={talker} />
                </div>
            )}

            <>
                <StatementHeader
                    statement={statement}
                    screen={screen || Screen.CHAT}
                    title={title}
                    showAskPermission={showAskPermission}
                    setShowAskPermission={setShowAskPermission}
                />

                <MapProvider>
                    <SwitchScreens
                        screen={screen}
                        statement={statement}
                        subStatements={subStatements}
                        handleShowTalker={handleShowTalker}
                        setShowAskPermission={setShowAskPermission}
                    />
                </MapProvider>
            </>
        </div>
    );
};

export default Statement;
