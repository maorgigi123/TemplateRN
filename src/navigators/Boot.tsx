import { useSelector } from "react-redux";
import AuthNavigator from "./AuthNavigator";
import RootNavigator from "./RootNavigator";
import { selectIsLoggedIn } from "../../store/user/user.selector";

const Boot = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    if(isLoggedIn){
        return <RootNavigator />;
    }else{
        return <AuthNavigator />;
    }
};
export default Boot;