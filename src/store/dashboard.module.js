import {
    LOGIN,
    LOGOUT,
    REGISTER,
    SET_AUTH,
    UPDATE_USER,
    PURGE_AUTH,
    CHECK_AUTH
  } from "./actions.types.js";
  import { SET_ERROR } from "./mutations.types.js";
  
  const state = {
    errors: {
      status: false,
      message: ""
    },
    count: 0,
    isAuthenticated: localStorage.getItem("token") ? true : false
  };
  const mutations = {
    increment(state) {
      state.count++;
    },
    [SET_AUTH](state, token) {
      state.errors.status = false;
      state.isAuthenticated = true;
      localStorage.setItem("token", token);
    },
    [PURGE_AUTH]() {
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    [SET_ERROR](state, error) {
      state.errors.status = true;
      state.errors.message = error;
    }
  };
  const computed = {
    name: {
      // getter
      get: () => {
        return this.$store.count;
      },
      // setter
      set: newValue => {
        // this.$store.dispatch('updateName', newValue)
      }
    }
  };
  const actions = {
    [LOGIN](context, credentials) {
      return new Promise(resolve => {
        if (
          credentials.username === "admin@gmail.com" &&
          credentials.password === "admin"
        ) {
          context.commit(SET_AUTH, "AUTHENTICATED");
        } else {
          context.commit(SET_ERROR, "Credentials not valid");
        }
        resolve(context);
      });
    },
    [LOGOUT](context) {
      context.commit(PURGE_AUTH);
    },
    [CHECK_AUTH](context) {
      if (localStorage.getItem("token")) {
        context.commit(SET_AUTH, localStorage.getItem("token"));
      } else {
        context.commit(PURGE_AUTH);
      }
    },
    [SET_ERROR](context, error) {
      context.commit(SET_ERROR, error);
    }
  };
  const getters = {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    isError(state) {
      return state.errors;
    }
  };
  
  export default {
    state,
    mutations,
    computed,
    actions,
    getters
  };
  