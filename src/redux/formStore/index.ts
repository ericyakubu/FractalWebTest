import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { changeURL } from "../../utils";
import { RootState } from "..";

interface InitialStateType {
  page?: boolean;
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

  modal?: {
    success: boolean;
    error: boolean;
  };
}

const URL = "";

const initialState: InitialStateType = {
  page: false,
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
      const check = thunkAPI.getState() as RootState;
      const form = { ...check.form };

      delete form?.modal;
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
      state.page = !state.page;
    },
    submitFirstForm: (state, action) => {
      state.nickname = action.payload.nickname;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.sex = action.payload.sex;
      changeURL(2);
      state.page = !state.page;
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
        state.page = !state.page;
      }
    },
    submitThirdForm: (state, action) => {
      state.aboutMe = action.payload.aboutMe;
    },
    handleShowModal: (state, action) => {
      if (!state.modal) return;
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
    handleGoBack: (state) => {
      state.page = !state.page;
      const urlParams = new URLSearchParams(window.location.search);
      const step = Number(urlParams.get("step"));

      if (step === 2 || step === 3) changeURL(step - 1);
      if (step === 1) changeURL(0);
    },
    handleFinish: (state) => {
      if (!state.modal) return;
      state.modal.success = false;
      state.modal.error = false;
      changeURL(0);

      state.page = !state.page;
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
