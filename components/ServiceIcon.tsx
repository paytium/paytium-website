import type { IconType } from "react-icons";
import { LuBrainCircuit, LuCloudCog, LuCodeXml, LuCompass } from "react-icons/lu";

const serviceIcons: Record<string, IconType> = {
  consulting: LuCompass,
  "digital-data": LuBrainCircuit,
  engineering: LuCodeXml,
  "cloud-devops": LuCloudCog,
};

type ServiceIconProps = {
  serviceId: string;
  className?: string;
};

export function ServiceIcon({ serviceId, className = "" }: ServiceIconProps) {
  const Icon = serviceIcons[serviceId] ?? LuCompass;

  return (
    <span className={`service-icon service-icon-${serviceId} ${className}`.trim()} aria-hidden="true">
      <Icon />
    </span>
  );
}
