import React, { useRef, useEffect } from "react";
import { mount as mountAuth } from "auth/AuthApp";
import { useHistory } from "react-router-dom";

//ovaj onSignIn smo prosledili iz App.js container aplikacije
export default ({ onSignIn }) => {
  //referenca za html elementa gde cemo renderovati mount aplikaciju
  const ref = useRef(null);
  //history objekat koji se trenutno koristi u containeru (kopija browser history)
  const history = useHistory();

  //zelimo da pozovemo mount funkciju samo jednom, kada se app komponenta prvi put prikazala
  useEffect(() => {
    const { onParentNavigate } = mountAuth(ref.current, {
      initialPath: history.location.pathname,
      //radimo rename (predstavlja path koji app aplikacija zeli da poseti)
      onNavigate: ({ pathname: nextPathname }) => {
        //ovde cemo videti koji url app aplikacija posecuje i azuriracemo browser history
        console.log("The container notice navigation in App");
        console.log(nextPathname); //komunikacija iz memory history ka containeru
        //push funkcija kaze: hej history objektu, zelimo da odemo na odredjeni path

        //zelimo da radimo navigaciju samo ako su current i next pathname razliciti
        const { pathname } = history.location; //trenutna putanja gde smo
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      onSignIn: () => {
        console.log("User signed in");
        onSignIn(); //setState kao props
      }
    });

    //detektujemo da se navigacija desila i prenosimo najnoviju rutu
    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
