import { useHistory } from "react-router-dom";
function Logout() {
    localStorage.removeItem("my_token");
    const history = useHistory()
    history.push("/")
}
export default Logout