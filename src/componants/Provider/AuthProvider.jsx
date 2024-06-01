import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = async (email, password) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const loginUser = async (email, password) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential;
        } catch (error) {
            console.error("Error logging in user:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signOutUser = async () => {
        setLoading(true);
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out user:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('User in the auth state change:', currentUser);
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unSubscribe();
        };
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        signOutUser
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
