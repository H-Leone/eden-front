"use client";

import { StyledSidebar } from "./sidebar.style";
import Logo from "@/public/images/picpay-logo.svg";
import Image from "next/image";
import Jira from "@/public/images/jira.svg";
import AWS from "@/public/images/aws.svg";
import Oracle from "@/public/images/oracle.svg";
import { useState } from "react";
import { BarChart3, HeartPulse, Search } from "lucide-react";
import SidebarActionCard from "../sidebar-action-card/sidebar-action";
import FilterInput from "../filter-input/filter-input";
import { useRouter } from "next/navigation";

const business: { [key: string]: {
    name: string;
    source: string;
} } = {
    "aws": { name: "Amazon Web Services", source: AWS.src },
    "oracle": { name: "Oracle Cloud Infrastructure", source: Oracle.src },
    "jira": { name: "Jira Atlassian", source: Jira.src },
};

export type SidebarAction = {
    name: string;
    icon: JSX.Element;
    list?: { [key: string]: {
        name: string;
        source: string;
    } };
    onClick: () => void;
}

function Sidebar() {
    const router = useRouter();
    const [ actions, setActions ] = useState<SidebarAction[]>([
        {
            name: "Status Pages",
            icon: <HeartPulse size={20} />,
            onClick: () => toggleMenuOpen(),
            list: business
        },
        {
            name: "Dashboard",
            icon: <BarChart3 size={20} />,
            onClick: () => router.push("/dashboard"),
        }
    ]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [ filter, setFilter ] = useState("");

    const toggleMenuOpen = () => {
        setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
    };

    return (
        <StyledSidebar isMenuOpen={isMenuOpen}>
            <Image 
                src={Logo.src} 
                width={80} 
                height={25} 
                alt="Picpay Logo" 
            />

            <FilterInput value={filter} setValue={setFilter} />

            <section>
               {actions.filter((el) => (
                el.name.toLowerCase().includes(filter.toLowerCase()) ||
                el.list
               )).map((el) => (
                <SidebarActionCard filter={filter} key={el.name} isMenuOpen={isMenuOpen} {...el} />
               ))} 
            </section>
        </StyledSidebar>
    );
}

export default Sidebar;