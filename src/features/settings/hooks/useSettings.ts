import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../../services/apiSettings";

export function useSettings() {
  const { data, error, isLoading } = useQuery(["settings"], getSettings);

  return { settings: data, error, isLoading };
}