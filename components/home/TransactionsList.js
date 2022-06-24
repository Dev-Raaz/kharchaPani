import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native'
import { StyleSheet } from 'react-native'

import Variables from '../../styles/variables'
import Cards from '../../styles/cards'
import Containers from '../../styles/containers'
import Typography from '../../styles/typography'
import { SafeAreaView } from 'react-native-safe-area-context'

const RenderItem = ({item, hideTransactionView, setViewTransaction}) => {
    
    return (
        <TouchableOpacity style={styles.listItem}
            onPress={()=>{
                hideTransactionView(false)
                setViewTransaction(item)
            }}>
            <View style={styles.innerContainer}>
                {
                    item.type == 'expense'
                    ? <Image style={styles.image} source={require('../../assets/images/expense.png')}/>
                    : <Image style={styles.image} source={require('../../assets/images/income.png')}/>
                }
                <View style={styles.details}>
                    <Text style={styles.detailsTitle}>{item.title || 'Item'}</Text>
                    <Text style={item.type == 'income' ? styles.incomeTxt : styles.expenseTxt}>
                        {item.type == 'income' ? '+' : '-' }₹{item.amount || 0}
                    </Text>
                </View>
            </View>
            <Text>{`${new Date(item.updatedAt).getDate()}-${new Date(item.updatedAt).getMonth()}-${new Date(item.updatedAt).getYear()}`}</Text>
        </TouchableOpacity>
    )
    
}


const TransactionsList = ({transactions, hideTransactionView, setViewTransaction}) =>{

    

    return (
        <View style={Containers.topM}>
            <Text style={Typography.h3}>Transactions History</Text>
            
            {/* If no transactions then we show no transactions yet */}

                 
                <View style={Containers.topM}>
                <View style={Cards.verCard}>
                    {
                        transactions == [] || transactions == null || transactions == '' || transactions == undefined
                        ? <Text>No transactions yet . . </Text>
                        : transactions.map(transaction=> 
                        <RenderItem 
                            key={transaction._id}
                            item={transaction} 
                            hideTransactionView={hideTransactionView}
                            setViewTransaction={setViewTransaction}/>)
                    }
                </View>
            </View>
            
        </View>
    )

}

const styles = StyleSheet.create({
    listItem: {
        padding: Variables.sizes.szXs,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    incomeTxt: {
        color: Variables.color.success
    },

    expenseTxt: {
        color: Variables.color.error
    },

    innerContainer: {
        flexDirection: 'row'
    },
    image: {
        height: 48,
        width: 48,
        borderRadius: 6
    },
    details: {
        marginLeft: 8,
        marginRight: 8
    },
    detailsTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 6
    }
})


export default TransactionsList