import Image from "next/image";
import { StyledActionItem } from "./action-item.style";
import Link from "next/link";

interface Props {
    route: string;
    name: string;
    source: string;
}

function ActionItem({ route, name, source }: Props) {
    return (
        <StyledActionItem>
            <Link href={`/${route}`}>
                <span>
                    <Image
                        src={source}
                        alt={`${name} Logo`}
                        width={25}
                        height={20}
                    />
                </span>
                <p>{name}</p>
            </Link>
        </StyledActionItem>
    );
}

export default ActionItem;