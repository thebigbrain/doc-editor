/**
 * @return {number}
 */
function Normal(z) {
  return Math.exp(-1 * z * z / 2) / Math.sqrt(2 * Math.PI);
}

/**
 * @return {number}
 */
function NormDist(z) {
  if (z > 6) return 1;
  if (z < -6) return 0;
  let gamma = .2316419,
    a1 = .31938153,
    a2 = -.356563782,
    a3 = 1.781477937,
    a4 = -1.821255978,
    a5 = 1.330274429;
  let k = 1 / (1 + Math.abs(z) * gamma);
  let n = k * (a1 + k * (a2 + k * (a3 + k * (a4 + k * a5))));
  n = 1 - Normal(z) * n;
  if (z < 0) return 1 - n;
  return n;
}

/**
 * @return {number}
 */
function calcD1(futures, sigma, strike, time) {
  let L01 = Math.log(futures / strike);
  let L02 = Math.pow(sigma, 2) / 2 * time;
  let L03 = sigma * Math.sqrt(time);
  return (L01 + L02) / L03;
}

/**
 * @return {number}
 */
function calcD2(d1, sigma, dT_t) {
  let L03 = sigma * Math.sqrt(dT_t);
  return d1 - L03;
}

/*
 * @param futures - 当前标的价格          S
 * @param sigma - 年波动率 < 1.0       σ(sigma)
 * @param risk free rate - 修正的无风险利率         r
 * @param strike - 执行价（元）          X
 * @param time - 到期时间(年)         time，比如剩余天数为1，则为 1/365
 */
function calcD(futures, strike, sigma, riskfreerate, time) {
  let K = strike, F = futures;
  let d1 = calcD1(futures, sigma, strike, time);
  let d2 = calcD2(d1, sigma, time);
  let df = Math.exp(-1 * riskfreerate * time);
  return {d1, d2, df, K, F };
}

/**
 * 认购期权理论价
 * @return {number} - 认购期权理论价
 */
function calcCall(d1, d2, df, K, F) {
  return df * (F * NormDist(d1) - K * NormDist(d2));
}

/**
 * 认沽期权理论价
 * @return {number} -认沽期权理论价
 */
function calcPut(d1, d2, df, K, F) {
  return df * (K * NormDist(-1 * d2) - F * NormDist(-1 * d1));
}

function calcOptionPrice(futures, strike, sigma, riskfreerate, time) {
  let {d1, d2, df, K, F} = calcD(Number(futures), Number(strike), Number(sigma), Number(riskfreerate), Number(time));
  return { call: calcCall(d1, d2, df, K, F), put: calcPut(d1, d2, df, K, F) };
}

function calcMargin(S, K, n, margin_ratio, isCall) {
  S = Math.round(Number(S) * 100);
  K = Math.round(Number(K) * 100);
  margin_ratio = Math.round(Number(margin_ratio) * 100) + 1;
  let V = K - S;
  V = isCall ? Math.max(V, 0) : Math.max(-V, 0);
  V = V * n;
  let T = Math.round(S * n * margin_ratio / 100);
  let margin = Math.round(.5 * V);
  return Math.max(T - margin, margin) / 100;
}

module.exports = {
  calcOptionPrice,
  calcMargin
};
