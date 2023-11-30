import { formatDate } from "@/ultis/fomatDate";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface IProps {
    message: string,
    createAt: string,
}

export default function ItemActivity({
    message,
    createAt
}: IProps) {

    const date = new Date(createAt);
    const outputString = formatDate(date as any);
    return (
        <div className="flex px-3 py-2 rounded-2xl gap-2 items-center hover:bg-slate-50 border">
            <FontAwesomeIcon width={36} height={36} className="w-8 h-8" icon={faClipboardList} />
            <div>
                <p className="text-base">{message}</p>
                <p>{outputString}</p>
            </div>
        </div>
    )
}

