import Button from "../popup/subs/button";
import { useLoginInfo } from "../../store/useLoginStore";
import { usePopupStore } from "../../store/usePopupStore";
import supabase from "../../supabase";

function LoginButton() {
  const isLogged = useLoginInfo((state) => state.isLogged);
  const updateLoginInfo = useLoginInfo((state) => state.updateLoginInfo);
  const openPopUp = usePopupStore((state) => state.openPopUp);

  async function login() {
    if (!isLogged) {
      supabase.auth.signInWithOAuth({
        provider: "google",
      });
    } else {
      openPopUp({
        description: "정말 로그아웃하시겠습니까?",
        popupType: "confirm",
        yesButtonText: "Yes",
        noButtonText: "No",
        actionOnYes: async () => {
          const { error } = await supabase.auth.signOut();
          if (error) {
            console.log(error);
            alert("로그아웃에 실패했습니다. 다시한 번 시도해주세요.");
            return;
          }
          updateLoginInfo(false, "", "");
        },
      });
    }
  }

  return (
    <div className="absolute top-[10px] right-[10px]">
      <Button
        width="170px"
        height="30px"
        text={!isLogged ? "Login with Google" : "Logout"}
        color="#cfcfd8"
        textColor="#101010"
        onClick={login}
      />
    </div>
  );
}

export default LoginButton;
