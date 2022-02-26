import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import { Ijobs, Iskills } from "../../../../Interfaces/cv";

import Jobs from "../../../Management/Jobs";
import Profile from "../../../Management/Profile";
import Skills from "../../../Management/Skills";
import Footer from "../../../Footer/ManagementFooter";

import FirebaseServices from "../../../../firebase/firebaseServices";
import { collection, getDocs } from "firebase/firestore";

const db = FirebaseServices.getFirestoreInstance();
const authInstance = FirebaseServices.getAuthInstance();

const CV: React.FC = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [skills, setSkills] = useState<Iskills[]>([]);
    const [jobs, setJobs] = useState<Ijobs[]>([]);
    const [profileText, setProfileText] = useState<string>("");

    useEffect(() => {
        if (!authInstance || authInstance.currentUser === null) return setIsAdmin(false);
        else {
            const unsubscribe = onAuthStateChanged(authInstance, (user) => {
                if (user) {
                    user.getIdTokenResult()
                        .then((idTokenResult) => {
                            setIsAdmin(!!idTokenResult.claims.admin);
                            //console.log("Email verified", user.emailVerified);
                        })
                } else {
                    setIsAdmin(false);
                }
            });

            return () => unsubscribe();
        }
    }, []);

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

    return !isAdmin
        ? (
            <div className="text-center text-2xl font-bold mt-64">
                <p>Not logged in</p>
                <Link to="/login" className="text-blue-600">Log In</Link>
            </div>
        )
        : (
            <div>
                <div className="float-right select-none mr-4 mt-2 md:mr-12">
                </div>

                <Profile profileText={profileText} />
                <Skills skills={skills} />
                <Jobs jobs={jobs} />

                <Footer />
            </div>
        )
}

export default CV;
