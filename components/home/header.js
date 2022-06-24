import {View, Text, TouchableOpacity} from 'react-native'
import HeaderStyles from '../../styles/components/navbar'
import MenuIcon from '../../assets/buttons/menu'
import LogOutIcon from '../../assets/buttons/logout'

import LogoIcon from '../../assets/branding/logo'

const Navbar = ({signOut, setShowMenu}) => {
    
    return (
        <View style={HeaderStyles.nav}>
            <TouchableOpacity onPress={()=>setShowMenu(true)}>
                <MenuIcon height={20} width={20}/>
            </TouchableOpacity>
            <View style={HeaderStyles.logo}>
                <LogoIcon width={16} height={24}/>
                <Text style={HeaderStyles.logoTxt}>Kharcha Pani</Text>
            </View>

            <TouchableOpacity onPress={()=>signOut()}>
                <LogOutIcon size={20}/>
            </TouchableOpacity>
        </View>
    )
}

export default Navbar