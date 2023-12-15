import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { changeURL } from "../../utils";

interface InitialStateType {
  currentPage: 0 | 1 | 2 | 3;
  phone: string;
  email: string;
  nickname: string;
  name: string;
  surname: string;
  sex: "man" | "woman" | "";
  advantages: string[];
  checkGroup: [boolean, boolean, boolean];
  radioGroup: [boolean, boolean, boolean];
  aboutMe: string;

  modal: {
    success: boolean;
    error: boolean;
  };
}

const URL = "";

const initialState: InitialStateType = {
  currentPage: 0,
  phone: "",
  email: "",
  nickname: "",
  name: "",
  surname: "",
  sex: "",
  advantages: [""],
  checkGroup: [false, false, false],
  radioGroup: [false, false, false],
  aboutMe: "",
  modal: {
    success: false,
    error: false,
  },
};

export const postForm = createAsyncThunk(
  "form/postForm",
  async (_, thunkAPI) => {
    try {
      const check = thunkAPI.getState();
      const form = { ...check.form };

      delete form.modal;
      delete form.currentPage;
      return await axios.post(URL, form);
    } catch (error) {
      console.log(error);
    }
  }
);

export const formStore = createSlice({
  name: "formStore",
  initialState,
  reducers: {
    submitLanding: (state, action) => {
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      changeURL(1);
    },
    submitFirstForm: (state, action) => {
      state.nickname = action.payload.nickname;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.sex = action.payload.sex;
      changeURL(2);
    },
    submitSecondForm: (state, action) => {
      if (action.payload.category === "group") {
        if (action.payload.group === "check") {
          state.checkGroup = action.payload.newChecks;
        }
        if (action.payload.group === "radio") {
          state.radioGroup = action.payload.newRadios;
        }
      }

      if (action.payload.category === "advantages") {
        state.advantages = action.payload.newAdvantages;
        changeURL(3);
      }
    },
    submitThirdForm: (state, action) => {
      state.aboutMe = action.payload.aboutMe;
    },
    handleGoBack: (state, action) => {
      state.currentPage = action.payload;
    },
    handleShowModal: (state, action) => {
      if (action.payload === "success") {
        state.modal.success = true;
        state.modal.error = false;
      } else if (action.payload === "error") {
        state.modal.success = false;
        state.modal.error = true;
      } else {
        state.modal.success = false;
        state.modal.error = false;
      }
    },
    handleFinish: (state) => {
      state.modal.success = false;
      state.modal.error = false;
      state.currentPage = 0;
      let currentUrl = window.location.href;

      if (currentUrl.includes("step=")) {
        const regex = /[?&]step=[^&]+/;
        currentUrl = currentUrl.replace(regex, "");
        currentUrl = currentUrl.replace(/[?&]$/, "");
        window.history.replaceState({}, "", currentUrl);
      }
    },
  },
});

export const {
  submitLanding,
  submitFirstForm,
  submitSecondForm,
  submitThirdForm,
  handleShowModal,
  handleGoBack,
  handleFinish,
} = formStore.actions;

export default formStore.reducer;
