import { useState, useContext, useEffect } from "react";
import { FirebaseContext, UserContext } from "../constants/contexts";

export function useForm(callback, initialData) {
  const [data, setData] = useState(initialData || {});

  function handleSubmit(event) {
    event && event.preventDefault();
    callback();
  }

  function handleInputChange(event, eventData) {
    event.persist();
    setData(data => ({ ...data, [eventData?.name || event?.target?.name]: (eventData?.value || event?.target?.value) }));
  }

  return { handleSubmit, handleInputChange, data, setData };
}

export function useUser(uid) {
  const [user, setUser] = useState(null);
  const firebase = useContext(FirebaseContext);
  const loggedInUser = useContext(UserContext);
  const userid = uid || loggedInUser.uid;

  useEffect(() => {
    if (uid) {
      firebase.user(uid).onSnapshot(userData => {
        setUser(userData.data());
      });
    } else {
      setUser(loggedInUser.user);
    }
  }, [firebase, loggedInUser, uid]);

  return { user, userid };
}

export function useCharacter(characterid) {
  const firebase = useContext(FirebaseContext);
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    firebase.character(characterid).onSnapshot(data => {
      setCharacter(data.data());
    });
  }, [firebase, characterid]);

  return { character, characterid };
}

export function useCampaign(campaignid) {
  const firebase = useContext(FirebaseContext);
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    firebase.campaign(campaignid).onSnapshot(data => {
      setCampaign(data.data());
    });
  }, [firebase, campaignid]);

  return { campaign, campaignid };
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
