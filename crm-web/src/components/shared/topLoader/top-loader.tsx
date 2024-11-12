"use client";

import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import styles from "./loading.module.scss";

const Loading: React.FC = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  if (!isFetching && !isMutating) {
    return null;
  }

  return <div className={styles.loading} />;
};

export default Loading;
