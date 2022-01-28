import React, { useEffect, useState } from "react";
import LoadingIcons from "react-loading-icons";
import "./Main.css";

import IncorrectLoginData from "../../popups/IncorrectLoginData";

import { Jobs, Profile, Skills } from "../..";
import { Ijobs, Iskills } from "../../../Interfaces/cv";
import { onAuthStateChanged, signInWithEmailAndPassword, /*User,*/ signOut, getAuth } from "firebase/auth";

import { collection, getDocs } from "firebase/firestore";
import FirebaseServices from "../../../firebase/firebaseServices";

const db = FirebaseServices.getFirestoreInstance();

const Main: React.FC = () => {
    
    const [ email, setEmail ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    //const [ user, setUser ] = useState<User|null>(null);
    const [ isAdmin, setIsAdmin ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [skills, setSkills] = useState<Iskills[]>([]);
    const [jobs, setJobs] = useState<Ijobs[]>([]);
    const [profileText, setProfileText] = useState<string>("");

    const [open, setOpen] = useState<boolean>(false);

    const authInstance = FirebaseServices.getAuthInstance();

    const handleLogin = () => {
        if (!email || !password) return setOpen(true);
        setLoading(true);
        
        signInWithEmailAndPassword(authInstance, email, password)
            .then(() => {
                setEmail("");
                setPassword("");
                setLoading(false);
            })
            .catch(() => {
                //console.log(err.message);
                setLoading(false);
                setOpen(true);
            })
    };

    const handleLogout = () => {
        const auth = getAuth();

        setLoading(true);

        signOut(auth).then(() => {
            setLoading(false);
            alert("Logged Out Successfully");
        }).catch(() => {
            setLoading(false);
            alert("Logging Out Failed");
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authInstance, (user) => {
            if (user) {
                user.getIdTokenResult()
                    .then((idTokenResult) => {
                        //setUser(user);
                        setIsAdmin(!!idTokenResult.claims.admin);
                        console.log("Email verified", user.emailVerified);
                    })
            } else {
                //setUser(null);
                setIsAdmin(false);
            }
        });

        return () => unsubscribe();
    });

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "portfolio"));
      const obj: any = {};

      querySnapshot.forEach((doc) => {
        obj[doc.id] = doc.data();
      });

      setSkills(obj.skills.skillsArr);
      setJobs(obj.jobs.jobsArr);
      setProfileText(obj.profile.text);
    })();
  }, []);

    return !isAdmin ? (
        <div className="text-center mt-44 md:mt-64">
            <IncorrectLoginData open={ open } setOpen={ setOpen } />
            <div className="block">
                <div>
                    <input className="w-[20rem] text-black text-center rounded-lg mb-2 shadow-md shadow-black placeholder:text-center" type="email" value={ email } onChange={ (e) => setEmail(e.target.value) } placeholder="Käyttäjänimi" />
                </div>
                <div>
                    <input className="w-[20rem] text-black text-center rounded-lg mb-5 shadow-md shadow-black placeholder:text-center" type="password" value={ password } onChange={ (e) => setPassword(e.target.value) } placeholder="Salasana" />
                </div>
                <button type="button" className="py-3 bg-cyan-500 rounded-lg w-[20rem] shadow-md shadow-black text-center justify-between space-x-4 disabled:cursor-not-allowed" onClick={ () => handleLogin() } disabled={ loading }>
                    { loading ? <LoadingIcons.TailSpin className="w-6 h-6 inline" /> : null }
                    { loading ? <p className="inline">Kirjaudutaan...</p> : <p className="inline">Kirjaudu</p> }
                </button>
            
            </div>
        </div>
    ) : (
        <div>
            <div className="float-right select-none mr-4 mt-2 md:mr-12">
                <button type="button" className="py-3 bg-cyan-500 rounded-lg w-[11rem] shadow-md shadow-black text-center justify-between space-x-4 disabled:cursor-not-allowed" onClick={ () => handleLogout() } disabled={ loading }>
                    { loading ? <LoadingIcons.TailSpin className="w-6 h-6 inline" /> : null }
                    { loading ? <p className="inline">Kirjaudutaan ulos...</p> : <p className="inline">Kirjaudu Ulos</p> }
                </button>
            </div>
            
            <Profile profileText={ profileText } />
            <Skills skills={ skills } />
            <Jobs jobs={ jobs } />
            
        </div>
    )
}

export default Main;
