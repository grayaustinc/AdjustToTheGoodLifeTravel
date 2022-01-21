import { faStar as faSolidStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent, useMemo } from "react";

type StarRatingProps = {
  rating: number;
};

function getRating(rating: number) {
  rating = Math.round(rating) / 2;

  const ratings = [];
  for (let i = 0; i < 5; i++) {
    const d = (rating > i ? 1 : 0) + (rating < i + 1 ? 0 : 1);
    ratings.push(d);
  }
  return ratings;
}

const StarRatingComponent: FunctionComponent<StarRatingProps> = ({ rating }) => {
  const rater = useMemo(() => getRating(rating), [rating]);
  return (
    <div>
      {rater.map((j, i) => {
        switch (j) {
          default:
          case 0:
            return <FontAwesomeIcon key={i} icon={faRegularStar} color="orange" />;
          case 1:
            return <FontAwesomeIcon key={i} icon={faStarHalfAlt} color="orange" />;
          case 2:
            return <FontAwesomeIcon key={i} icon={faSolidStar} color="orange" />;
        }
      })}
    </div>
  );
};

export default React.memo(StarRatingComponent);
