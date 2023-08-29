import { useQuery } from "@tanstack/react-query";
import { getSettings as getSettingsApi } from "../../services/apiSettings";

export const useSettings = () => {
  const {
    isLoading,
    data: settings,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettingsApi,
  });

  return {
    settings,
    isLoading,
    error,
  };
};
