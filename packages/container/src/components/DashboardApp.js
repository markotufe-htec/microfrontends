import React, { useRef, useEffect } from "react";
import { mount as mountDashboard } from "dashboard/DashboardApp";

//ovaj onSignIn smo prosledili iz App.js container aplikacije
export default () => {
  //referenca za html elementa gde cemo renderovati mount aplikaciju
  const ref = useRef(null);

  //zelimo da pozovemo mount funkciju samo jednom, kada se app komponenta prvi put prikazala
  useEffect(() => {
    mountDashboard(ref.current);
  }, []);

  return <div ref={ref} />;
};
