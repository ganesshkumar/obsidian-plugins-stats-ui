import { PluginRatingInfo } from "@/domain/plugins/models/PluginRatingInfo";
import { Progress } from "@/components/ui/progress";

interface StarRatingProps {
  ratingInfo: PluginRatingInfo;
}

export const StarRating = ({ ratingInfo }: StarRatingProps) => {
  if (!ratingInfo) {
    ratingInfo = {
      avgRating: 0,
      ratingCount: 0,
      star1Count: 0,
      star2Count: 0,
      star3Count: 0,
      star4Count: 0,
      star5Count: 0
    }
  }

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const filled = i <= (ratingInfo?.avgRating ?? 0);
    stars.push(
      <span
        key={i}
        className={`cursor-pointer ${filled ? 'text-yellow-400' : 'text-gray-300'} text-xl transition-colors duration-200`}
      >
        ★
      </span>
    );
  }

  const bars = [];  
  for (let i = 5; i > 0; i--) {
    let percentage = 0;
    switch (i) {
      case 1:
        percentage = ratingInfo.ratingCount === 0 ? 0 : ratingInfo.star1Count / ratingInfo.ratingCount * 100;
        break;
      case 2:
        percentage = ratingInfo.ratingCount === 0 ? 0 : ratingInfo.star2Count / ratingInfo.ratingCount * 100;
        break;
      case 3:
        percentage = ratingInfo.ratingCount === 0 ? 0 : ratingInfo.star3Count / ratingInfo.ratingCount * 100;
        break;
      case 4:
        percentage = ratingInfo.ratingCount === 0 ? 0 : ratingInfo.star4Count / ratingInfo.ratingCount * 100;
        break;
      case 5:
        percentage = ratingInfo.ratingCount === 0 ? 0 : ratingInfo.star5Count / ratingInfo.ratingCount * 100;
        break;
    }
    
    bars.push(
      <div className="flex items-center gap-x-2" key={i} >
        <div className="text-sm">{i}</div>
        <Progress value={percentage} className="bg-gray-200 h-3" indicatorColor="bg-yellow-400"  />
      </div>
    );
  }

  return (
    <div className="flex gap-x-8">
      <div>
        <div className="text-6xl tracking-tighter font-bold">{(ratingInfo.avgRating ?? 0).toFixed(1)}</div>
        <div>{stars}</div>
        <div className="text-sm text-gray-500">({ratingInfo.ratingCount ?? 0})</div>
      </div>
      <div className="grow">
        {bars}
      </div>
    </div>
  );
};
