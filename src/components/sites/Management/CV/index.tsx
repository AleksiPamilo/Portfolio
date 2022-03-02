import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Ijobs, Iskills } from "../../../../Interfaces/cv";

import Jobs from "../../../Management/Jobs";
import Profile from "../../../Management/Profile";
import Skills from "../../../Management/Skills";

import FirebaseServices from "../../../../firebase/firebaseServices";
import { collection, getDocs } from "firebase/firestore";
import NotLoggedIn from "../../../Management/NotLoggedIn";

const db = FirebaseServices.getFirestoreInstance();
const authInstance = FirebaseServices.getAuthInstance();

const CV: React.FC = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [skills, setSkills] = useState<Iskills[]>([]);
    const [jobs, setJobs] = useState<Ijobs[]>([]);
    const [profileText, setProfileText] = useState<string>("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authInstance, (user) => {
            if (user) {
                user.getIdTokenResult()
                    .then((idTokenResult) => {
                        setIsAdmin(!!idTokenResult.claims.admin);
                    })
            } else {
                setIsAdmin(false);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        getDocs(collection(db, "portfolio"))
            .then((snapshot) => {
                const obj: any = {};
                snapshot.forEach((doc) => {
                    obj[doc.id] = doc.data();
                });

                setSkills(obj.skills.skillsArr);
                setJobs(obj.jobs.jobsArr);
                setProfileText(obj.profile.text);
            })
    }, []);

    return !isAdmin
        ? (
            <NotLoggedIn />
        )
        : (
            <div className="ml-64">

                <Profile profileText={profileText} />
                <Skills skills={skills} />
                <Jobs jobs={jobs} />

            </div>
        )
}

export default CV;
