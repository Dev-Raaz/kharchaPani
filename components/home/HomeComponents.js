import {View, Text, Image, Dimensions} from 'react-native'
import {
    LineChart,
    BarChart,
    ProgressChart,
    PieChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit"



//styles
import Containers from '../../styles/containers'
import Typography from '../../styles/typography'
import Buttons from '../../styles/buttons'
import Images from '../../styles/images'
import Cards from '../../styles/cards'
import Variables from '../../styles/variables'
import SmallDropdownComponent from './SmallDropdown'

import { useContext, useEffect, useState } from 'react'

import 
{
    getIntervalMonth, 
    getIntervalWeek, 
    getDiffWeek,
    getTopPieWeek,
    getTopPieMonth,
    getTopPieMonthExp,
    getTopPieWeekExp
} from '../../utils/getInterval'
import axios from 'axios'
import API_BASE from '../../config/api'
import { AuthContext } from '../context'


//-----------------------------------------------------
//Available Balance
//-----------------------------------------------------
export const AvailBalance = ({balance, prevBalance, interval}) => {

    return (
        <View style={Cards.horCard}>
            <View>
                <Text style={Typography.pBold}>Available Balance</Text>
                <View style={Containers.topS}>
                    <Text style={Typography.h2Prm}>{`₹ ${balance !== '' ? balance : 0}`}</Text>
                </View>

            </View>

            <Image
                style={Images.cardHeroImg}
                source={require('../../assets/images/heroImg.png')}
            />
        </View>
    )
}


///---------------------------------------------------------------------
//INCOME CHARTS
//----------------------------------------------------------------------

export const IncomeChart = ({incomes}) => {

    const [interval, setInterval] = useState('week')
    const [pointsData, setPointsData] = useState([0,1,2,3,4])
    const [change, setChange] = useState(0)
    const [rate, setRate] = useState(0)

    const types = [
        { label: 'Monthly', value: 'month' },
        { label: 'Weekly', value: 'week' }
      ]

    useEffect(()=>{
        if(incomes !== null){
            if(interval === 'week'){
                const temp = getIntervalWeek(incomes)
                const changes = getDiffWeek(incomes)
                setPointsData(temp)
                setChange(changes.change)
                setRate(changes.percentage)
            }
            else if(interval === 'month'){
                const temp = getIntervalMonth(incomes)
                setPointsData(temp)
            }
        }
        
    },[incomes, interval])

    //---------------------------------------------------------
    //Chart Section
    const widthChart = Dimensions.get('window').width - 4*Variables.sizes.szM
    //Chart Data
    const data = {
        labels: interval == 'month' ? ['week1', 'week2', 'week3', 'week4'] 
        : interval == 'year' ? ['quarter1', 'quarter2', 'quarter3', 'quarter4']
        : ['D1','D2','D3','D4','D5','D6','D7'], 
        datasets: [
          {
            data: pointsData,
            color: ()=>Variables.color.success, // optional
            strokeWidth: 2 // optional
          }
        ]// optional
      };

      const chartConfig = {
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0,
        decimalPlaces: 1,
        color: () => Variables.color.prmTxtColor,
        strokeWidth: 2,
        propsForBackgroundLines: {
            stroke: 'rgba(112,112,112,0.15)'
        },
        propsForDots: {
            r: "4",
            strokeWidth: "2",
            fill: Variables.color.success
        },
        useShadowColorFromDataset: false,
        labelColor: (opacity = 1) => Variables.color.prmTxtColor,
      };

    return (
        <View>
            <View style={Containers.bottomM}>
                <View style={Containers.topL}>
                    <View style={Containers.flexHor}>
                        <Text style={Typography.h3}>Income Rate</Text>
                        <SmallDropdownComponent data={types} value={interval} setValue={setInterval} label={'Interval'}/>
                    </View>
                </View>
            </View>

            <View style={Cards.incomeCard}> 
                <View style={Containers.flexHorNorm}>
                    <Text style={Cards.incomeCardTxtBold}>{change < 0 ? `${change}` : `+${change}` }</Text>
                    <Text style={Cards.incomeCardTxt}>  {change < 0 ? `(${rate}%)` : `(+${rate}%)`}</Text> 
                    <Text> from last {interval}</Text> 
                </View>

                <View style={
                    {
                        marginTop: Variables.sizes.szL,
                        alignItems: 'flex-start'
                    }
                    }>
                <LineChart
                    data={data}
                    width={widthChart}
                    height={180}
                    chartConfig={chartConfig}
                    yAxisLabel={'₹'}
                    yAxisInterval={1}
                    withShadow={false}
                    withVerticalLines={false}
                    bezier
                />
                </View>
            </View>

        </View>
    )
}


//------------------------------------------------
//Expenese Chart
//------------------------------------------------
export const ExpenseChart = ({expenses}) => {

    const [interval, setInterval] = useState('week')
    const [pointsData, setPointsData] = useState([0,1,2,3,4])
    const [change, setChange] = useState(0)
    const [rate, setRate] = useState(0)

    const types = [
        { label: 'Monthly', value: 'month' },
        { label: 'Weekly', value: 'week' }
      ]

    useEffect(()=>{
        if(expenses !== null){
            if(interval === 'week'){
                const temp = getIntervalWeek(expenses)
                const changes = getDiffWeek(expenses)
                setPointsData(temp)
                setChange(changes.change)
                setRate(changes.percentage)
            }
            else if(interval === 'month'){
                const temp = getIntervalMonth(expenses)
                setPointsData(temp)
            }
        }
        
    },[expenses, interval])

    //---------------------------------------------------------
    //Chart Section
    const widthChart = Dimensions.get('window').width - 4*Variables.sizes.szM
    //Chart Data
    const data = {
        labels: interval == 'month' ? ['week1', 'week2', 'week3', 'week4'] 
        : interval == 'year' ? ['quarter1', 'quarter2', 'quarter3', 'quarter4']
        : ['D1','D2','D3','D4','D5','D6','D7'], 
        datasets: [
          {
            data: pointsData,
            color: ()=>Variables.color.error, // optional
            strokeWidth: 2 // optional
          }
        ]// optional
      };

      const chartConfig = {
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0,
        decimalPlaces: 1,
        color: () => Variables.color.prmTxtColor,
        strokeWidth: 2,
        propsForBackgroundLines: {
            stroke: 'rgba(112,112,112,0.15)'
        },
        propsForDots: {
            r: "4",
            strokeWidth: "2",
            fill: Variables.color.error
        },
        useShadowColorFromDataset: false,
        labelColor: () => Variables.color.prmTxtColor,
      };

    return (
        <View>
            <View style={Containers.bottomM}>
                <View style={Containers.topL}>
                    <View style={Containers.flexHor}>
                        <Text style={Typography.h3}>Expense Rate</Text>
                        <SmallDropdownComponent data={types} value={interval} setValue={setInterval} label={'Interval'}/>
                    </View>
                </View>
            </View>

            <View style={Cards.incomeCard}> 
                <View style={Containers.flexHorNorm}>
                    <Text style={Cards.expenseCardTxtBold}>{change < 0 ? `${change}` : `+${change}` }</Text>
                    <Text style={Cards.expenseCardTxt}> {change < 0 ? `(${rate}%)` : `(+${rate}%)`}</Text> 
                    <Text> from last {interval}</Text> 
                </View>

                <View style={
                    {
                        marginTop: Variables.sizes.szL,
                        alignItems: 'flex-start'
                    }
                    }>
                <LineChart
                    data={data}
                    width={widthChart}
                    height={180}
                    chartConfig={chartConfig}
                    yAxisLabel={'₹'}
                    yAxisInterval={1}
                    withShadow={false}
                    withVerticalLines={false}
                    bezier
                />
                </View>
            </View>

        </View>
    )
}


export const IncomePie = ({incomes, categories}) => {

    const {getUserName} = useContext(AuthContext)
    //const [categories, setCategories]= useState(null)
    const [interval, setInterval] = useState('week')

    const types = [
        { label: 'Monthly', value: 'month' },
        { label: 'Weekly', value: 'week' }
    ]

    const [data, setData] = useState([
        {
            name: "None",
            sum: 1,
            color: "#25CC8F"
          },
          {
            name: "None",
            sum: 1,
            color: "#84E2C0"
          },
          {
            name: "None",
            sum: 1,
            color: "#C8F2E3"
          }
    ])

    //USE EFFECT
    //Plays when a categories update is recieved
    useEffect(()=>{
        setCats()
    }, [categories, interval, incomes])


    //Updates the categories
    const setCats = async() => {
        const username = getUserName()
        // const {data} = await axios.get(`${API_BASE}/categories/user/${username}`)
        // setCategories(data)

        // console.log(`Got Categories . . .🤙`)
        // console.log(data)
        

        try{
            if(categories !== null && incomes !== null){
                console.log(`Setting Income Categories for user ${username}`)
                if(interval == 'week'){
                    const topCats = getTopPieWeek(incomes, categories, '#25CC8F', '#84E2C0', '#C8F2E3')
    
                    console.log(`Weekly Incomes 💸`)
                    console.log(topCats)
                    // console.log(`Successfully Got Top Cats 🤟`)
                    setData(topCats)
                }else{
                    const topCats = getTopPieMonth(incomes, categories, '#25CC8F', '#84E2C0', '#C8F2E3')
    
                    
                    console.log(`Monthly Incomes 💸`)
                    console.log(topCats)
                    // console.log(`Successfully Got Top Cats 🤟`)
                    setData(topCats)
                }
            }
        }catch(err){
            console.log(`Error: ${err}`)
        }
    }



    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.0,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };

    
    //Guard
    if(incomes == null)
    return null

    return (
        <View>
            
            <View style={Containers.bottomM}>
                <View style={Containers.topL}>
                    <View style={Containers.flexHor}>
                        <Text style={Typography.h3}>Income Chart</Text>
                        <SmallDropdownComponent data={types} value={interval} setValue={setInterval} label={'Interval'}/>
                    </View>
                </View>
            </View>

            <View style={Cards.incomeCardFlex}>
            <PieChart
                data={data}
                width={200}
                height={150}
                chartConfig={chartConfig}
                accessor={"sum"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                absolute
                hasLegend={false}
            />
            <View style={Cards.incomeCardFlexLabels}>
                
                <View style={Cards.incomePieLabel}>
                    <View style={{height: 30, width: 30, borderRadius: 6, backgroundColor: '#25CC8F'}}></View>
                    <View>
                    <Text style={{marginLeft: 10, fontSize: 12, marginBottom: 4}}>{data[0].name}</Text>
                    <Text style={{marginLeft: 10, fontSize: 10, fontWeight: 'bold'}}>{`₹${data[0].sum}`}</Text>
                    </View>
                </View>
                
                <View style={Cards.incomePieLabel}>
                    <View style={{height: 30, width: 30, borderRadius: 6, backgroundColor: '#84E2C0'}}></View>
                    <View>
                    <Text style={{marginLeft: 10, fontSize: 12, marginBottom: 4}}>{data[1].name}</Text>
                    <Text style={{marginLeft: 10, fontSize: 10, fontWeight: 'bold'}}>{`₹${data[1].sum}`}</Text>
                    </View>
                </View>

                <View style={Cards.incomePieLabel}>
                    <View style={{height: 30, width: 30, borderRadius: 6, backgroundColor: '#C8F2E3'}}></View>
                    <View>
                        <Text style={{marginLeft: 10, fontSize: 12, marginBottom: 4}}>{data[2].name}</Text>
                        <Text style={{marginLeft: 10, fontSize: 10, fontWeight: 'bold'}}>{`₹${data[2].sum}`}</Text>
                    </View>
                </View>

            </View>

            </View>

        </View>
    )
}

export const ExpensePie = ({expenses, categories}) => {

    const {getUserName} = useContext(AuthContext)
    // const [categories, setCategories]= useState(null)
    const [interval, setInterval] = useState('week')

    const types = [
        { label: 'Monthly', value: 'month' },
        { label: 'Weekly', value: 'week' }
    ]

    const [data,setData] = useState([
        {
            name: "None",
            sum: 1,
            color: "#FF348C"
          },
          {
            name: "None",
            sum: 1,
            color: "#FF85BA"
          },
          {
            name: "None",
            sum: 1,
            color: "#FFD0E4"
          }
    ])

    
    //USE EFFECT
    useEffect(()=>{
        setCats()
    }, [categories, expenses, interval])

    //Updates the categories
    const setCats = async() => {
        const username =getUserName()

        try{

            if(expenses != null && categories !== null){
                console.log(`Setting Expense Categories for user ${username}`)
                if(interval == 'week'){
                    const topCats = getTopPieWeek(expenses, categories, '#FF348C', '#FF85BA', '#FFD0E4')
    
                    console.log(`Expenses Week`)
                    console.log(topCats)
                    // console.log(`Successfully Got Top Cats 🤟`)
                    setData(topCats)
                }else{
                    const topCats = getTopPieMonth(expenses, categories, '#FF348C', '#FF85BA', '#FFD0E4')
    
                    console.log(`Expenses Monthly`)
                    console.log(topCats)
                    // console.log(`Successfully Got Top Cats 🤟`)
                    setData(topCats)
                }
            }
        }catch(err){
            console.log(`Error: ${err}`)
        }
    }

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.0,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };

    //Guard
    if(expenses == null)
    return null

    return (
        <View>
            
            <View style={Containers.bottomM}>
                <View style={Containers.topL}>
                    <View style={Containers.flexHor}>
                        <Text style={Typography.h3}>Expense Chart</Text>
                        <SmallDropdownComponent data={types} value={interval} setValue={setInterval} label={'Interval'}/>
                    </View>
                </View>
            </View>

            <View style={Cards.incomeCardFlex}>
            <PieChart
                data={data}
                width={200}
                height={150}
                chartConfig={chartConfig}
                accessor={"sum"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                absolute
                hasLegend={false}
            />
            <View style={Cards.incomeCardFlexLabels}>
                
                <View style={Cards.incomePieLabel}>
                    <View style={{height: 30, width: 30, borderRadius: 6, backgroundColor: '#FF348C'}}></View>
                    <View>
                    <Text style={{marginLeft: 10, fontSize: 12, marginBottom: 4}}>{data[0].name}</Text>
                    <Text style={{marginLeft: 10, fontSize: 10, fontWeight: 'bold'}}>{`₹${data[0].sum}`}</Text>
                    </View>
                </View>
                
                <View style={Cards.incomePieLabel}>
                    <View style={{height: 30, width: 30, borderRadius: 6, backgroundColor: '#FF85BA'}}></View>
                    <View>
                    <Text style={{marginLeft: 10, fontSize: 12, marginBottom: 4}}>{data[1].name}</Text>
                    <Text style={{marginLeft: 10, fontSize: 10, fontWeight: 'bold'}}>{`₹${data[1].sum}`}</Text>
                    </View>
                </View>

                <View style={Cards.incomePieLabel}>
                    <View style={{height: 30, width: 30, borderRadius: 6, backgroundColor: '#FFD0E4'}}></View>
                    <View>
                        <Text style={{marginLeft: 10, fontSize: 12, marginBottom: 4}}>{data[2].name}</Text>
                        <Text style={{marginLeft: 10, fontSize: 10, fontWeight: 'bold'}}>{`₹${data[2].sum}`}</Text>
                    </View>
                </View>

            </View>

            </View>

        </View>
    )
   
}


export default AvailBalance