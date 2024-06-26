import useClickOutside from "@/hooks/useClickOutside";
import genId from "@/lib/genId";
import { useTimerStore } from "@/store/timerStore";
import { LightBulbIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";

export default function HintPanel() {
  const { displayHint, setDisplayHint, selectedCube, isSolving, hint } =
    useTimerStore();
  const t = useTranslations("Index.HomePage");
  const componentRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(componentRef, () => setDisplayHint(false));

  return (
    <>
      <AnimatePresence>
        {displayHint && selectedCube && !isSolving ? (
          <div className="absolute w-full h-auto font-medium text-black bottom-0 overflow-hidden z-20">
            <motion.div
              initial={{ y: 400, opacity: 0.8 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 400, opacity: 0.8 }}
              transition={{ type: "lineal" }}
              ref={componentRef}
              className="bg-yellow-100 bottom-0 rounded-t-lg w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-sm mx-auto h-full"
            >
              <div className="p-2 border-b text-2xl border-gray-300 flex justify-between items-center">
                <div>{t("hint")}</div>
                <div className="text-black">
                  <LightBulbIcon className="w-6 h-6" />
                </div>
              </div>
              <div className="p-3 max-h-full overflow-auto">
                <div>{t("optimal-yellow-layer")}</div>
                {hint?.cross.map((i) => (
                  <OptimalCrossLayer key={genId()} solution={i} type="cross" />
                ))}
                {hint?.xcross.map((i) => (
                  <OptimalCrossLayer key={genId()} solution={i} type="xcross" />
                ))}
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function OptimalCrossLayer({
  solution,
  type,
}: {
  solution: string;
  type: "cross" | "xcross";
}) {
  return (
    <>
      <div className="text-xl font-normal select-text">
        {type.charAt(0).toUpperCase()}
        {type.slice(1)} - {solution}
      </div>
    </>
  );
}
