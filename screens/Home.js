import {View, Text, ScrollView} from 'react-native'

//styles
import Containers from '../styles/containers'
import Typography from '../styles/typography'
import Buttons from '../styles/buttons'

import transactions from '../assets/data'

//Components
import {AvailBalance, IncomeChart, ExpenseChart} from '../components/home/HomeComponents'
import { useEffect, useState } from 'react'

export default Home = ({navigation}) => {

    //Getting the incomes and expenses
    const [incomes, setIncomes] = useState(null)
    const [expenses, setExpenses] = useState(null)

    useEffect(()=>{
        setIncomes(transactions.filter(tran => tran.type === 'income'))
        setExpenses(transactions.filter(tran => tran.type === 'expense'))
    },[])


    return (
        <ScrollView>
            <View style={Containers.main}>
            <AvailBalance balance={7000} prevBalance={6000} interval={'week'}/>
            <IncomeChart incomes={incomes}/>
            <ExpenseChart expenses={expenses}/>
            </View>
        </ScrollView>
    )
}