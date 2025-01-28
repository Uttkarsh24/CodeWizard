import rank from "../dataset/rank.js";

const updateRank = (points) => {
    const updatedRank = rank.filter((r) => points >= r.points);
    const highestRank = updatedRank.reduce((max, current) =>
        current.points > max.points ? current : max, updatedRank[0]);
    return highestRank.title;
};

export default updateRank;