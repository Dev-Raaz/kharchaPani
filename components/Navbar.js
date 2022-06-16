import {View, Text, Image, TouchableOpacity} from 'react-native'
import navbar from '../styles/components/navbar'
import MenuIcon from '../assets/buttons/menu'
import LogoIcon from '../assets/branding/logo'

const Navbar = () => {
    return (
        <View>            
            <View style={navbar.nav}>
                
                <View style={navbar.logo}>
                    <LogoIcon/>
                    <Text style={navbar.logoTxt}>Kharcha Pani</Text>
                </View>

                <TouchableOpacity>
                    <MenuIcon height={16} width={24}/>
                </TouchableOpacity>
            </View>

            {
                <View style={navbar.navMob}>
                    <Text>Mob Nav</Text>
                </View>
            }
        </View>
    )
}

export default Navbar