import Svg, {Path} from "react-native-svg";

const LogoutIcon = ({size}) => {
    return(
        <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 36 36" fill={'#707070'}>
            <Path id="logout" d="M9,42a2.878,2.878,0,0,1-2.1-.9A2.878,2.878,0,0,1,6,39V9a2.878,2.878,0,0,1,.9-2.1A2.878,2.878,0,0,1,9,6H23.55V9H9V39H23.55v3Zm24.3-9.25L31.15,30.6l5.1-5.1H18.75v-3h17.4l-5.1-5.1,2.15-2.15,8.8,8.8Z" transform="translate(-6 -6)"/>
        </Svg>
    )
}

export default LogoutIcon