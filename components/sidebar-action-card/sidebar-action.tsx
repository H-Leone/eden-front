import { ChevronDown, HeartPulse } from "lucide-react";
import { StyledSidebarActionCard } from "./sidebar-action.style";
import { SidebarAction } from "../sidebar/sidebar";
import ActionItem from "../action-item/action-item";

interface Props {
    isMenuOpen: boolean;
    filter: string;
}

function SidebarActionCard({ name, icon, isMenuOpen, list, filter, onClick }: SidebarAction & Props) {
    const getFilteredActions = () => {
        if(list) {
            return Object.entries(list).filter(([key, value]) => value.name.toLowerCase().includes(filter.toLowerCase()));
        } else {
            return [];
        }
    }

    if(!getFilteredActions().length && list) {
        return null;
    }

    return (
        <StyledSidebarActionCard onClick={onClick} isMenuOpen={isMenuOpen}>
            <section>
                <section>
                    {icon}
                    <p>{name}</p>
                </section>
                {list && (
                    <span>
                        <ChevronDown size={20} />
                    </span>
                )}
            </section>
            {(list && isMenuOpen) && (
                <div>
                    {getFilteredActions().map(([key, value]) => (
                        <ActionItem key={key} route={key} {...value} />
                    ))}
                </div>
            )}
        </StyledSidebarActionCard>
    );
}

export default SidebarActionCard;