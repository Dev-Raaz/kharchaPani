import Svg, {Path} from "react-native-svg";

const PlusIcon = ({size}) => {
    return(
        <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 45 45">            
            <Path id="plus" fill="#fff" d="M-6339-5321v-14h-15a4,4,0,0,1-4-4,4,4,0,0,1,4-4h15v-15a4,4,0,0,1,4-4,4,4,0,0,1,4,4v15h14a4,4,0,0,1,4,4,4,4,0,0,1-4,4h-14v14a4,4,0,0,1-4,4A4,4,0,0,1-6339-5321Z" transform="translate(6358 5362)"/>
            </Svg>
    )
}

export default PlusIcon