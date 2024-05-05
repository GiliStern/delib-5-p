import { Statement } from "delib-npm";
import { updateStatementText } from "../../../../../../../controllers/db/statements/setStatements";

export function handleSubmitInfo(
    e: any,
    statement: Statement,
    setEdit: React.Dispatch<React.SetStateAction<boolean>>,
    setShowInfo: React.Dispatch<React.SetStateAction<boolean>>,
) {
    e.preventDefault();
    try {
        //get data from form
        const form = e.currentTarget;
        const title = form.title.value;
        const description = form.description.value;

        //add title and description
        const text = `${title}\n${description}`;

        //update statement to DB
        if (!statement) throw new Error("No statement");
        updateStatementText(statement, text);
        setEdit(false);
        setShowInfo(false);
    } catch (error) {
        console.error(error);
    }
}
