import React, { useRef, useEffect } from "react";
import { mount as mountMarketing } from "marketing/MarketingApp";

export default () => {
  //referenca za html elementa gde cemo renderovati mount aplikaciju
  const ref = useRef(null);

  //zelimo da pozovemo mount funkciju samo jednom, kada se komponenta prvi put prikazala
  useEffect(() => {
    mountMarketing(ref.current);
  });

  return <div ref={ref} />;
};
