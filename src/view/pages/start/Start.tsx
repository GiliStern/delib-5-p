import { useEffect, useState } from "react";
import styles from "./Start.module.scss";

// firestore functions
import { googleLogin } from "../../../functions/db/auth";

// Third Party Libraries
import { useNavigate } from "react-router-dom";

// Redux
import { useAppSelector } from "../../../functions/hooks/reduxHooks";
import { userSelector } from "../../../model/users/userSlice";

//img
import Logo from "../../../assets/logo/512 px SVG.svg";
import googleLogo from "../../../assets/icons/googleSimpleLogo.svg";
import moreRight from "../../../assets/icons/moreRight.svg";
import moreLeft from "../../../assets/icons/moreLeft.svg";

// Constants
import { LANGUAGES } from "../../../constants/Languages";
import EnterName from "../../components/enterName/EnterName";
import useDirection from "../../../functions/hooks/useDirection";
import {
    LanguagesEnum,
    useLanguage,
} from "../../../functions/hooks/useLanguages";
import { selectInitLocation } from "../../../model/location/locationSlice";

const Start = () => {
    const navigate = useNavigate();
    const user = useAppSelector(userSelector);
    const initLocation = useAppSelector(selectInitLocation);
    const [showNameModul, setShowNameModul] = useState(false);
    const savedLang = localStorage.getItem("lang");
    const direction = useDirection();

    const { t, changeLanguage } = useLanguage();
    const defaultLang = "he";

    useEffect(() => {
        if (!savedLang) {
            localStorage.setItem("lang", defaultLang);
        }
    }, []);

    useEffect(() => {
        if (user) {
            navigate(initLocation || "/home", {
                state: { from: window.location.pathname },
            });
        }
    }, [user]);

    return (
        <div className="splashPage">
            <div className={styles.h1}>
                {t("Delib")} <span className={styles.number}>5</span>
            </div>
            <div className={styles.h2}>{t("Creating Agreements")}</div>
            <img
                className={styles.logo}
                src={Logo}
                alt="Delib logo"
                width="10%"
                style={{}}
            />

            <select
                className={styles.language}
                defaultValue={savedLang || defaultLang}
                onChange={(e) => {
                    const lang = e.target.value as LanguagesEnum;
                    changeLanguage(lang);
                    if (lang === "he" || lang === "ar") {
                        document.body.style.direction = "rtl";
                    } else {
                        document.body.style.direction = "ltr";
                    }
                    localStorage.setItem("lang", lang);
                }}
            >
                {LANGUAGES.map(({ code, label }) => (
                    <option key={code} value={code}>
                        {label}
                    </option>
                ))}
            </select>
            <div
                style={{ flexDirection: direction }}
                data-cy="anonymous-login"
                className={styles.anonymous}
                onClick={() => setShowNameModul((prev) => !prev)}
            >
                {t("Login with a temporary name")}{" "}
                <img
                    src={direction === "row" ? moreRight : moreLeft}
                    alt="login anonymously"
                />
            </div>
            <button className={styles.googleLogin} onClick={googleLogin}>
                <img
                    src={direction === "row-reverse" ? moreRight : moreLeft}
                    alt="login anonymously"
                />
                <img src={googleLogo} alt="login with google" />
                {t("Connect with Google")}
            </button>

            <a href="http://delib.org" target="_blank">
                <footer className={styles.ddi}>
                    {t("From the Institute for Deliberative Democracy")}
                </footer>
            </a>

            {showNameModul ? (
                <EnterName setShowNameModul={setShowNameModul} />
            ) : null}
        </div>
    );
};

export default Start;
