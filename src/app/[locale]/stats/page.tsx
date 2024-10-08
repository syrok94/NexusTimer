"use client";

import CategoryStatistics from "@/components/stats/CategoryStatistics";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Index");
  return (
    <>
      {/* container */}
      <div className="max-w-7xl mx-auto px-2 pt-2 flex flex-col w-full min-h-full">
        {/* header */}
        <Card className="w-full mb-2 border p-3 flex flex-col gap-2 bg-background">
          <div className="flex justify-between gap-10">
            <h2 className="font-black text-xl" data-testid="page-title-stats">
              {t("StatsPage.title")}
            </h2>
            <div className="flex items-center gap-2 w-full justify-end">
              <Select defaultValue="overall">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overall">
                    {t("StatsPage.overall")}
                  </SelectItem>
                  <SelectItem value="advanced" disabled>
                    {t("StatsPage.advanced")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
        <CategoryStatistics />
      </div>
    </>
  );
}
