import { useTimerStore } from "@/store/timerStore";
import { Solve } from "@/interfaces/Solve";
import { formatDistanceToNow } from "date-fns";
import { Cube } from "@/interfaces/Cube";
import { sort } from "fast-sort";
import findCube from "@/lib/findCube";
import translation from "@/translations/global.json";
import { useSettingsModalStore } from "@/store/SettingsModalStore";

export default function LastActivity() {
  const { cubes } = useTimerStore();
  const { settings } = useSettingsModalStore();

  const renderLastAct = () => {
    if (cubes) {
      const lastAct: Solve[] = [];
      cubes.forEach((cube: Cube) => {
        cube.solves.all.forEach((i) => {
          lastAct.push(i);
        });
        cube.solves.session.forEach((i) => {
          lastAct.push(i);
        });
      });

      const sorted = sort(lastAct).desc((u) => u.endTime);

      return sorted.slice(0, 10).map((solve, index) => {
        const cube = findCube({ cubeId: solve.cubeId });
        return (
          <div className="text-sm" key={solve.id}>
            {index + 1}. {cube?.category} {cube?.name}{" "}
            {(solve.time / 1000).toFixed(3)}{" "}
            {formatDistanceToNow(new Date(solve.endTime))} ago +{solve.rating}{" "}
            {translation.metrics.cards["rating-points"][
              settings.locale[0].lang
            ].toLowerCase()}
          </div>
        );
      });
    }
    return null;
  };
  return (
    <>
      <div className="border rounded-md border-zinc-800 p-3 w-full text-left sm:text-center">
        <div className="text-xl font-medium mb-3">
          {translation.metrics["last-activity"][settings.locale[0].lang]}
        </div>
        {renderLastAct()}
      </div>
    </>
  );
}