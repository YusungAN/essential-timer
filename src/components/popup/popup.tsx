import Button from "./subs/button";
import { useState, useEffect, useRef } from "react";
import { PopUpArgs } from "../../store/usePopupStore";
import { usePopupStore } from "../../store/usePopupStore";
import { generateSlug } from "random-word-slugs";

function Popup() {
  const [description, setDescription] = useState("");
  const [popupType, setPopupType] = useState<"alert" | "confirm" | "prompt">(
    "alert"
  );
  const [yesButtonText, setYesButtonText] = useState("OK");
  const [noButtonText, setNoButtonText] = useState("No");
  const [propmtText, setPromptText] = useState("");

  const onYesRef = useRef(() => {});
  const onNoRef = useRef(() => {});

  const isOpen = usePopupStore((state) => state.isOpen);
  const closePopUp = usePopupStore((state) => state.closePopUp);
  const setPromptValue = usePopupStore((state) => state.setPropmt);

  function initDataForOpenPopUp(e: CustomEvent<PopUpArgs>) {
    setDescription(e.detail.description);
    setPopupType(e.detail.popupType);
    setYesButtonText(e.detail.yesButtonText);
    setNoButtonText(
      e.detail.noButtonText === undefined ? "No" : e.detail.noButtonText
    );
    if (e.detail.popupType === "prompt") setPromptText(generateSlug());
    if (e.detail.actionOnYes !== undefined)
      onYesRef.current = e.detail.actionOnYes;
    if (e.detail.actionOnNo !== undefined)
      onNoRef.current = e.detail.actionOnNo;
  }

  function closePopupWithAction(action: () => void) {
    action();
    closePopUp();
  }

  function closePromptWithAction(action: (prompt: string) => void) {
    action(propmtText);
    setPromptValue(propmtText);
    closePopUp();
  }

  useEffect(() => {
    window.addEventListener("open-popup", initDataForOpenPopUp);
    return () => window.removeEventListener("open-popup", initDataForOpenPopUp);
  }, []);

  return (
    <div
      className={`fixed z-100 top-0 left-0 w-[100dvw] h-[100dvh] bg-[rgba(0,0,0,0.4)] ${
        isOpen ? "flex" : "hidden"
      } justify-center items-center`}
      onClick={closePopUp}
    >
      <div
        className="w-[300px] p-[20px] bg-white rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-[30px]">{description}</div>
        <div className="flex justify-between">
          {popupType === "alert" ? (
            <Button
              width={"100%"}
              height={"40px"}
              text={yesButtonText}
              color={"#64646F"}
              onClick={() => closePopupWithAction(onYesRef.current)}
            />
          ) : popupType === "confirm" ? (
            <>
              <Button
                width={"48%"}
                height={"40px"}
                text={yesButtonText}
                color={"#64646F"}
                onClick={() => closePopupWithAction(onYesRef.current)}
              />
              <Button
                width={"48%"}
                height={"40px"}
                text={noButtonText}
                color={"#9696A2"}
                onClick={() => closePopupWithAction(onNoRef.current)}
              />
            </>
          ) : (
            <div className="w-full flex flex-col">
              <input
                type="text"
                value={propmtText}
                onChange={(e) => setPromptText(e.target.value)}
                className="rounded-md bg-[#F4F4F7] p-[10px] mb-[10px]"
              />
              <Button
                width={"100%"}
                height={"40px"}
                text={yesButtonText}
                color={"#64646F"}
                onClick={() => closePromptWithAction(onYesRef.current)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Popup;
