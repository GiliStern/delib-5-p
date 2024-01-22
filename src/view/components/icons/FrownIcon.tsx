import { FC } from "react";

interface Props {
    color?: string;
}
const FrownIcon: FC<Props> = ({ color = "#FE6BA2" }) => {
    return (
        <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M20.7869 13.1076C21.1146 11.2018 21.3818 7.16459 18.4676 4.84857C17.2459 3.87176 16.2819 2.771 15.5947 1.57485L15.4707 1.35845C15.4071 1.25033 15.2829 1.18664 15.1557 1.20264C15.0316 1.21849 14.9267 1.31076 14.8916 1.43162L14.5226 2.71057C14.4844 2.84743 14.3826 2.89512 14.3062 2.89512C14.2617 2.89512 14.179 2.87912 14.1217 2.77426C13.934 2.43064 13.5745 2.26193 13.2055 2.33836C12.83 2.42101 12.5533 2.74241 12.5183 3.14646L12.4642 3.80186C11.2521 3.0065 9.73132 2.90785 8.44282 3.57599C5.94225 4.87404 3.1012 7.59086 3.63251 13.1648C3.12345 13.413 2.76713 13.9124 2.76713 14.4914C2.76713 15.3155 3.47344 15.9867 4.3356 15.9867C4.46919 15.9867 4.59965 15.9676 4.72691 15.9358C4.87643 16.9921 5.24867 18.0006 5.81494 18.8724C7.20846 21.0166 9.57862 22.2002 12.4897 22.2002C16.8673 22.2002 19.352 19.4101 19.8706 16.6485C19.9151 16.4226 19.9406 16.1935 19.9597 15.9645C20.0424 15.9773 20.1251 15.9867 20.211 15.9867C21.0764 15.9867 21.7763 15.3155 21.7763 14.4914C21.7763 13.8678 21.3755 13.3302 20.7869 13.1076ZM19.3456 15.535V15.5381C19.3456 15.5381 19.3456 15.5381 19.3456 15.5414C19.3393 15.8754 19.3075 16.2095 19.247 16.5308C18.8112 18.8533 16.7782 21.5639 12.4897 21.5639C9.8013 21.5639 7.62202 20.4854 6.34944 18.5255C5.76407 17.6252 5.40775 16.5659 5.31229 15.4904C5.31229 15.4618 5.30914 15.4364 5.30596 15.4109V13.3366C5.37275 12.5858 5.61136 11.2337 6.46397 10.486C6.46715 10.486 6.46715 10.4796 6.47034 10.4765C6.47352 10.4733 6.47989 10.4733 6.48308 10.4702L7.36116 9.56015C7.55204 9.36613 7.86063 9.35339 8.06425 9.53157C8.38558 9.80839 8.83413 9.88793 9.22867 9.73523C9.62635 9.58252 9.90632 9.22616 9.95719 8.80627C10.0018 8.46265 10.2213 8.19219 10.5458 8.08081C10.8735 7.96943 11.2139 8.04586 11.4557 8.29084L12.4292 9.26438C12.5978 9.42982 12.8428 9.47114 13.0591 9.36939C13.2723 9.26438 13.39 9.04488 13.3614 8.80938C13.3232 8.50397 13.4441 8.20804 13.6795 8.01401C13.9181 7.8231 14.2299 7.76593 14.5194 7.86457L16.1865 8.4308C16.2978 8.46902 16.3933 8.52308 16.4728 8.58988C17.7645 9.68117 18.668 11.2495 19.0211 12.9962L19.2916 14.3323C19.3329 14.781 19.3488 15.2041 19.3488 15.4109C19.3488 15.4458 19.3488 15.484 19.3456 15.535Z"
                fill={color}
            />
            <path
                d="M16.8688 13.8458C16.8688 14.8066 16.2007 15.5892 15.3799 15.5892C14.5591 15.5892 13.891 14.8066 13.891 13.8458C13.891 13.5181 13.9705 13.1967 14.1168 12.9231C14.1678 12.8341 14.2568 12.7736 14.3586 12.7609C14.4604 12.7482 14.5622 12.7831 14.6323 12.8595C14.7881 13.0313 15.0745 13.1363 15.3799 13.1363C15.6853 13.1363 15.9716 13.0313 16.1275 12.8595C16.1975 12.7831 16.3025 12.745 16.4043 12.7609C16.5061 12.7736 16.5952 12.8341 16.6429 12.9231C16.7924 13.1999 16.8688 13.5181 16.8688 13.8458Z"
                fill={color}
            />
            <path
                d="M10.6554 13.8458C10.6554 14.8066 9.98732 15.5892 9.1665 15.5892C8.3457 15.5892 7.68077 14.8066 7.68077 13.8458C7.68077 13.5181 7.75712 13.1967 7.90348 12.9231C7.95437 12.8341 8.04346 12.7736 8.14527 12.7609C8.25026 12.7482 8.35205 12.7831 8.41887 12.8595C8.57476 13.0313 8.86109 13.1363 9.1665 13.1363C9.47193 13.1363 9.76145 13.0313 9.91734 12.8595C9.98732 12.7831 10.0891 12.745 10.1909 12.7609C10.2927 12.7736 10.3818 12.8341 10.4327 12.9231C10.5791 13.1999 10.6554 13.5181 10.6554 13.8458Z"
                fill={color}
            />
            <path
                d="M17.1486 11.2153C15.0981 10.0421 13.414 11.5135 13.3974 11.5286C13.2664 11.6457 13.2554 11.8469 13.3725 11.9779C13.4354 12.0481 13.5223 12.0838 13.6097 12.0838C13.6852 12.0838 13.761 12.0571 13.8218 12.0027C13.8348 11.9908 15.1753 10.819 16.8326 11.7677C16.985 11.8547 17.1792 11.802 17.2668 11.6495C17.354 11.4969 17.3012 11.3026 17.1486 11.2153Z"
                fill={color}
            />
            <path
                d="M10.7278 12.0033C10.7884 12.057 10.8639 12.0836 10.939 12.0836C11.0265 12.0836 11.1135 12.0479 11.1763 11.9777C11.2934 11.8467 11.2824 11.6455 11.1514 11.5284C11.1346 11.5133 9.45162 10.0413 7.40015 11.2151C7.2476 11.3024 7.19478 11.4967 7.28193 11.6493C7.36939 11.8018 7.56326 11.8545 7.71612 11.7675C9.36168 10.8252 10.6726 11.9548 10.7278 12.0033Z"
                fill={color}
            />
            <path
                d="M15.5708 19.9256C15.469 20.0052 15.3322 20.0179 15.2208 19.9543C13.2388 18.8535 11.3108 18.8535 9.32876 19.9543C9.28105 19.9797 9.22696 19.9956 9.17606 19.9956C9.09971 19.9956 9.02652 19.9702 8.96926 19.9193C8.86745 19.8334 8.82927 19.6934 8.87382 19.5693C9.16016 18.7739 10.0605 16.9287 12.2748 16.9287C14.2441 16.9287 15.3385 18.3635 15.6821 19.5916C15.7139 19.7157 15.6726 19.8461 15.5708 19.9256Z"
                fill={color}
            />
        </svg>
    );
};
export default FrownIcon;