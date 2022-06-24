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

import { useEffect, useState } from 'react'

import 
{
    getIntervalMonth, 
    getIntervalWeek, 
    getDiffWeek
} from '../../utils/getInterval'


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
                
                <View style={Containers.topS}>
                    <View style={Containers.flexHor}>
                        <Text style={balance > prevBalance ? Typography.greenP : Typography.redP}>
                            {
                                balance > prevBalance
                                ? `+₹${balance-prevBalance}`
                                : `-₹${prevBalance-balance}`
                            }
                        </Text>
                        <Text> than last {interval || 'time'}</Text>
                    </View>
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

export const IncomePie = ({incomes}) => {

    const data = [
        {
            name: "Seoul",
            population: 5150,
            color: "#25CC8F"
          },
          {
            name: "Toronto",
            population: 2800,
            color: "#84E2C0"
          },
          {
            name: "Beijing",
            population: 1276,
            color: "#C8F2E3"
          }
    ]

    const widthChart = Dimensions.get('window').width - 4*Variables.sizes.szM

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
                        <Text>Weekly</Text>
                    </View>
                </View>
            </View>

            <View style={Cards.incomeCardFlex}>
            <PieChart
                data={data}
                width={200}
                height={150}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                absolute
                hasLegend={false}
            />
            <View style={Cards.incomeCardFlexLabels}>
                
                <View style={Cards.incomePieLabel}>
                    <View style={{height: 30, width: 30, borderRadius: 6, backgroundColor: '#25CC8F'}}></View>
                    <View>
                    <Text style={{marginLeft: 10, fontSize: 12, marginBottom: 4}}>Shop</Text>
                    <Text style={{marginLeft: 10, fontSize: 10, fontWeight: 'bold'}}>{`₹1000`}</Text>
                    </View>
                </View>
                
                <View style={Cards.incomePieLabel}>
                    <View style={{height: 30, width: 30, borderRadius: 6, backgroundColor: '#84E2C0'}}></View>
                    <View>
                    <Text style={{marginLeft: 10, fontSize: 12, marginBottom: 4}}>Grocerry</Text>
                    <Text style={{marginLeft: 10, fontSize: 10, fontWeight: 'bold'}}>{`₹1000`}</Text>
                    </View>
                </View>

                <View style={Cards.incomePieLabel}>
                    <View style={{height: 30, width: 30, borderRadius: 6, backgroundColor: '#C8F2E3'}}></View>
                    <View>
                        <Text style={{marginLeft: 10, fontSize: 12, marginBottom: 4}}>Music</Text>
                        <Text style={{marginLeft: 10, fontSize: 10, fontWeight: 'bold'}}>{`₹1000`}</Text>
                    </View>
                </View>

            </View>

            </View>

        </View>
    )
}

export const ExpensePie = ({expenses}) => {
    const data = [
        {
            name: "Seoul",
            population: 5150,
            color: "#FF348C"
          },
          {
            name: "Toronto",
            population: 2800,
            color: "#FF85BA"
          },
          {
            name: "Beijing",
            population: 1276,
            color: "#FFD0E4"
          }
    ]


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
                        <Text>Weekly</Text>
                    </View>
                </View>
            </View>

            <View style={Cards.incomeCardFlex}>
            <PieChart
                data={data}
                width={200}
                height={150}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                absolute
                hasLegend={false}
            />
            <View style={Cards.incomeCardFlexLabels}>
                
                <View style={Cards.incomePieLabel}>
                    <View style={{height: 30, width: 30, borderRadius: 6, backgroundColor: '#FF348C'}}></View>
                    <View>
                    <Text style={{marginLeft: 10, fontSize: 12, marginBottom: 4}}>Shop</Text>
                    <Text style={{marginLeft: 10, fontSize: 10, fontWeight: 'bold'}}>{`₹1000`}</Text>
                    </View>
                </View>
                
                <View style={Cards.incomePieLabel}>
                    <View style={{height: 30, width: 30, borderRadius: 6, backgroundColor: '#FF85BA'}}></View>
                    <View>
                    <Text style={{marginLeft: 10, fontSize: 12, marginBottom: 4}}>Grocerry</Text>
                    <Text style={{marginLeft: 10, fontSize: 10, fontWeight: 'bold'}}>{`₹1000`}</Text>
                    </View>
                </View>

                <View style={Cards.incomePieLabel}>
                    <View style={{height: 30, width: 30, borderRadius: 6, backgroundColor: '#FFD0E4'}}></View>
                    <View>
                        <Text style={{marginLeft: 10, fontSize: 12, marginBottom: 4}}>Music</Text>
                        <Text style={{marginLeft: 10, fontSize: 10, fontWeight: 'bold'}}>{`₹1000`}</Text>
                    </View>
                </View>

            </View>

            </View>

        </View>
    )
   
}


export default AvailBalance