import { IconAstro } from "@/components/icons/astro";
import { IconPickaxe } from "@/components/icons/pickaxe";
import { IconTraffic } from "@/components/icons/traffic";
import { IconWhatsapp } from "@/components/icons/whatsapp";

export const LandingPageLegend = () => {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 py-1 md:gap-x-5">
      <div className="flex items-center gap-1">
        <IconAstro />
        <span className="text-xs">Is ARTS?</span>
      </div>
      <div className="flex items-center gap-1">
        <IconWhatsapp />
        <span className="text-xs">Has Whatsapp functionality?</span>
      </div>
      <div className="flex items-center gap-1">
        <IconTraffic />
        <span className="text-xs">Is ready for traffic?</span>
      </div>
      <div className="flex items-center gap-1">
        <IconPickaxe />
        <span className="text-xs">Is under maintenance?</span>
      </div>
    </div>
  );
};
