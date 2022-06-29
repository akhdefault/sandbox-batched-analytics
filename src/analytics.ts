import { Impression } from "./types";

type Datalayer = {
  productImpressions: Impression[];
};

const _dataLayer: Datalayer = {
  productImpressions: [],
};

export function logProductImpressions(impressions: Impression[]) {
  _dataLayer.productImpressions.push(...impressions);
  // const pushed = [..._dataLayer.productImpressions];
  console.log(
    "Pushed to Datalayer, DataLayer: ",
    _dataLayer.productImpressions
  );
}
