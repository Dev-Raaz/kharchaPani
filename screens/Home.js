import {View, Text, ScrollView, StatusBar, SafeAreaView} from 'react-native'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

//styles
import Containers from '../styles/containers'
import Typography from '../styles/typography'
import Buttons from '../styles/buttons'
import {AuthContext} from '../components/context'
import FAB from '../components/home/FAB'
import EditTransactionForm from '../components/home/EditTransaction'

//import transactions from '../assets/data'

//Components
import {AvailBalance, IncomeChart, ExpenseChart, IncomePie, ExpensePie} from '../components/home/HomeComponents'
import Navbar from '../components/home/header'
import AddTransactionForm from '../components/home/AddTransactionForm'
import TransactionsList from '../components/home/TransactionsList'
import TransactionView from '../components/home/TransactionView'
import Menu from '../components/home/Menu'

import API_BASE from '../config/api'

export default Home = ({navigation}) => {

    //Getting the incomes and expenses
    const [incomes, setIncomes] = useState(null)
    const [expenses, setExpenses] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [nameOfUser, setNameOfUser] = useState('User')
    const [hideTransaction, hideTransactionView] = useState(true)
    const [viewTransaction, setViewTransaction] = useState(null)
    const [balance, setBalance] = useState(0)
    const [openEdit, setOpenEdit] = useState(false)
    
    //Indicates that a transaction was added
    const [addedTransaction, setAddedTransaction] = useState(true)
    const [addedCategory, setAddedCategory] = useState(true)

    const [transactions, setTransactions] = useState(null)
    const [categories, setCategories] = useState(null)
    const {signOut, getUserName} = useContext(AuthContext)


    //-------------------------
    //Initial Home Setup
    useEffect(()=>{

        //Gets the transaction
        getUser()

        //Fix to clear the state when the component unloads
        
        
    },[addedTransaction, addedCategory])

    //Functions to open hide form
    const hideForm = () => setShowForm(false)
    const openForm = () => setShowForm(true)

    //Function to get Transactions
    const getUser = async()=>{
        //getting the user naem
        const username = getUserName()
        try{
            const {data} = await axios.get(`${API_BASE}/transactions/user/${username}`)
            const userData = await axios.get(`${API_BASE}/users/${username}`)
            const catData = await axios.get(`${API_BASE}/categories/user/${username}`)

            console.log('Got the categories 🤙')
            console.log(catData.data)

            await setTransactions(data)
            //-------
            await setCategories(catData.data)
            setBalance(userData.data.balance)
            setNameOfUser(userData.data.name)
            setIncomes(data.filter(tran => tran.type === 'income'))
            setExpenses(data.filter(tran => tran.type === 'expense'))

            console.log('\n\n\n\nGetting transactions . . . \n\n\n\n')
            console.log(incomes)
            console.log(expenses)

        }catch(err){
            console.log(err)
        }
        //Data
    
    }
    

    return (
        <SafeAreaView>
            <ScrollView style={{backgroundColor: '#ffffff'}}>
            <StatusBar/>
            <Navbar signOut={signOut} setShowMenu={setShowMenu}/>
            <View style={Containers.main}>
            <AvailBalance balance={balance} prevBalance={0} interval={'week'}/>

            <IncomePie incomes={incomes} categories={categories}/>
            <ExpensePie expenses={expenses} categories={categories}/>
            <IncomeChart incomes={incomes}/>
            <ExpenseChart expenses={expenses}/>

            <TransactionsList transactions={transactions} 
            hideTransactionView={hideTransactionView}
            setViewTransaction={setViewTransaction}/>
            </View>
            
            </ScrollView>
            {/* OPENS THE FORM ON CLICK */}
            <FAB doStuff={openForm}/>
            {
                showForm && <AddTransactionForm hideForm={hideForm} 
                addedTransaction={addedTransaction}
                setAddedTransaction={setAddedTransaction}
                />
            }
            {
                hideTransaction
                ? null
                : <TransactionView 
                    viewTransaction={viewTransaction}
                    hideTransactionView={hideTransactionView}
                    addedTransaction={addedTransaction}
                    setAddedTransaction={setAddedTransaction}
                    setOpenEdit={setOpenEdit}
                    />
            }
            {
                showMenu
                ?   <Menu
                    setShowMenu={setShowMenu} nameOfUser={nameOfUser} navigation={navigation}/>
                :   null
            }
            {
                openEdit
                ? <EditTransactionForm
                setAddedTransaction={setAddedTransaction}
                addedTransaction={addedTransaction} 
                setOpenEdit={setOpenEdit} viewTransaction={viewTransaction}/>
                : null
            }
        </SafeAreaView>
    )
}