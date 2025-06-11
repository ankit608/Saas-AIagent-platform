import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/app/trpc/routers/_app";
import { Interface } from "readline";

export type AgentGetOne = inferRouterOutputs<AppRouter>["agents"]["getOne"]