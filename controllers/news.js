const axios = require("axios");

const NEWS_BASE_URL = "https://newsapi.org/v2/everything";

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function getLast7DaysRange() {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  return {
    from: formatDate(sevenDaysAgo),
    to: formatDate(today),
  };
}

const getNewsByKeyword = async (req, res, next) => {
  try {
    const { keyword } = req.query;

    // console.log("KEYWORD:", keyword);
    // console.log("API KEY PRESENT:", !!process.env.NEWS_API_KEY);

    if (!keyword) {
      return res.status(400).json({ message: "Keyword is required" });
    }

    const { from, to } = getLast7DaysRange();

    const response = await axios.get(NEWS_BASE_URL, {
      params: {
        q: keyword,
        apiKey: process.env.NEWS_API_KEY,
        from,
        to,
        pageSize: 100,
      },
    });

    return res.json(response.data.articles);
  } catch (error) {
    return next(error);
  }
};

module.exports = { getNewsByKeyword };
