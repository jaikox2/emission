-- CreateTable
CREATE TABLE "emission_activity_types" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(512) NOT NULL,

    CONSTRAINT "emission_activity_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emission_sources" (
    "id" SERIAL NOT NULL,
    "file_name" TEXT NOT NULL,
    "scenario_name" VARCHAR(512),
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "owner_id" INTEGER,
    "emission_activity_types_id" INTEGER,

    CONSTRAINT "emission_sources_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "emission_sources" ADD CONSTRAINT "emission_sources_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emission_sources" ADD CONSTRAINT "emission_sources_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emission_sources" ADD CONSTRAINT "emission_sources_emission_activity_types_id_fkey" FOREIGN KEY ("emission_activity_types_id") REFERENCES "emission_activity_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;
