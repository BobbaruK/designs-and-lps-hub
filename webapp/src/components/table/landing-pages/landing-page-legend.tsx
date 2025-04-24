import { FaTrafficLight, FaWhatsapp } from "react-icons/fa";
import { TbBrandAstro } from "react-icons/tb";

export const LandingPageLegend = () => {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-1 md:gap-x-8">
      <div className="flex items-center gap-2">
        <TbBrandAstro size={20} />
        <span className="text-xs">Is ARTS?</span>
      </div>
      <div className="flex items-center gap-2">
        <FaWhatsapp size={20} />
        <span className="text-xs">Has Whatsapp functionality?</span>
      </div>
      <div className="flex items-center gap-2">
        <FaTrafficLight size={20} />
        <span className="text-xs">Is ready for traffic?</span>
      </div>
    </div>
  );
};
