interface LoadingProps {
  errorMessage: string | null;
  isLoading: boolean;
}

function Loading({ errorMessage, isLoading }: LoadingProps) {
  if (isLoading) return <div>Loading...</div>;
  return <div>{errorMessage ?? "Search for a pin code (e.g., 364001)"}</div>;
}

export default Loading;
