function calculateSkip(page, take) {
  return (parseInt(page, 10) - 1) * take;
}

function calculatePages(total, take = 4) {
  let pages = 1;

  if (total > take) {
    pages = total / take;

    if (pages > Math.floor(pages)) {
      pages = Math.floor(pages) + 1;
    }
  }

  return pages;
}

module.exports = {
  calculateSkip,
  calculatePages,
};
