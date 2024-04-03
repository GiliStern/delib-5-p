import { Screen, Statement } from "delib-npm";

// custom components
import CustomCheckboxLabel from "./CustomCheckboxLabel";
import { isSubPageChecked } from "../statementSettingsCont";
import CustomSwitch from "../../../../../components/switch/CustomSwitch";

// HELPERS
import { NavName, navArray } from "../../nav/top/StatementTopNavModel";
import { useLanguage } from "../../../../../../functions/hooks/useLanguages";

import { FC } from "react";

// icons
import NetworkIcon from "../../../../../../assets/icons/networkIcon.svg?react";
import ChatIcon from "../../../../../../assets/icons/roundedChatDotIcon.svg?react";
import EvaluationsIcon from "../../../../../../assets/icons/evaluationsIcon.svg?react";
import VotingIcon from "../../../../../../assets/icons/votingIcon.svg?react";
import QuestionIcon from "../../../../../../assets/icons/questionIcon.svg?react";
import MassQuestionsIcon from "../../../../../../assets/icons/massQuestionsIcon.svg?react";
import RoomsIcon from "../../../../../../assets/icons/roomsIcon.svg?react";
import SettingsIcon from "../../../../../../assets/icons/settingsIcon.svg?react";

export default function CheckBoxeArea({
    statement,
}: {
    statement: Statement | undefined;
}) {
    const { t } = useLanguage();

    const hasChildren: boolean =
        statement?.hasChildren === false ? false : true;

    const enableAddEvaluationOption: boolean =
        statement?.statementSettings?.enableAddEvaluationOption === false
            ? false
            : true;

    const enableAddVotingOption: boolean =
        statement?.statementSettings?.enableAddVotingOption === false
            ? false
            : true;

    return (
        <section className="settings__checkboxSection">
            <div className="settings__checkboxSection__column">
                <h3 className="settings__checkboxSection__column__title">
                    {t("Tabs")}
                </h3>
                {navArray
                    .filter((navObj) => navObj.link !== Screen.SETTINGS)
                    .map((navObj, index) => (
                        <CustomSwitch
                            key={`tabs-${index}`}
                            link={navObj.link}
                            label={navObj.name}
                            defaultChecked={isSubPageChecked(statement, navObj)}
                            children={<NavIcon name={navObj.name as NavName} />}
                        />
                    ))}
            </div>
            <div className="settings__checkboxSection__column">
                <h3 className="settings__checkboxSection__column__title">
                    {t("Advanced")}
                </h3>
                <CustomCheckboxLabel
                    name={"hasChildren"}
                    title={"Enable Sub-Conversations"}
                    defaultChecked={hasChildren}
                />
                <CustomCheckboxLabel
                    name={"enableAddVotingOption"}
                    title={
                        "Allow participants to contribute options to the voting page"
                    }
                    defaultChecked={enableAddVotingOption}
                />
                <CustomCheckboxLabel
                    name={"enableAddEvaluationOption"}
                    title={
                        "Allow participants to contribute options to the evaluation page"
                    }
                    defaultChecked={enableAddEvaluationOption}
                />
            </div>
        </section>
    );
}

const mapNavNameToIcon: Record<NavName, typeof NetworkIcon> = {
    [NavName.Main]: NetworkIcon,
    [NavName.Chat]: ChatIcon,
    [NavName.Evaluations]: EvaluationsIcon,
    [NavName.Voting]: VotingIcon,
    [NavName.Questions]: QuestionIcon,
    [NavName.MassQuestions]: MassQuestionsIcon,
    [NavName.Rooms]: RoomsIcon,
    [NavName.Settings]: SettingsIcon,
};

interface NavIconProps {
    name: NavName;
}

const NavIcon: FC<NavIconProps> = ({ name }) => {
    const Icon = mapNavNameToIcon[name];

    return <Icon />;
};
