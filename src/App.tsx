import { useSelector } from "react-redux";
import { FirstForm, SecondForm, ThirdForm } from "./components/Forms";
import Landing from "./components/Landing";
import Modal from "./components/Modal";
import "./styles/global.scss";
import { RootState } from "./redux";
import { useEffect, useState } from "react";

function App() {
  const { modal, page } = useSelector((state: RootState) => state.form);
  const [step, setStep] = useState<number>();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setStep(Number(urlParams.get("step")));
  }, [page]);

  return (
    <>
      {!step ? (
        <Landing />
      ) : step === 1 ? (
        <FirstForm />
      ) : step === 2 ? (
        <SecondForm />
      ) : step === 3 ? (
        <ThirdForm />
      ) : null}
      {modal && modal.success && <Modal type="success" />}
      {modal && modal.error && <Modal type="error" />}
    </>
  );
}

export default App;
