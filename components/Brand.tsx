import { LuArrowUpRight } from "react-icons/lu";

export function Brand() {
  return <img className="brand-logo" src="/logo-paytium.svg" alt="Paytium" />;
}

export function Arrow() {
  return <LuArrowUpRight className="icon icon-arrow" aria-hidden="true" />;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow"><span />{children}</p>;
}

export function OrbitMark({ light = false }: { light?: boolean }) {
  return <div className="orbit-mark" aria-hidden="true"><i /><i /><b><img src={light ? "/paytium-icon-white.svg" : "/paytium-icon.svg"} alt="" /></b></div>;
}
