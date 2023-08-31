import { defineStore } from "pinia";
import supabase from "../lib/supabase";
import { ref, watchEffect } from "vue";

export const useUserStore = defineStore("userStore", () => {
  const userData = ref();
  const user = ref();
  const errorUp = ref();
  const errorIn = ref();

  const createNewUser = async (email, password, userName) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          user_name: userName
        },
      },
    });
    if (error) {
      alert(error.message);
      errorUp.value = error.message;
    } else {
    alert('User created')
    }
  };

  const logInUser = async (email, password) => {  
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
    if (error) {
        alert(error.message);
        errorIn.value = error.message;
      } else {
        console.log("Logged in: ", data)
        alert('Login successful')
      }
  };

  const logOutUser = async () => {
       const { error } = await supabase.auth.signOut()
    if (error) {
        alert(error.message);
        // errorIn.value = error.message;
      } else {
        console.log("Logged out")
      }
  };

    const getCurrentUser = async () => { 
        const { data, error } = await supabase.auth.getSession()
        if (error) {
            console.log(error.message);
            // errorIn.value = error.message;
          } else {
            user.value = data.session.user;
            console.log(user.value)
          } 
  };

  watchEffect(() => {
    if (user.value) {
        localStorage.setItem("userData", JSON.stringify(user.value));
         const storedData= localStorage.getItem("userData");  
         const originalData = JSON.parse(storedData); 
         userData.value = originalData;
    
        console.log (userData.value);
    } else if (localStorage.getItem("userData") !== null) {
        const storedData= localStorage.getItem("userData");  
        const originalData = JSON.parse(storedData); 
        userData.value = originalData;

        console.log (userData.value);
    } else if (localStorage.getItem("userData") === null) {
        console.log ("watchEffect");
    }
});

  return { userData, errorUp, errorIn, createNewUser, logInUser, logOutUser, getCurrentUser };
});
