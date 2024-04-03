import { NavObject, Screen } from "delib-npm";

export enum NavName {
    Main = "Main",
    Chat = "Chat",
    Evaluations = "Evaluations",
    Voting = "Voting",
    Questions = "Questions",
    MassQuestions = "Mass Questions",
    Rooms = "Rooms",
    Settings = "Settings",
}

export const navArray: NavObject[] = [
    {
        link: Screen.DOC,
        name: NavName.Main,
        id: "doc",
        default: false,
    },
    { link: Screen.CHAT, name: NavName.Chat, id: "chat", default: true },
    {
        link: Screen.OPTIONS,
        name: NavName.Evaluations,
        id: "options",
        default: true,
    },
    {
        link: Screen.QUESTIONS,
        name: NavName.Questions,
        id: "questions",
        default: false,
    },
    { link: Screen.VOTE, name: "Voting", id: "vote", default: true },
    {
        link: Screen.MASS_QUESTIONS,
        name: NavName.MassQuestions,
        id: "questions-mass",
        default: false,
    },
    { link: Screen.GROUPS, name: NavName.Rooms, id: "rooms", default: false },

    { link: Screen.SETTINGS, name: NavName.Settings, id: "settings" },
];
