/*
  Warnings:

  - A unique constraint covering the columns `[scenario_name]` on the table `emission_sources` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "emission_sources_scenario_name_key" ON "emission_sources"("scenario_name");
