import React, { useRef, useEffect } from "react";
import { mount as mountMarketing } from "marketing/MarketingApp";
import { useHistory } from "react-router-dom";

export default () => {
  //referenca za html elementa gde cemo renderovati mount aplikaciju
  const ref = useRef(null);
  //history objekat koji se trenutno koristi u containeru (kopija browser history)
  const history = useHistory();

  //zelimo da pozovemo mount funkciju samo jednom, kada se marketing komponenta prvi put prikazala
  useEffect(() => {
    const { onParentNavigate } = mountMarketing(ref.current, {
      initialPath: history.location.pathname,
      //radimo rename (predstavlja path koji marketing aplikacija zeli da poseti)
      onNavigate: ({ pathname: nextPathname }) => {
        //ovde cemo videti koji url marketing aplikacija posecuje i azuriracemo browser history
        console.log("The container notice navigation in Marketing");
        console.log(nextPathname); //komunikacija iz memory history ka containeru
        //push funkcija kaze: hej history objektu, zelimo da odemo na odredjeni path

        //zelimo da radimo navigaciju samo ako su current i next pathname razliciti
        const { pathname } = history.location; //trenutna putanja gde smo
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      }
    });

    //detektujemo da se navigacija desila i prenosimo najnoviju rutu
    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
