import { RoomAskToJoin, RoomsStateSelection, Statement } from "delib-npm";
import { FC, useState, useEffect } from "react";
import Modal from "../../../../components/modal/Modal";
import NewSetStatementSimple from "../set/NewStatementSimple";
import { listenToAllRoomsRquest } from "../../../../../functions/db/rooms/getRooms";
import { useAppDispatch } from "../../../../../functions/hooks/reduxHooks";
import { setRoomRequests } from "../../../../../model/statements/statementsSlice";
import RoomsAdmin from "./admin/RoomsAdmin";
import SelectRoom from "./comp/choose/ChooseRoom";
import RoomQuestions from "./comp/divide/RoomDivide";
import { store } from "../../../../../model/store";
import { enterRoomsDB } from "../../../../../functions/db/rooms/setRooms";
import { isOptionFn } from "../../../../../functions/general/helpers";

interface Props {
    statement: Statement;
    subStatements: Statement[];
}

let unsub = () => {},
    unsub3 = () => {};

const StatmentRooms: FC<Props> = ({ statement, subStatements }) => {
    const dispatch = useAppDispatch();

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        enterRoomsDB(statement);

        unsub3 = listenToAllRoomsRquest(statement, updateRequestForRooms);

        //enter the room

        return () => {
            unsub();
            unsub3();
        };
    }, []);

    function updateRequestForRooms(roomsAsked: RoomAskToJoin[]) {
        dispatch(setRoomRequests(roomsAsked));
    }

    const __substatements = subStatements.filter((subStatement: Statement) =>
        isOptionFn(subStatement)
    );
    const isAdmin = store.getState().user.user?.uid === statement.creatorId;

    return (
        <div className="page__main">
            <div className="wrapper">
                {switchRoomScreens(
                    statement.roomsState,
                    __substatements,
                    statement,
                    setShowModal
                )}

                {isAdmin ? <RoomsAdmin statement={statement} /> : null}

                {showModal ? (
                    <Modal>
                        <NewSetStatementSimple
                            parentData={statement}
                            isOption={true}
                            setShowModal={setShowModal}
                        />
                    </Modal>
                ) : null}
            </div>
        </div>
    );
};

export default StatmentRooms;

function switchRoomScreens(
    roomState: RoomsStateSelection | undefined,
    subStatements: Statement[],
    statement: Statement,
    setShowModal: Function
) {
    switch (roomState) {
        case RoomsStateSelection.SELECT_ROOMS:
            return (
                <SelectRoom
                    subStatements={subStatements}
                    setShowModal={setShowModal}
                />
            );
        case RoomsStateSelection.DIVIDE:
            return <RoomQuestions statement={statement} />;
        default:
            return (
                <SelectRoom
                    subStatements={subStatements}
                    setShowModal={setShowModal}
                />
            );
    }
}
