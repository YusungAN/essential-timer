import { useState } from "react";

export const useLoading = <T>(
  action: (...args: any[]) => Promise<T>
): [boolean, (...args: any[]) => Promise<T>] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleData = async (...args: any[]) => {
    setIsLoading(true);
    return await action(...args).finally(() => setIsLoading(false));
  };

  return [isLoading, handleData];
};