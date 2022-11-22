import { useRouter } from "next/router";

const useRefreshProps = () => {
  const router = useRouter();
  return () => router.push(router.asPath);
};

export default useRefreshProps;
