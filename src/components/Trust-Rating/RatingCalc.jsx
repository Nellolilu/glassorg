import React from "react";

export default function RatingCalc(props) {
  const { company } = props;
  console.log("company in rating", company);

  // CALCULATE RATING

  const maxAnswers = 5;
  const maxProofs = 5;
  let startingValue = 3;

  // GIVES BONUS FOR ALL ANSWERS
  if (company.answers.length === maxAnswers) {
    startingValue += 0.5;
  }

  // SINCE USED ON OTHER PAGES COULD MAKE THIS GLOBALLY VIA PROPS (ALSO THE SINGLE COMP:::)
  const proofCount = company.answers.filter((el) => el.proof).length;

  // GIVES BONUS FOR ALL PROOFED
  if (proofCount === maxProofs) {
    startingValue += 0.5;
  }

  let calcRating = startingValue;

  // COUNTING THE PUBLIC RATINGS
  if (company.ratings.length > 1) {
    //// CALC PUBLIC
    const filteredPublic = company.ratings.filter(
      (el) => el.name !== "anonymus"
    );
    console.log("not anony", filteredPublic);
    const mappedDouble = filteredPublic.map((el) => el.rating * 2);
    console.log("mapped", mappedDouble);
    const publicSum = mappedDouble.reduce((acc, curr) => acc + curr);
    console.log("puclictotal", publicSum);

    ///// CALC PRIVATE
    const filteredPrivate = company.ratings.filter(
      (el) => el.name === "anonymus"
    );
    const mappedResults = filteredPrivate.map((el) => el.rating);
    const privateSum = mappedResults.reduce((acc, curr) => acc + curr);
    console.log("priv", privateSum);
    calcRating += publicSum + privateSum;
  }

  return (
    <div>
      <h1>This is the average {calcRating}</h1>
    </div>
  );
}
