import { StyleSheet, View, TouchableOpacity } from "react-native";
import Variables from "../../styles/variables";
import PlusIcon from "../../assets/buttons/plus";

const FAB = ({doStuff}) =>{
    
    return (
    <TouchableOpacity style={styles.FAB} onPress={doStuff}>
        <PlusIcon/>
    </TouchableOpacity>)
}

const styles = StyleSheet.create({
    FAB: {
        padding: 2.4,
        height: 48,
        width: 48,
        borderRadius: 100,
        elevation: 7,
        zIndex: 7,
        position: 'absolute',
        right: 16,
        bottom: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Variables.color.prmColor
    }
})

export default FAB