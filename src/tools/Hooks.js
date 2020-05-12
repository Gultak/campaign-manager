import { useState, useContext, useEffect } from "react";
import { FirebaseContext, UserContext } from "../constants/contexts";

export function useForm(callback) {
  const [data, setData] = useState({});

  function handleSubmit(event) {
    event && event.preventDefault();
    callback();
  }

  function handleInputChange(event) {
    event.persist();
    setData(data => ({ ...data, [event.target.name]: event.target.value }));
  }

  return { handleSubmit, handleInputChange, data, setData };
}

export function useUser(uid) {
  const [user, setUser] = useState(null);

  const firebase = useContext(FirebaseContext);
  const loggedInUser = useContext(UserContext);

  useEffect(() => {
    if (uid) {
      firebase.user(uid).get().then(userData => setUser(userData.data())).catch((error) => alert("Error loading user data:" + error));
    } else {
      setUser(loggedInUser.user);
    }
  }, [firebase, loggedInUser, uid]);

  return user;
}

export function useTimer(seconds) {
  const [timerElapsed, setTimerElapsed] = useState(false);

  useEffect(() => {
    if (!timerElapsed) {
      const timer = setTimeout(() => {
        setTimerElapsed(true);
      }, seconds);
      return () => clearTimeout(timer);
    }
  }, [timerElapsed, seconds]);

  return timerElapsed;
}
