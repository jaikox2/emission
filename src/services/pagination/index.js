function calculateSkip(page, limit) {
  return (parseInt(page, 10) - 1) * limit;
}

function calculatePages(total, limit = 4) {
  let pages = 1;

  if (total > limit && limit > 0) {
    pages = total / limit;

    pages = Math.ceil(pages);
  }

  return pages;
}

module.exports = {
  calculateSkip,
  calculatePages,
};
