const SkeletonArticlesDetail = () => {
  return (
    <main className="container pt-[136px]">
      <div className="mx-auto h-4 w-60 bg-gray-200 rounded animate-pulse text-center" />

      <div className="mx-auto h-8 w-3/4 bg-gray-200 rounded animate-pulse mt-4 mb-10" />

      <div className="relative w-full h-[300px] md:h-[480px] rounded-[12px] overflow-hidden bg-gray-200 animate-pulse" />

      <div className="space-y-4 pt-10 pb-10">
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-10/12 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
      </div>
    </main>
  );
};

export default SkeletonArticlesDetail;
