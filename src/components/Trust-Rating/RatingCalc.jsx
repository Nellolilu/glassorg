import React from "react";

export default function RatingCalc(props) {
  const { company } = props;

  // CALCULATE RATING

  // SET UP FOR BONUS
  const maxAnswers = 4;
  const maxProofs = 4;
  let startingValue = 3;

  // // GIVES BONUS FOR ALL ANSWERS
  if (company.answers.length >= maxAnswers) {
    startingValue += 0.5;
  }

  // SINCE USED ON OTHER PAGES COULD MAKE THIS GLOBALLY VIA PROPS (ALSO THE SINGLE COMP:::)
  const proofCount = company.answers.filter((el) => el.proof).length;
  // GIVES BONUS FOR ALL PROOFED
  if (proofCount >= maxProofs) {
    startingValue += 0.5;
  }

  // SET UP FOR CALCULATION
  // let calcRating = startingValue;
  let calcRating = 0;
  let averageRating;
  let publicSum = 0;
  let privateSum = 0;
  let mappedDouble = 0;
  let mappedSingle = 0;

  // COUNTING THE RATINGS
  if (company.ratings.length > 0) {
    //// CALC PUBLIC
    const filteredPublic = company.ratings.filter(
      (el) => el.name !== "anonymus"
    );
    if (filteredPublic.length > 0) {
      const mappedDoubleArr = filteredPublic.map((el) => el.rating * 2);
      publicSum += mappedDoubleArr.reduce((acc, curr) => acc + curr);
      mappedDouble += mappedDoubleArr.length * 2;
    }
    // console.log(company.ratings.filter((el) => el.name !== "anonymus"));
    //// CALC PRIVATE
    const filteredPrivate = company.ratings.filter(
      (el) => el.name === "anonymus"
    );
    if (filteredPrivate.length > 0) {
      const mappedPrivateArr = filteredPrivate.map((el) => el.rating);
      privateSum += mappedPrivateArr.reduce((acc, curr) => acc + curr);
      mappedSingle += mappedPrivateArr.length;
    }

    // TOTAL RATINGS
    calcRating += publicSum + privateSum + startingValue;
    // console.log("rates", publicSum + privateSum);
    // console.log("starting v", startingValue);
    // console.log("total", calcRating);

    // /// GET AVERAGE
    // PUBLIC COUNTS DOUBLE; INITIAL VALUE COUNTS 2 (to avoid big influence on first rating)
    const divider = mappedDouble + mappedSingle + 2;
    averageRating = calcRating / divider;

    // IF NO RATINGS YET - INITIAL VALUE INCL BONUSSES
  } else {
    averageRating = calcRating + startingValue;
  }

  return <h1 className="av-num">{Math.round(averageRating * 100) / 100}</h1>;
}
