"use client";

import Image from "next/image";
import { StyledServicesNavigation } from "./services-navigation.style";
import { useRouter } from "next/navigation";

interface Props {
  currentService: string;
  services: {
    [key: string]: {
      name: string;
      source: string;
    };
  };
  click?: (el: {
    name: string;
    source: string;
  }) => void;
}

function ServicesNavigation({ currentService, services, click }: Props) {
  const router = useRouter();

  return (
    <StyledServicesNavigation>
      {Object.entries(services).map(([key, value]) => (
        <div
            key={key}
          onClick={click ? () => click({
            name: value.name,
            source: value.source
          }) : () => router.push(`/${key}`)}
          style={{
            backgroundColor: currentService === key ? "#303133" : "#191B1D",
          }}
        >
          <Image src={value.source} alt="Service Icon" width={35} height={35} />
        </div>
      ))}
    </StyledServicesNavigation>
  );
}

export default ServicesNavigation;
