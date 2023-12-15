import { useSelector } from "react-redux";
import { FirstForm, SecondForm, ThirdForm } from "./components/Forms";
import Landing from "./components/Landing";
import Modal from "./components/Modal";
import "./styles/global.scss";
import { RootState } from "./redux";

function App() {
  const { modal } = useSelector((state: RootState) => state.form);
  const urlParams = new URLSearchParams(window.location.search);
  const step = urlParams.get("step");

  return (
    <>
      {!step ? (
        <Landing />
      ) : step === "1" ? (
        <FirstForm />
      ) : step === "2" ? (
        <SecondForm />
      ) : step === "3" ? (
        <ThirdForm />
      ) : null}
      {modal.success && <Modal type="success" />}
      {modal.error && <Modal type="error" />}
    </>
  );
}

export default App;
