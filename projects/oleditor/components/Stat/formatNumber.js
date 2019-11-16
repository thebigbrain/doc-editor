export const formatNumber = (count) => count >= 1000 ? `${(count / 1000).toFixed(1)}k` : `${count}`;
